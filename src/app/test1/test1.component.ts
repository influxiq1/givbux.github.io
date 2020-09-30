import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component implements OnInit {
  latitude: number;
  longitude: number;
  zoom: number;
  public address: string = '';
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;

public parameterid:any;
  constructor(route: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    console.log(route.snapshot.params.id);
    this.parameterid = route.snapshot.params.id;
   }

  ngOnInit(): void {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    };
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      this.address = results[0].formatted_address;
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  changed(event:any){
    console.log('+++++++')
  }

}
