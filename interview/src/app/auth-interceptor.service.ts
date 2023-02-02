import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  private accesskey = "yCH9TzkA__tmciIqdmgbMpPxysG1p0fC6CMfEXHLqAw"
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone(
      {
        setHeaders: {
          "Authorication": `Client-ID ${this.accesskey}`
        }
      }
    );
    return next.handle(req)
  }
}
