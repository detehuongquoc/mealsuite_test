import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { catchError, finalize, switchMap, takeUntil } from 'rxjs/operators';
import { BackendService, Task, User } from 'src/app/backend.service';
import { AppService } from 'src/app/service/appService/app.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  taskId!: number;
  task!: Task;

  users : User[] = [];
  selectedUser?:User = null;

  private unsubscribe: Subject<void> = new Subject();

  constructor(private route: ActivatedRoute,
    private backendService: BackendService,
    private router: Router, private appService :AppService) { }

  ngOnInit(): void {

    this.appService.setLoading(true);
    this.route.params.pipe(
      switchMap(params => {
        const taskId = +params['id'];
        
        return this.backendService.task(taskId);
      }),
      switchMap(task => {
        this.task = task;
        return this.backendService.users();
      }),
      takeUntil(this.unsubscribe),
      catchError(error => {
        alert('Loading data have some problem, please try again: ' + error.message);
        return throwError(error);
      }),
    ).subscribe(users => {
      this.appService.setLoading(false);
      this.users = users;
    
      if (!this.task.assigneeId || !this.users.length) {
        return;
      }
    
      const userSelected = this.users.find(user => user.id === this.task.assigneeId);
      if (userSelected) {
        this.selectedUser = userSelected;
      } else {
        this.selectedUser = this.users[0]
      }
    });
  }

  hanldeUpdateTask() {
    const updateTask : Task = {
      ...this.task,
      assigneeId : this.selectedUser.id
    }

    this.appService.setLoading(true);
    this.backendService.update(this.task.id, updateTask).pipe(
      takeUntil(this.unsubscribe),
      catchError(error => {
        alert('Update task failed: ' + error.message);
        return throwError(error);
      }),
      finalize(() => this.appService.setLoading(false))
    ).subscribe((newTask) => {
      this.task = newTask;
      alert('Update task successful');
    })
  }

  navigateToHome() {
   this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
 }
