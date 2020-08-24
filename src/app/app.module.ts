import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {FlexModule} from '@angular/flex-layout';
import { SettingsMenuComponent } from './components/settings-menu/settings-menu.component';
import {MatCardModule} from '@angular/material/card';
import { ConfigEditFormComponent } from './components/settings-menu/components/config-edit-form/config-edit-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {ConfigService} from '../services/config.service';
import {RadarrService} from '../services/radarr.service';
import {SonarrService} from '../services/sonarr.service';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RadarrComponent } from './routes/radarr/radarr.component';
import { SonarrComponent } from './routes/sonarr/sonarr.component';
import { MainMenuComponent } from './routes/main-menu/main-menu.component';
import { ListItemComponent } from './shared-components/list-item/list-item.component';
import {MatListModule} from '@angular/material/list';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CustomHttpInterceptor} from '../services/custom-http.interceptor';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { SettingsComponent } from './routes/settings/settings.component';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';


const imports = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  MatButtonModule,
  FlexModule,
  MatCardModule,
  ReactiveFormsModule,
  NgxWebstorageModule.forRoot(),
  MatInputModule,
  MatCheckboxModule,
  MatListModule,
  HttpClientModule,
  ScrollingModule,
  MatDialogModule
];

const declarations = [
  AppComponent,
  SettingsMenuComponent,
  ConfigEditFormComponent,
  RadarrComponent,
  SonarrComponent,
  MainMenuComponent,
  ListItemComponent,
  SettingsComponent,
  AddDialogComponent
];

const providers = [
  ConfigService,
  RadarrService,
  SonarrService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CustomHttpInterceptor,
    multi: true
  }
];

const entryComponents = [
  AddDialogComponent
];
@NgModule({
  declarations,
  imports: [
    imports,
    MatSelectModule
  ],
  providers,
  entryComponents,
  bootstrap: [AppComponent]
})
export class AppModule { }
