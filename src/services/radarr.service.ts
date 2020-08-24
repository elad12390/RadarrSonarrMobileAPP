import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {IRadarrConfig} from './models/config.models';
import {ConfigService} from './config.service';
import {RadarrApiRoutes} from './models/radarr.models';
import {HttpClient} from '@angular/common/http';
import {RadarrCalendarApi} from './radarr-api/radarr-calendar.api';
import {CommandModel, RadarrCommandApi} from './radarr-api/radarr-command.api';
import {RadarrDiskspaceApi} from './radarr-api/radarr-diskspace.api';
import {IMovieItem, RadarrMovieApi} from './radarr-api/radarr-movie.api';
import {RadarrQueueApi} from './radarr-api/radarr-queue.api';
import {RadarrMovieLookupApi} from './radarr-api/radarr-movie-lookup.api';
import {RadarrSystemStatusApi} from './radarr-api/radarr-system-status.api';


@Injectable({
  providedIn: 'root'
})
export class RadarrService implements OnDestroy {
  private config$: BehaviorSubject<IRadarrConfig> = new BehaviorSubject<IRadarrConfig>(this.configService.radarrConfig);
  public calendar: RadarrCalendarApi = new RadarrCalendarApi(
    this.httpClient,
    this.config$,
    this.apiUrl
  );
  public command: RadarrCommandApi = new RadarrCommandApi(
    this.httpClient,
    this.config$,
    this.apiUrl
  );
  public diskSpace: RadarrDiskspaceApi = new RadarrDiskspaceApi(
    this.httpClient,
    this.config$,
    this.apiUrl
  );
  public movie: RadarrMovieApi = new RadarrMovieApi(
    this.httpClient,
    this.config$,
    this.apiUrl
  );
  public movieLookup: RadarrMovieLookupApi = new RadarrMovieLookupApi(
    this.httpClient,
    this.config$,
    this.apiUrl
  );
  public queue: RadarrQueueApi = new RadarrQueueApi(
    this.httpClient,
    this.config$,
    this.apiUrl
  );
  public systemStatus: RadarrSystemStatusApi = new RadarrSystemStatusApi(
    this.httpClient,
    this.config$,
    this.apiUrl
  );
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private configService: ConfigService, private httpClient: HttpClient) {
    this.configService.radarrConfig$.pipe(
      takeUntil(this.destroy$),
      tap((newConfig) => this.config$.next(newConfig))
    ).subscribe();
  }

  get baseUrl(): string {
    const config = this.config$.value;
    return `http://${config.hostName}:${config.port}`;
  }

  get apiUrl(): string {
    const config = this.config$.value;
    return `http://${config.hostName}:${config.port}/api`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
