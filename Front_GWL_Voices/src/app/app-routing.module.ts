import { NgModule } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ChatComponent } from './components/chat/chat.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DirectoryRegisterComponent } from './components/directory-register/directory-register.component';
import { DirectoryViewComponent } from './components/directory-view/directory-view.component';
import { DocumentationViewComponent } from './components/documentation-view/documentation-view.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { MembersComponent } from './components/members/members.component';
import { MerchandisingComponent } from './components/merchandising/merchandising.component';
import { MessengerMessagesComponent } from './components/messenger-messages/messenger-messages.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductRegisterComponent } from './components/product-register/product-register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SendMailComponent } from './components/send-mail/send-mail.component';

import { SingUpComponent } from './components/sing-up/sing-up.component';
import { ProfileGuard } from './guards/profile.guard';

const routes: Routes = [
  { path: "", pathMatch: 'full', component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "new-password/:resettoken", component: NewPasswordComponent },
  {
    path: "dashboard", component: DashboardComponent, canActivate: [ProfileGuard], children: [
      { path: '', pathMatch: 'full', redirectTo: 'profile' },
      { path: "edit-profile", component: EditProfileComponent, canActivate: [ProfileGuard] },
      { path: "profile", component: ProfileComponent, canActivate: [ProfileGuard] },
      { path: "reset-password", component: ResetPasswordComponent, canActivate: [ProfileGuard] },
      { path: "members", component: MembersComponent, canActivate: [ProfileGuard] },
      { path: "send-email/:id", component: SendMailComponent, canActivate: [ProfileGuard] },
      { path: "signup", component: SingUpComponent, canActivate: [ProfileGuard] },
      { path: "documentation", component: DocumentationViewComponent, canActivate: [ProfileGuard] },
      { path: "directory", component: DirectoryViewComponent, canActivate: [ProfileGuard] },
      { path: "directory-register", component: DirectoryRegisterComponent, canActivate: [ProfileGuard] },
      { path: "messenger", component: MessengerComponent, canActivate: [ProfileGuard] },
      { path: "chat", component: ChatComponent, canActivate: [ProfileGuard] },
      { path: "messenger/:id", component: MessengerMessagesComponent, canActivate: [ProfileGuard] },
      { path: "calendar", component: CalendarComponent, canActivate: [ProfileGuard] },
      { path: "merchandising", component: MerchandisingComponent, canActivate: [ProfileGuard] },
      { path: "product-register", component: ProductRegisterComponent, canActivate: [ProfileGuard] },
    ]
  },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }