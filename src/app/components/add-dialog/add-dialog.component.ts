import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RadarrService} from '../../../services/radarr.service';
import {SonarrService} from '../../../services/sonarr.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {map, switchMap, tap} from 'rxjs/operators';
import {IAddMovieEvent} from '../../shared-components/list-item/list-item.component';
import {Observable} from 'rxjs';
export interface IAddDialogFormOutput {
  profileId: number;
  path: string;
  monitored?: boolean;
  addOptions?: {
    searchForMovie: boolean;
  };
}
export class AddDialogForm extends FormGroup {
  profileId: FormControl;
  path: FormControl;
  monitored: FormControl;
  searchForMovie: FormControl;
  constructor(data: IAddDialogData) {
    super({
      path: new FormControl(),
      monitored: new FormControl(),
      profileId: new FormControl(),
      minAvailability: new FormControl(),
      searchForMovie: new FormControl(data.event.search)
    });

    this.profileId = this.get('profileId') as FormControl;
    this.path = this.get('path') as FormControl;
    this.monitored = this.get('monitored') as FormControl;
    this.searchForMovie = this.get('searchForMovie') as FormControl;
  }

  getValue(): IAddDialogFormOutput {
    const rawVal = this.getRawValue();
    return {
      ...rawVal,
      addOptions: {
        searchForMovie: rawVal.searchForMovie
      }
    };
  }
}

export interface IAddDialogData {
  event: IAddMovieEvent;
  type: 'RADARR' | 'SONARR';
}

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  public form: AddDialogForm;
  public metadata: {
    [name: string]: {
      id: number;
      name: string;
    }[]
  };
  public minAvailabilitySelectionArr: string[];
  public metadata$: Observable<any>;
  constructor(
    private dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAddDialogData,
    private radarrService: RadarrService,
    private sonarrService: SonarrService) { }

  ngOnInit(): void {
    console.log(this.data);
    this.form = new AddDialogForm(this.data);
    if (this.data.type === 'RADARR') {
      this.metadata$ = this.radarrMetadata();
    }
  }

  addToMetadata(key: string, item: any): void {
    this.metadata = {
      ...this.metadata,
      [key]: item
    };
  }

  radarrMetadata(): Observable<any> {
    return this.radarrService.movie.getProfiles$().pipe(
      tap((profiles) => this.addToMetadata('profiles', profiles)),
      tap(() => this.minAvailabilitySelectionArr = [
        'Announced',
        'In Cinemas',
        'Physical/Web',
        'PreDB'
      ]),
      switchMap(() => this.radarrService.diskSpace.getMoviePaths$()),
      map((items) => {
        return items
          .map((item) => item.path);
      }),
      tap((paths) => this.addToMetadata('paths', paths))
    );
  }

  get sonarrMetadata(): any {
    throw(new Error('not implemented yet'));
  }

  addMovie(): void {
    this.dialogRef.close(this.form.getValue());
  }
}
