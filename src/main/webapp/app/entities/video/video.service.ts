import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IVideo } from 'app/shared/model/video.model';

type EntityResponseType = HttpResponse<IVideo>;
type EntityArrayResponseType = HttpResponse<IVideo[]>;
type PagedType = {
  content: IVideo[];
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
};
type EntityPagedResponseType = HttpResponse<PagedType>;

@Injectable({ providedIn: 'root' })
export class VideoService {
  public resourceUrl = SERVER_API_URL + 'api/videos';

  constructor(protected http: HttpClient) {}

  create(video: IVideo): Observable<EntityResponseType> {
    return this.http.post<IVideo>(this.resourceUrl, video, {
      observe: 'response'
    });
  }

  update(video: IVideo): Observable<EntityResponseType> {
    return this.http.put<IVideo>(this.resourceUrl, video, {
      observe: 'response'
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVideo>(`${this.resourceUrl}/${id}`, {
      observe: 'response'
    });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVideo[]>(this.resourceUrl, {
      params: options,
      observe: 'response'
    });
  }

  getPage(
    page: number,
    size: number
  ): Observable<EntityPagedResponseType> {
    return this.http.get<PagedType>(
      SERVER_API_URL + '/api/videos/page',
      {
        params: {
          page: page.toString(),
          size: size.toString()
        },
        observe: 'response'
      }
    );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {
      observe: 'response'
    });
  }
}
