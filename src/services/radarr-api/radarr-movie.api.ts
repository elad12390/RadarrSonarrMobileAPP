import {BehaviorSubject, Observable} from 'rxjs';
import {RadarrApiRoutes} from '../models/radarr.models';
import {HttpClient} from '@angular/common/http';
import {IRadarrConfig} from '../models/config.models';
import {ITraktSearchResult} from './radarr-movie-lookup.api';
import {IAddDialogFormOutput} from '../../app/components/add-dialog/add-dialog.component';

export interface IMovieItem {
  id: number;
  isLoading?: boolean;
  title: string;
  alternativeTitles: string[];
  sortTitle: string;
  sizeOnDisk: number;
  status: string;
  overview: string;
  inCinemas: Date;
  images: [
    {
      coverType: 'poster',
      url: string
    },
    {
      coverType: 'banner',
      url: string
    }
  ];
  downloaded: boolean;
  pathState: string;
  year: number;
  hasFile: string;
  youTubeTrailerId: string;
  studio: string;
  profileId: number;
  path: string;
  monitored: boolean;
  minimumAvailability: string;
  cleanTitle: string;
  lastInfoSync: Date;
  runtime: number;
  imdbId: string;
  tmdbId: number;
  titleSlug: string;
  genres: string[];
  tags: string[];
  added: Date;
  ratings: {
    votes: number,
    value: number
  };
  qualityProfileId: number;
  website: string;
  isRemote: false;
}

export class PostMovieRequest {
  title: string;
  qualityProfileId: number;
  titleSlug: string;
  images: {
    coverType: string;
    url: string;
  }[];
  tmdbId: number;
  profileId: number;
  year: number;
  path?: string;
  rootFolderPath?: string;
  monitored?: boolean;
  addOptions?: {
    searchForMovie: boolean;
  };

  constructor(movie: ITraktSearchResult, formOutput: IAddDialogFormOutput) {
    this.title = movie.title;
    this.titleSlug = movie.titleSlug;
    this.tmdbId = movie.tmdbId;
    this.year = movie.year;
    this.monitored = formOutput.monitored;
    this.profileId = formOutput.profileId;
    this.qualityProfileId = formOutput.profileId;
    this.addOptions = formOutput.addOptions;
    this.path = `${formOutput.path}/${movie.sortTitle}`;
    this.images = movie.images;

  }

}

export interface PostMovieResponse {
  title: string;
  sortTitle: string;
  sizeOnDisk: number;
  status: string;
  images: [
    {
      'coverType': 'poster',
      'url': string
    },
    {
      'coverType': 'banner',
      'url': string
    }
  ];
  downloaded: boolean;
  year: number;
  hasFile: boolean;
  path: string;
  profileId: number;
  monitored: boolean;
  minimumAvailability: string;
  runtime: number;
  cleanTitle: string;
  imdbId: string;
  tmdbId: number;
  titleSlug: string;
  genres: string[];
  tags: string[];
  added: Date;
  alternativeTitles: string[];
  qualityProfileId: number;
  id: number;
}

export interface IDeleteMovieParams {
  id: number;
  deleteFiles: boolean;
  addExclusion: boolean;
}

export interface IProfile {
  id: number;
  name: string;
}

export class RadarrMovieApi {
  constructor(
    private httpClient: HttpClient,
    private config$: BehaviorSubject<IRadarrConfig>,
    private apiUrl: string
  ) {}

  /**
   * Returns all Movies in your collection.
   */
  getAllMovies$(): Observable<IMovieItem[]> {
    const config = this.config$.value;
    return this.httpClient.get<IMovieItem[]>(`${this.apiUrl}/${RadarrApiRoutes.MOVIE}`);
  }

  /**
   * Returns all Movies in your collection.
   */
  getMovie$(id: number): Observable<IMovieItem> {
    const config = this.config$.value;
    return this.httpClient.get<IMovieItem>(`${this.apiUrl}/${RadarrApiRoutes.MOVIE}`, {params: {id} as {}});
  }

  getProfiles$(): Observable<IProfile[]> {
    const config = this.config$.value;
    return this.httpClient.get<IProfile[]>(`${this.apiUrl}/${RadarrApiRoutes.PROFILE}`);
  }

  postMovie$(movie: PostMovieRequest): Observable<PostMovieResponse> {
    const config = this.config$.value;
    return this.httpClient.post<PostMovieResponse>(`${this.apiUrl}/${RadarrApiRoutes.MOVIE}`, movie);
  }

  putMovie$(movie: IMovieItem): Observable<IMovieItem> {
    const config = this.config$.value;
    return this.httpClient.put<IMovieItem>(`${this.apiUrl}/${RadarrApiRoutes.MOVIE}`, movie);
  }

  deleteMovie$(params: IDeleteMovieParams): Observable<{}> {
    const config = this.config$.value;
    return this.httpClient.delete<{}>(`${this.apiUrl}/${RadarrApiRoutes.MOVIE}`, {params: params as {}});
  }
}

