import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {IRadarrConfig} from '../models/config.models';
import {RadarrApiRoutes} from '../models/radarr.models';
import {IMovieItem} from './radarr-movie.api';

export class RadarrCalendarApi {
  constructor(
    private httpClient: HttpClient,
    private config$: BehaviorSubject<IRadarrConfig>,
    private apiUrl: string
  ) {}

  upcomingMovies$(startDate?: Date, endDate?: Date): Observable<IMovieItem[]> {
    const config = this.config$.value;
    return this.httpClient.get<IMovieItem[]>(
      `${this.apiUrl}/${RadarrApiRoutes.CALENDAR}`,
      { params: {  start: startDate, end: endDate } as {} }
    );
  }
}
