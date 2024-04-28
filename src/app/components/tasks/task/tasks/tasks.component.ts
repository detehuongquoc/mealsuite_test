import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, throwError } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { BackendService, Task } from 'src/app/backend.service';
import { AppService } from 'src/app/service/appService/app.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [MessageService]
})
export class TasksComponent implements OnInit {
  tasks : Task[] = [];
  searchedTasks : Task[] = [];

  searchText: string = "";
  newTaskDescription : string = "";

  private unsubscribe: Subject<void> = new Subject();

  constructor(private backendService : BackendService, private router : Router, private messageService: MessageService, private appService : AppService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.appService.setLoading(true);
    this.backendService.tasks().pipe(
      takeUntil(this.unsubscribe),
      finalize(() => this.appService.setLoading(false)),
      catchError(error => {
        alert('Loading data have some problem, please try again: ' + error.message);
        return throwError(error);
      }),
    ).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  goToDetail(taskId: number) {
    this.router.navigate(['/tasks', taskId]);
  }

  addTask(){
    if(!this.newTaskDescription) {
      return
    }
    const newTask = {
      description : this.newTaskDescription
    }

    this.appService.setLoading(true)
    this.backendService.newTask(newTask).pipe(
      takeUntil(this.unsubscribe),
      finalize(() => this.appService.setLoading(false)),
      catchError(error => {
        alert('Add new task, please try again: ' + error.message);
        return throwError(error);
      }),
    ).subscribe((newTask) => {
      this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
      this.tasks.unshift(newTask);
      this.newTaskDescription = "";
    })
  }

  handleSearchTask() {
    this.backendService.searchTasks(this.searchText).pipe(
      takeUntil(this.unsubscribe)
    ).subscribe((tasks) => this.tasks = tasks)
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
