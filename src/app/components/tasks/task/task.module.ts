import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksComponent } from './tasks/tasks.component';
import { TaskComponent } from './task/task.component';

import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {DropdownModule} from 'primeng/dropdown';


const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: 'tasks/:id', component: TaskComponent }
];

@NgModule({
  declarations: [
    TasksComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    BrowserAnimationsModule,

    CardModule,
    ButtonModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    ToggleButtonModule,
    DropdownModule,
  
  ]
})
export class TaskModule { }
