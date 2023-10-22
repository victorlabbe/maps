import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule


@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.page.html',
  styleUrls: ['./youtube.page.scss'],
})
export class YoutubePage {
  selectedOption: any = ''; // Define la propiedad selectedOption
  

  videoUrl: string[] = [
    "https://www.youtube.com/embed/EWcHFVxJPKg",
    "https://www.youtube.com/embed/zNDD4EbjORs",
    "https://www.youtube.com/embed/p4bwCz_CSVI",
    "https://www.youtube.com/embed/NFH358gXP28",
    
    
  ];

  constructor(private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() { }

  goToHome() {
    this.router.navigate(['/home']);
  }

  videoTutorial(video: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(video);
  }
}
