import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IMovieItem} from '../../../services/radarr-api/radarr-movie.api';
import {ITraktSearchResult} from '../../../services/radarr-api/radarr-movie-lookup.api';
export interface IAddMovieEvent {
  movie: ITraktSearchResult;
  search: boolean;
}
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() movie: IMovieItem | ITraktSearchResult;
  @Input() localBaseUrl: string;
  @Input() loadingAdd: boolean;
  @Output() add: EventEmitter<IAddMovieEvent> = new EventEmitter<IAddMovieEvent>();
  public localMovie: IMovieItem;
  public remoteMovie: ITraktSearchResult;
  public pathState: string;
  public isAdded: boolean;
  constructor() { }

  ngOnInit(): void {
    this.remoteMovie = this.movie as ITraktSearchResult;
    this.localMovie = this.movie as IMovieItem;
    const date = new Date(this.movie.added);
    this.isAdded = date.getTime() > 0;
  }

  addMovie(remoteMovie: ITraktSearchResult): void {
    this.add.emit({
      movie: remoteMovie,
      search: false
    });
  }

  addAndSearchMovie(remoteMovie: ITraktSearchResult): void {
    this.add.emit({
      movie: remoteMovie,
      search: true
    });
  }
}
