import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { VIDEO_CONFIG } from './scanner.const';
import  jsQR  from 'jsqr';
import { Subject, take, takeUntil, timer } from 'rxjs';





@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.page.html',
  styleUrls: ['./checkin.page.scss'],
})
export class CheckinPage implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('videoElement') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', {static: true}) canvas!: ElementRef


  videoStream!: MediaStream
  config = structuredClone(VIDEO_CONFIG)

  private distroy$ = new Subject<void>

  videoLoaded: boolean = true;

  constructor(
    private router: Router,
    ) { }

  ngAfterViewInit(): void {    
    this.prepareScanner()
  }

  async prepareScanner(){
    const aviable = this.checkCamera()
    if (aviable) this.startScanner()
  }
  async waitForVideoToLoad() {
    while (!this.video?.nativeElement) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    this.videoLoaded = true;
  }


  changeCamera(){
    let {facingMode}= this.config.video
    this.config.video.facingMode = facingMode === 'enviroment' ? 'user': 'enviroment'
    this.startScanner()
  }


  async startScanner(){
    this.videoStream = await navigator.mediaDevices.getUserMedia(this.config)
    this.video.nativeElement.srcObject = this.videoStream

    this.spyCamera()
  }
  
  async spyCamera() {
    console.log('Waiting for video to load...');
    await this.waitForVideoToLoad();
    console.log('Video is loaded.');
  
    if (this.video && this.video.nativeElement) {
      const { clientWidth, clientHeight } = this.video.nativeElement;
      this.canvas.nativeElement.width = clientWidth; // Cambia clientWidth por width
      this.canvas.nativeElement.height = clientHeight; // Cambia clientHeight por height
    
      const canvas = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    
      canvas.drawImage(this.video.nativeElement, 0, 0, clientWidth, clientHeight);
      const inversionAttempts = 'dontInvert';
    
      const image = canvas.getImageData(0, 0, clientWidth, clientHeight);
      const qrcode = jsQR(image.data, image.width, clientHeight, { inversionAttempts });
    
      if (qrcode) {
        const { data } = qrcode;
        // Realiza alguna acción con el código QR
      } else {
        timer(500).pipe(takeUntil(this.distroy$)).subscribe(() => {
          this.spyCamera();
        });
      }
    } else {
      console.error('this.video o this.video.nativeElement es undefined.');
    }
    
  }

   async checkCamera(){
    const cameraPermitions = await navigator.permissions.query({name:'camera'} as any)
    console.log(cameraPermitions)

    const isOk = cameraPermitions.state != "denied"

    const hasmediDevice = 'mediaDevice' in navigator
    const hasUsermedia = 'getYserMedia' in navigator.mediaDevices

    if (!hasmediDevice || (!hasUsermedia &&isOk)){

    }

    return cameraPermitions.state !== "denied"
  }


ngOnDestroy() {

  this.videoStream.getTracks().forEach((track: MediaStreamTrack) =>track.stop())
  this.video = null!

  this.distroy$.next()
  this.distroy$.complete()
}






  ngOnInit() {
    document.addEventListener('deviceready', () => {     
    });
  }
  
 
  goToHome() {
    this.router.navigate(['/home']);
  }

}
