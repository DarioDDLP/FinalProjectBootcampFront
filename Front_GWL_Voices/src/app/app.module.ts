import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { MembersComponent } from './components/members/members.component';
import { SendMailComponent } from './components/send-mail/send-mail.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DocumentationViewComponent } from './components/documentation-view/documentation-view.component';
import { DirectoryViewComponent } from './components/directory-view/directory-view.component';
import { DirectoryRegisterComponent } from './components/directory-register/directory-register.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { ChatComponent } from './components/chat/chat.component';


import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { MessengerMessagesComponent } from './components/messenger-messages/messenger-messages.component';
import { MerchandisingComponent } from './components/merchandising/merchandising.component';
import { ProductRegisterComponent } from './components/product-register/product-register.component';
import { FooterComponent } from './components/footer/footer.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    SingUpComponent,
    ResetPasswordComponent,
    NavbarComponent,
    DashboardComponent,
    EditProfileComponent,
    MembersComponent,
    SendMailComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    NotFoundComponent,
    DocumentationViewComponent,
    DirectoryViewComponent,
    DirectoryRegisterComponent,
    CalendarComponent,
    MessengerComponent,
    ChatComponent,
    MessengerMessagesComponent,
    MerchandisingComponent,
    ProductRegisterComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    FullCalendarModule,
    SocketIoModule.forRoot(config),
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
