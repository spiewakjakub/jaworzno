import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPlace } from 'app/shared/model/place.model';

type EntityResponseType = HttpResponse<IPlace>;
type EntityArrayResponseType = HttpResponse<IPlace[]>;

@Injectable({ providedIn: 'root' })
export class PlaceService {
  public resourceUrl = SERVER_API_URL + 'api/places';

  constructor(protected http: HttpClient) {}

  create(place: IPlace): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(place);
    return this.http
      .post<IPlace>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(place: IPlace): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(place);
    return this.http
      .put<IPlace>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPlace>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPlace[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(place: IPlace): IPlace {
    const copy: IPlace = Object.assign({}, place, {
      date: place.date && place.date.isValid() ? place.date.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((place: IPlace) => {
        place.date = place.date ? moment(place.date) : undefined;
      });
    }
    return res;
  }
}
