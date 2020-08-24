import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {delay, map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        width: '200px',
        opacity: '1'
      })),
      state('closed', style({
        height: '0',
        width: '0',
        opacity: '0'
      })),
      transition('open => closed', [
        animate('0.15s')
      ]),
      transition('void => open', [
        animate('0.15s')
      ]),
    ]),
  ],
  styleUrls: ['./settings-menu.component.scss']
})
export class SettingsMenuComponent implements OnInit {
  editSonarrFormState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  editSonarrFormState$: Observable<'open' | 'closed'> = this.editSonarrFormState.pipe(map((open) => open ? 'open' : 'closed'));
  editSonarrHide$: Observable<boolean> = this.editSonarrFormState$.pipe(
    map((text) => text === 'open'),
    switchMap((item) => {
      if (!item) {
        return of(item).pipe(
          delay(150)
        );
      } else {
        return of(item);
      }
    }),
  );
  editRadarrFormState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  editRadarrFormState$: Observable<'open' | 'closed'> = this.editRadarrFormState.pipe(map((open) => open ? 'open' : 'closed'));
  editRadarrHide$: Observable<boolean> = this.editRadarrFormState$.pipe(
    map((text) => text === 'open'),
    switchMap((item) => {
      if (!item) {
        return of(item).pipe(
          delay(150)
        );
      } else {
        return of(item);
      }
    }),
  );
  constructor() { }

  ngOnInit(): void {
  }
  public toggleSonarrSettings(): void {
    this.editSonarrFormState.next(!this.editSonarrFormState.value);
  }
  public toggleRadarrSettings(): void {
    this.editRadarrFormState.next(!this.editRadarrFormState.value);
  }

}
