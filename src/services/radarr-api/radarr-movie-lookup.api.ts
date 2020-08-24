import {BehaviorSubject, Observable} from 'rxjs';
import {RadarrApiRoutes} from '../models/radarr.models';
import {HttpClient} from '@angular/common/http';
import {IRadarrConfig} from '../models/config.models';
import set = Reflect.set;

export interface ITraktSearchResult {
    id: number;
    isLoading?: boolean;
    title: string;
    alternativeTitles: string[];
    secondaryYearSourceId: number;
    sortTitle: string;
    sizeOnDisk: number;
    status: string;
    overview: string;
    inCinemas: string;
    images: [
      {
        coverType: 'poster',
        url: string;
      }
    ];
    downloaded: boolean;
    remotePoster: string;
    year: number;
    hasFile: boolean;
    profileId: number;
    pathState: string;
    monitored: boolean;
    minimumAvailability: string;
    isAvailable: boolean;
    folderName: string;
    runtime: number;
    tmdbId: number;
    titleSlug: string;
    genres: string[];
    tags: string[];
    added: Date;
    ratings: {
      votes: number;
      value: number;
    },
    qualityProfileId: number;
    isRemote: true;
  }
export class RadarrMovieLookupApi {
  constructor(
    private httpClient: HttpClient,
    private config$: BehaviorSubject<IRadarrConfig>,
    private apiUrl: string
  ) {}

  /**
   * Search for movie on Trakt
   */
  searchForMovie$(type: 'term' | 'tmdbId' | 'imdbId', searchVal): Observable<ITraktSearchResult[]> {
    const params = {};
    const url = type === 'tmdbId' ? '/tmdbId' : type === 'imdbId' ? '/imdbId' : '';
    set(params, type, searchVal);
    const config = this.config$.value;
    return this.httpClient.get<ITraktSearchResult[]>(`${this.apiUrl}/${RadarrApiRoutes.MOVIE_LOOKUP}${url}`, {params});
  }

}

