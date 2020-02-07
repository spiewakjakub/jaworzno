import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPoster } from 'app/shared/model/poster.model';

type EntityResponseType = HttpResponse<IPoster>;
type EntityArrayResponseType = HttpResponse<IPoster[]>;

@Injectable({ providedIn: 'root' })
export class PosterService {
  public resourceUrl = SERVER_API_URL + 'api/posters';

  constructor(protected http: HttpClient) {}

  create(poster: IPoster): Observable<EntityResponseType> {
    return this.http.post<IPoster>(this.resourceUrl, poster, { observe: 'response' });
  }

  update(poster: IPoster): Observable<EntityResponseType> {
    return this.http.put<IPoster>(this.resourceUrl, poster, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPoster>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPoster[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
