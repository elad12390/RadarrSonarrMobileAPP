import {Component, OnInit, ViewChild} from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, filter, finalize, map, startWith, switchMap, tap} from 'rxjs/operators';
import {RadarrService} from '../../../services/radarr.service';
import {IMovieItem, PostMovieRequest} from '../../../services/radarr-api/radarr-movie.api';
import {ITraktSearchResult} from '../../../services/radarr-api/radarr-movie-lookup.api';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {IAddMovieEvent} from '../../shared-components/list-item/list-item.component';
import {MatDialog} from '@angular/material/dialog';
import {AddDialogComponent, IAddDialogFormOutput, IAddDialogData} from '../../components/add-dialog/add-dialog.component';
class SearchFormGroup extends FormGroup {
  searchTerm: FormControl;
  constructor() {
    super({
      searchTerm: new FormControl(null)
    });
    this.searchTerm = this.get('searchTerm') as FormControl;
  }

}
@Component({
  selector: 'app-radarr',
  templateUrl: './radarr.component.html',
  styleUrls: ['./radarr.component.scss']
})
export class RadarrComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;
  public moviesList: IMovieItem[];
  public filteredMovies$: Observable<IMovieItem[] | ITraktSearchResult[]>;
  public moviesList$: Observable<IMovieItem[]>;
  public baseUrl: string = this.radarrService.baseUrl;
  public searchForm = new SearchFormGroup();
  constructor(private radarrService: RadarrService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.moviesList$ = this.radarrService.movie.getAllMovies$().pipe(
      tap((movies) => {
        const localMovies = movies.map(item => {
          item.isRemote = false;
          return item;
        });
        this.filteredMovies$ = this.searchForm.searchTerm.valueChanges.pipe(
          debounceTime(300),
          startWith(''),
          switchMap((searchTerm) => {
            if (searchTerm) {
              return this.radarrService.movieLookup.searchForMovie$('term', searchTerm).pipe(
                map((items) => [...items.map(item => {
                  item.isRemote = true;
                  return item;
                })]),
              );
            }
            return of([...localMovies]);
          }),
          finalize(() => {
            if (this.virtualScroll) {
              this.virtualScroll.scrollToIndex(0);
            }
          })
        );
      })
    );
    // this.radarrService.movieLookup.searchForMovie$('term', 'indiana jones').pipe(
    //   tap((item) => console.log(item))
    // ).subscribe();
  }

  addMovie($event: IAddMovieEvent): void {
    $event.movie.isLoading = true;
    const dialogData: IAddDialogData = {
      event: $event,
      type: 'RADARR'
    };
    this.dialog.open(AddDialogComponent, {
      data: dialogData
    }).afterClosed().pipe(
      map((data: IAddDialogFormOutput) => {
        if (data) {
          return new PostMovieRequest($event.movie, data);
        }
      }),
      switchMap((request) => this.radarrService.movie.postMovie$(request)),
      tap(() => $event.movie.isLoading = true)
    ).subscribe();
  }
}
