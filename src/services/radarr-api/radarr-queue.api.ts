import {BehaviorSubject, Observable} from 'rxjs';
import {RadarrApiRoutes} from '../models/radarr.models';
import {HttpClient} from '@angular/common/http';
import {IRadarrConfig} from '../models/config.models';
import set = Reflect.set;

export interface IQueueInfo {
  movie: {
    title: string;
    alternativeTitles: {
        sourceType: string;
        movieId: number,
        title: string;
        sourceId: number,
        votes: number,
        voteCount: number,
        language: string;
        id: number
      }[];
    secondaryYearSourceId: number,
    sortTitle: string,
    sizeOnDisk: number;
    status: string;
    overview: string;
    inCinemas: Date,
    physicalRelease: Date,
    physicalReleaseNote: string;
    images: [
      {
        coverType: 'poster',
        url: string;
      },
      {
        coverType: 'fanart',
        url: string;
      }
    ],
    website: string;
    downloaded: boolean,
    year: number,
    hasFile: boolean,
    youTubeTrailerId: string;
    studio: string;
    path: string;
    profileId: number,
    pathState: string;
    monitored: boolean,
    minimumAvailability: string;
    isAvailable: boolean,
    folderName: string;
    runtime: number,
    lastInfoSync: Date,
    cleanTitle: string;
    imdbId: string;
    tmdbId: number,
    titleSlug: string;
    genres: [],
    tags: number[]
    added: Date,
    ratings: {
      votes: number,
      value: number
    },
    movieFile: {
      movieId: number,
      relativePath: string;
      size: number,
      dateAdded: Date,
      releaseGroup: string;
      quality: {
        quality: {
          id: number,
          name: string;
          source: string;
          resolution: string;
          modifier: string;
        },
        customFormats: [],
        revision: {
          version: number,
          real: number
        }
      },
      edition: string;
      id: number
    },
    'qualityProfileId': number,
    'id': number
  };
  'quality': {
    'quality': {
      'id': number,
      name: string;
      source: string;
      resolution: string;
      modifier: string;
    },
    'customFormats': [],
    'revision': {
      'version': number,
      'real': number
    }
  };
  'size': number;
  'title': string;
  'sizeleft': number;
  'timeleft': string;
  estimatedCompletionTime: Date;
  status: string;
  trackedDownloadStatus: string;
  'statusMessages': [
    {
      title: string;
      'messages': string[]
    }
  ];
  downloadId: string;
  protocol: string;
  'id': number;
}
export class RadarrQueueApi {
  constructor(
    private httpClient: HttpClient,
    private config$: BehaviorSubject<IRadarrConfig>,
    private apiUrl: string
  ) {}

  /**
   * Gets queue info (downloading/completed, ok/warning)
   */
  getQueue(): Observable<IQueueInfo[]> {
    const config = this.config$.value;
    return this.httpClient.get<IQueueInfo[]>(`${this.apiUrl}/${RadarrApiRoutes.QUEUE}`);
  }

  deleteFromQueue$(id: number, blacklist?: boolean): Observable<boolean> {
    const config = this.config$.value;
    return this.httpClient.delete<boolean>(`${this.apiUrl}/${RadarrApiRoutes.QUEUE}`, {params: {id, blacklist} as {}});
  }

}

