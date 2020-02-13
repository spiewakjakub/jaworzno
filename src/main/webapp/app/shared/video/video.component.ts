import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'jhi-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @Input() src: string | undefined;
  safeSrc?: SafeResourceUrl;
  private readonly YOUTUBE_EMBED_LINK = 'https://www.youtube.com/embed/';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.src) {
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.YOUTUBE_EMBED_LINK + this.src);
    }
  }
}
