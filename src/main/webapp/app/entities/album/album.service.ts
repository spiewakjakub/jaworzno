import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAlbum } from 'app/shared/model/album.model';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

type EntityResponseType = HttpResponse<IAlbum>;
type EntityArrayResponseType = HttpResponse<IAlbum[]>;
type PagedType = {
  content: IAlbum[];
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
};
type EntityPagedResponseType = HttpResponse<PagedType>;

@Injectable({ providedIn: 'root' })
export class AlbumService {
  public resourceUrl = SERVER_API_URL + 'api/albums';

  constructor(protected http: HttpClient) {}

  create(album: IAlbum): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(album);
    return this.http
      .post<IAlbum>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(
        map((res: EntityResponseType) =>
          this.convertDateFromServer(res)
        )
      );
  }

  update(album: IAlbum): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(album);
    return this.http
      .put<IAlbum>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(
        map((res: EntityResponseType) =>
          this.convertDateFromServer(res)
        )
      );
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IAlbum>(`${this.resourceUrl}/${id}`, {
        observe: 'response'
      })
      .pipe(
        map((res: EntityResponseType) =>
          this.convertDateFromServer(res)
        )
      );
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAlbum[]>(this.resourceUrl, {
        params: options,
        observe: 'response'
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {
      observe: 'response'
    });
  }

  getPage(
    page: number,
    size: number
  ): Observable<EntityPagedResponseType> {
    return this.http.get<PagedType>(
      SERVER_API_URL + '/api/albums/page',
      {
        params: {
          page: page.toString(),
          size: size.toString()
        },
        observe: 'response'
      }
    );
  }

  protected convertDateFromClient(album: IAlbum): IAlbum {
    return Object.assign({}, album, {
      date:
        album.date && album.date.isValid()
          ? album.date.toJSON()
          : undefined
    });
  }

  protected convertDateFromServer(
    res: EntityResponseType
  ): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date
        ? moment(res.body.date)
        : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(
    res: EntityArrayResponseType
  ): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((album: IAlbum) => {
        album.date = album.date ? moment(album.date) : undefined;
      });
    }
    return res;
  }

  getNewest(): Observable<IAlbum> {
    return this.http.get<IAlbum>(
      SERVER_API_URL + '/api/albums/newest'
    );
  }
}
