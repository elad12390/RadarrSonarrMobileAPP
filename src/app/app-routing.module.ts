import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RadarrComponent} from './routes/radarr/radarr.component';
import {SonarrComponent} from './routes/sonarr/sonarr.component';
import {MainMenuComponent} from './routes/main-menu/main-menu.component';
import {SettingsComponent} from './routes/settings/settings.component';

const routes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'radarr', component: RadarrComponent },
  { path: 'sonarr', component: SonarrComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
