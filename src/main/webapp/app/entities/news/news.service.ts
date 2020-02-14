import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INews } from 'app/shared/model/news.model';

type EntityResponseType = HttpResponse<INews>;
type EntityArrayResponseType = HttpResponse<INews[]>;

@Injectable({ providedIn: 'root' })
export class NewsService {
  public resourceUrl = SERVER_API_URL + 'api/news';

  constructor(protected http: HttpClient) {}

  create(news: INews): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(news);
    return this.http
      .post<INews>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(news: INews): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(news);
    return this.http
      .put<INews>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<INews>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INews[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPage(page: number, size: number): Observable<HttpResponse<any>> {
    return this.http.get<INews[]>(SERVER_API_URL + '/api/news/page', {
      params: {
        page: page.toString(),
        size: size.toString()
      },
      observe: 'response'
    });
  }

  protected convertDateFromClient(news: INews): INews {
    const copy: INews = Object.assign({}, news, {
      date: news.date && news.date.isValid() ? news.date.toJSON() : undefined
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
      res.body.forEach((news: INews) => {
        news.date = news.date ? moment(news.date) : undefined;
      });
    }
    return res;
  }
}
