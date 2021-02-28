import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { ProjectComponent } from './pages/project/project.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TablesComponent } from './pages/tables/tables.component';
import { PlanningComponent } from './pages/planning/planning.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { RequestComponent } from './pages/request/request.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CompetencesComponent } from './pages/competences/competences.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { TodoComponent } from './pages/todo/todo.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: '', component: PlanningComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'project', component: TablesComponent },
  { path: 'project/:id', component: ProjectComponent },
  { path: 'subproject/:id', component: ProjectComponent },
  { path: 'planning', component: PlanningComponent },
  { path: 'profile', component: ProfileSettingsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'request', component: RequestsComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'settings/competences', component: CompetencesComponent },
  { path: 'settings/profiles', component: ProfilesComponent },
  { path: 'request', component: RequestsComponent },
  { path: 'request/:id', component: RequestComponent },
  { path: 'administration', component: AdministrationComponent },
   
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' });
