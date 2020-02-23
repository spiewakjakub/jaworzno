import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
@Component({
  selector: 'jhi-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(SERVER_API_URL + 'api/db').subscribe(response => {
      // eslint-disable-next-line no-console
      console.log(response);
    });
  }
}
