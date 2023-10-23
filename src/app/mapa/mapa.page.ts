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
      title: "Astros GYM",
      latitude: -33.008514926683375,
      longitude: -71.54258595011295,
      adress: "14 Nte 1141, 2520000 Viña del Mar, Valparaíso",
      horario: "Hora pick de las 08:10 a las 21:30"
    },
	
	{
      title: "Gimnasio Energy",
      latitude: -33.00743526926874,
      longitude: -71.54782162206675,
      adress: "Av. Libertad 1348, Local 400, 2530900 Valparaíso, Viña del Mar, Valparaíso",
      horario: "Hora pick de las 07:00 a las 23:00"
    },
	
	{
      title: "Gimnasio CuerpoMente",
      latitude: -33.013616604147174,
      longitude: -71.55415061993232,
      adress: "8 Nte. 340, 2520104 Viña del Mar, Valparaíso",
      horario: "Hora pick de las 07:00 a las 21:00"
    },
	
	{
      title: "Gimnasio Marcos Cafena",
      latitude: -33.017934852064414,
      longitude: -71.5432501230713,
      adress: "5 Ote. 356, 2531112 Viña del Mar, Valparaíso",
      horario: "Hora pick de las 07:30 a las 22:00"
    },
	
	{
      title: "Sportlife Viña del Mar",
      latitude: -33.006939545460554,
      longitude: -71.54515314603223,
      adress: "Av. Benidorm 961, 2530178 Viña del Mar, Valparaíso",
      horario: "Hora pick de las 07:00 a las 22:00"
    },
	
	{
      title: "Gimnasio Polideportivo de Viña del Mar",
      latitude: -33.01530659225186, 
      longitude: -71.53536844909952,
      adress: "Av. Padre Hurtado 300, Viña del Mar, Valparaíso",
      horario: "Hora pick de las 12:00 a las 12:00"
    },
	
	{
      title: "Gimnasio Pacific Sucursal VIÑA DEL MAR",
      latitude: -33.02257538185263,
      longitude: -71.55849981883955,
      adress: "Arlegui 302, 2571494 Viña del Mar, Valparaíso",
      horario: "Hora pick de las 09:00 a las 09:00"
    },
	
	{
      title: "Centro Deportivo Konas",
      latitude: -33.025202074256924,
      longitude: -71.54858637478151,
      adress: "Av. Valparaíso 950, 2520535 Viña del Mar, Valparaíso",
      horario: "Hora pick de las 07:00 a las 22:15"
    },
	
	{
      title: "Gimnasio Team Gym Kamakura",
      latitude: -33.0214959111468,
      longitude: -71.56163266532045,
      adress: "Von Schroeder 70, 2571407 Viña del Mar, Valparaíso",
      horario: "Hora pick de las 09:00 a las 23:00"
    },
	
	{
      title: "Gym Leme",
      latitude: -33.02610162293524,
      longitude: -71.56193307303641,
      adress: "Von Schroeder 444, 2580123 Viña del Mar, Valparaíso",
      horario: "Hora pick de las 07:00 a las 21:00"
    },
	
	{
      title: "Gimnasio Seven",
      latitude: -33.026245547552676,
      longitude: -71.56334927929417,
      adress: "Bellavista 237, Viña del Mar, Valparaíso",
      horario: "Hora pick de las 07:00 a las 23:00"
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
