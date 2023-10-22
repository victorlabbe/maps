import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  map: any; // Declara la variable para el mapa
  infoWindows: any = [];
  markers: any = [
    {
      title: "Mi casa",
      latitude: -33.02072985301783,
      longitude: -71.50881024970636,
      adress: "manuel novoa 35, Miraflores Viña del mar",
      horario: "Hora pick de las 18:00 a las 12:00"
    }
  ];

  constructor(private router: Router) { }



  // Define la función initMap
  initMap() {
    const mapEle: HTMLElement = document.getElementById('map');
    const myLatLng = { lat: -33.02072985301783, lng: -71.50881024970636 };
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.addMarkersToMap(this.markers);
    });
  }

  
  addMarkersToMap(markers){
    for (let marker of markers ){
      let position = new google.maps.LatLng(parseFloat(marker.latitude), parseFloat(marker.longitude));
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude,
        adress: marker.adress,
        horario: marker.horario
      });
      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker)
    }
  }
  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div id="content" class="info-window">' +
      '<h2 id="firstHeading" class="firstHeading">' + marker.title + '</h2>' +
      '<p>Direccion: ' + marker.adress + '</p>' +
      '<p>Horario: ' + marker.horario + '</p>' +     
      '</div>';
  
    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
  
    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.setContent(infoWindowContent); // Aplica la clase CSS aquí
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
  }
  
  
  closeAllInfoWindows(){
    for(let window of this.infoWindows){
      window.close();
    }
  }

  ngOnInit() {
    // Llama a la función initMap al inicializar la página
    this.initMap();
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
  
}
