import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SetupFormComponent } from './Admin/setup-form/setup-form.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"customize", component:SetupFormComponent},
  {path:"chatbot", component:ChatbotComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
