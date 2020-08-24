import {BehaviorSubject, Observable} from 'rxjs';
import {RadarrApiRoutes} from '../models/radarr.models';
import {HttpClient} from '@angular/common/http';
import {IRadarrConfig} from '../models/config.models';

export interface IDiskSpaceInfo {
  path: string;
  label: string;
  freeSpace: number;
  totalSpace: number;
}
export class RadarrDiskspaceApi {
  constructor(
    private httpClient: HttpClient,
    private config$: BehaviorSubject<IRadarrConfig>,
    private apiUrl: string
  ) {}

  /**
   * Gets information about Diskspace.
   */
  getDiskSpace$(): Observable<IDiskSpaceInfo[]> {
    const config = this.config$.value;
    return this.httpClient.get<IDiskSpaceInfo[]>(`${this.apiUrl}/${RadarrApiRoutes.DISKSPACE}`);
  }

  getMoviePaths$(): Observable<{id: number, path: string}[]> {
    const config = this.config$.value;
    return this.httpClient.get<{id: number, path: string}[]>(`${this.apiUrl}/${RadarrApiRoutes.ROOT_FOLDER}`);
  }
}

