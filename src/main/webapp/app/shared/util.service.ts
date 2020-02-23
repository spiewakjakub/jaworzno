import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private readonly resourceApi = 'api/util';

  constructor(private http: HttpClient) {}

  getMainLogo(): Observable<string> {
    return this.http
      .get<HttpResponse<string>>(this.resourceApi)
      .pipe(map(response => response.body as string));
  }
}
