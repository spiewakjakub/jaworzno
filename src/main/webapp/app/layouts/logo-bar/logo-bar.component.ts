import { Component, OnInit } from '@angular/core';
import { Sponsor } from 'app/shared/model/sponsor.model';
import { SponsorService } from 'app/entities/sponsor/sponsor.service';

@Component({
  selector: 'jhi-logo-bar',
  templateUrl: './logo-bar.component.html',
  styleUrls: ['./logo-bar.component.scss']
})
export class LogoBarComponent implements OnInit {
  sponsors?: Sponsor[];

  constructor(private sponsorService: SponsorService) {}

  ngOnInit(): void {
    this.sponsorService.query().subscribe(sponsorsResponse => {
      this.sponsors = sponsorsResponse.body as Sponsor[];
    });
  }
}
