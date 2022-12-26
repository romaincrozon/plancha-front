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
import { AssignmentComponent } from './pages/assignment/assignment.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CompetencesComponent } from './pages/competences/competences.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { TodoComponent } from './pages/todo/todo.component';

import { IconsComponent } from './pages/icons/icons.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: '', component: PlanningComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'assignment', component: AssignmentComponent, canActivate: [AuthGuard]  },
  { path: 'project', component: TablesComponent, canActivate: [AuthGuard]  },
  { path: 'project/:id', component: ProjectComponent , canActivate: [AuthGuard] },
  { path: 'planning', component: PlanningComponent, canActivate: [AuthGuard]  },
  { path: 'profile', component: ProfileSettingsComponent, canActivate: [AuthGuard]  },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]  },
  { path: 'request', component: RequestsComponent, canActivate: [AuthGuard]  },
  { path: 'todo', component: TodoComponent, canActivate: [AuthGuard]  },
  { path: 'settings/competences', component: CompetencesComponent, canActivate: [AuthGuard]  },
  { path: 'settings/profiles', component: ProfilesComponent, canActivate: [AuthGuard]  },
  { path: 'request', component: RequestsComponent, canActivate: [AuthGuard]  },
  { path: 'request/:id', component: RequestComponent, canActivate: [AuthGuard]  },
  { path: 'administration', component: AdministrationComponent, canActivate: [AuthGuard]  },
  { path: 'icons', component: IconsComponent, canActivate: [AuthGuard]  },
   
  // otherwise redirect to home
  //{ path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' });
