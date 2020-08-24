import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {IRadarrConfig, IRadarrConfigForm, ISonarrConfig, ISonarrConfigForm} from '../../../../../services/models/config.models';
import {ConfigService} from '../../../../../services/config.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

class RadarrConfigForm extends FormGroup implements IRadarrConfigForm {
  apiKey: FormControl;
  hostName: FormControl;
  port: FormControl;

  constructor(config: IRadarrConfig) {
    super({
      apiKey: new FormControl(!!config ? config.apiKey : null),
      hostName: new FormControl(!!config ? config.hostName : null),
      port: new FormControl(!!config ? config.port : null)
    });
    this.apiKey = this.get('apiKey') as FormControl;
    this.hostName = this.get('hostName') as FormControl;
    this.port = this.get('port') as FormControl;
  }
}

class SonarrConfigForm extends FormGroup implements ISonarrConfigForm {
  v3: FormControl;
  apiKey: FormControl;
  hostName: FormControl;
  port: FormControl;

  constructor(config: ISonarrConfig) {
    super({
      v3: new FormControl(!!config ? config.apiKey : null),
      apiKey: new FormControl(!!config ? config.apiKey : null),
      hostName: new FormControl(!!config ? config.hostName : null),
      port: new FormControl(!!config ? config.port : null)
    });
    this.v3 = this.get('v3') as FormControl;
    this.apiKey = this.get('apiKey') as FormControl;
    this.hostName = this.get('hostName') as FormControl;
    this.port = this.get('port') as FormControl;
  }
}

@Component({
  selector: 'app-config-edit-form',
  templateUrl: './config-edit-form.component.html',
  styleUrls: ['./config-edit-form.component.scss']
})
export class ConfigEditFormComponent implements OnInit {
  @Input() formType: 'Radarr' | 'Sonarr';
  formGroup: RadarrConfigForm | SonarrConfigForm;
  formGroupSubscription$: Observable<any>;
  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    switch (this.formType) {
      case 'Radarr':
        this.formGroup = new RadarrConfigForm(this.configService.radarrConfig);
        this.formGroupSubscription$ = this.formGroup.valueChanges.pipe(
          tap((values) => this.configService.radarrConfig = values),
          tap(() => console.log('meow'))
        );
        break;
      case 'Sonarr':
        this.formGroup = new SonarrConfigForm(this.configService.sonarrConfig);
        this.formGroupSubscription$ = this.formGroup.valueChanges.pipe(
          tap((values) => this.configService.sonarrConfig = values),
          tap(() => console.log('meow'))
        );
        break;
    }
  }

}
