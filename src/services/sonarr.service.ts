import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IRadarrConfig, ISonarrConfig} from './models/config.models';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SonarrService {
  constructor(private configService: ConfigService) { }
}
