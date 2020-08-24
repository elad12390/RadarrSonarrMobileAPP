import { Injectable } from '@angular/core';
import {LocalStorage, LocalStorageService} from 'ngx-webstorage';
import {IConfig, IRadarrConfig, ISonarrConfig} from './models/config.models';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  @LocalStorage() private config: IConfig;
  constructor(private storageService: LocalStorageService) {
    if (!this.config) {
      this.config = {};
    }
  }
  get radarrConfig(): IRadarrConfig {
    return this.config.radarrConfig;
  }
  get radarrConfig$(): Observable<IRadarrConfig> {
    return this.storageService.observe('config').pipe(
      map((item: IConfig) => item.radarrConfig)
    );
  }
  set radarrConfig(config: IRadarrConfig) {
    this.config.radarrConfig = {
      ...this.config.radarrConfig,
      ...config
    };
    this.config = this.config;
  }
  get sonarrConfig(): ISonarrConfig {
    return this.config.sonarrConfig;
  }
  get sonarrConfig$(): Observable<IRadarrConfig> {
    return this.storageService.observe('config').pipe(
      map((item: IConfig) => item.sonarrConfig)
    );
  }
  set sonarrConfig(config: ISonarrConfig) {
    this.config.sonarrConfig = {
      ...this.config.sonarrConfig,
      ...config
    };
    this.config = this.config;
  }
}
