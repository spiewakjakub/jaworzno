import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'jhi-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('/api/db').subscribe(response => {
      // eslint-disable-next-line no-console
      console.log(response);
    });
  }
}
