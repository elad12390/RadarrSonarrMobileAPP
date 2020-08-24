import {BehaviorSubject, Observable} from 'rxjs';
import {RadarrApiRoutes} from '../models/radarr.models';
import {HttpClient} from '@angular/common/http';
import {IRadarrConfig} from '../models/config.models';
import set = Reflect.set;

export interface IRadarrSystemStatus {
  version: string;
  buildTime: Date;
  isDebug: boolean;
  isProduction: boolean;
  isAdmin: boolean;
  isUserInteractive: boolean;
  startupPath: string;
  appData: string;
  osVersion: string;
  isMonoRuntime: boolean;
  isMono: boolean;
  isLinux: boolean;
  isOsx: boolean;
  isWindows: boolean;
  branch: string;
  authentication: string;
  sqliteVersion: string;
  urlBase: string;
  runtimeVersion: string;
}
export class RadarrSystemStatusApi {
  constructor(
    private httpClient: HttpClient,
    private config$: BehaviorSubject<IRadarrConfig>,
    private apiUrl: string
  ) {}

  /**
   * Returns system status
   */
  getQueue(): Observable<IRadarrSystemStatus> {
    const config = this.config$.value;
    return this.httpClient.get<IRadarrSystemStatus>(`${this.apiUrl}/${RadarrApiRoutes.SYSTEM_STATUS}`);
  }

}

