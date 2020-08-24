import {FormControl} from '@angular/forms';

export interface IRadarrConfigForm {
  hostName: FormControl;
  port: FormControl;
  apiKey: FormControl;
}

export interface IRadarrConfig {
  hostName?: string;
  port?: string;
  apiKey?: string;
}

export interface ISonarrConfigForm {
  hostName: FormControl;
  v3: FormControl;
  port: FormControl;
  apiKey: FormControl;
}

export interface ISonarrConfig {
  hostName?: string;
  v3?: boolean;
  port?: string;
  apiKey?: string;
}

export interface IConfig {
  radarrConfig?: IRadarrConfig;
  sonarrConfig?: ISonarrConfig;
}
