import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {ConfigService} from './config.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(private configService: ConfigService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const radarrConfig = this.configService.radarrConfig;
    const sonarrConfig = this.configService.sonarrConfig;
    const radarrUrl = `${radarrConfig.hostName}:${radarrConfig.port}`.toLowerCase();
    let apiReq;
    if (req.url.toLowerCase().includes(radarrUrl)) {
      apiReq = req.clone({ url: `${req.url}`, params: req.params.set('apiKey', radarrConfig.apiKey)});
    } else {
      apiReq = req.clone({ url: `${req.url}`, params: req.params.set('apiKey', sonarrConfig.apiKey)});
    }
    return next.handle(apiReq);
  }
}
