import { Component } from '@angular/core';
import {BackendService} from './backend.service';
import { AppService } from './service/appService/app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading$!: Observable<boolean>;

  constructor(private appService : AppService) {}

  ngOnInit(){
    this.loading$ = this.appService.loading$();
  }
}
