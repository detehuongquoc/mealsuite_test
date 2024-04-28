
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BackendService } from "./backend.service";
import { TaskModule } from "./components/tasks/task/task.module";
import { RouterModule, Routes } from "@angular/router";
import { TasksComponent } from "./components/tasks/task/tasks/tasks.component";

import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksComponent }
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TaskModule,  RouterModule.forRoot(routes), MessagesModule, MessageModule, ProgressSpinnerModule],
  providers: [
    BackendService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
