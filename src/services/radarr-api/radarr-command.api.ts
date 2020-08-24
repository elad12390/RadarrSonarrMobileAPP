import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {IRadarrConfig} from '../models/config.models';
import {RadarrApiRoutes} from '../models/radarr.models';

export interface CommandModel {
  name: string;
  startedOn: Date;
  stateChangeTime: Date;
  sendUpdatesToClient: boolean;
  state: string;
  id: 24;
}

export interface CommandResponseModel {
  name: string;
  body: {
    sendUpdatesToClient: true;
    updateScheduledTask: true;
    completionMessage: string;
    name: string;
    trigger: string;
  };
  priority: string;
  status: string;
  queued: Date;
  trigger: string;
  state: string;
  manual: true;
  startedOn: Date;
  sendUpdatesToClient: boolean;
  updateScheduledTask: boolean;
  id: number;
}

export type CommandApiCommands = 'RefreshMovie' | 'RescanMovie' | 'MoviesSearch' | 'DownloadedMoviesScan' | 'RssSync' | 'RenameFiles' |
  'RenameMovie' | 'CutOffUnmetMoviesSearch' | 'NetImportSync' | 'missingMoviesSearch';

export class RadarrCommandApi {
  constructor(
    private httpClient: HttpClient,
    private config$: BehaviorSubject<IRadarrConfig>,
    private apiUrl: string
  ) {}

  /**
   * Queries all currently started commands.
   */
  getAllCommands$(): Observable<CommandModel[]> {
    const config = this.config$.value;
    return this.httpClient.get<CommandModel[]>(`${this.apiUrl}/${RadarrApiRoutes.COMMAND}`);
  }

  /**
   * Queries the status of a previously started command.
   */
  getCommand$(id: number): Observable<CommandModel> {
    const config = this.config$.value;
    return this.httpClient.get<CommandModel>(`${this.apiUrl}/${RadarrApiRoutes.COMMAND}/${id}`);
  }

  /**
   * Publish a new command for Radarr to run. These commands are executed asynchronously; use GET to retrieve the current status.
   * @param commandName The command name
   * @param body Command body
   */
  postCommand$(commandName: CommandApiCommands, body: any): Observable<CommandResponseModel> {
    const config = this.config$.value;
    return this.httpClient.post<CommandResponseModel>(`${this.apiUrl}/${RadarrApiRoutes.COMMAND}`, body,
      { params: { name: commandName } });
  }
}

