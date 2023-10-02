import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router'; // Import RouterModule here
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SetupFormComponent } from './Admin/setup-form/setup-form.component';
import { FormsModule } from '@angular/forms';
import { ChatbotComponent } from './chatbot/chatbot.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SetupFormComponent,
    ChatbotComponent
  ],
  imports: [
    BrowserModule,
    RouterModule, // Add RouterModule to imports
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
