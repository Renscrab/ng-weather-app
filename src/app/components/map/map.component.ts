import { Component, OnInit, ViewChild } from '@angular/core'
import { GoogleMap, MapInfoWindow } from '@angular/google-maps'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { City, WeatherapiService } from 'src/app/services/weatherapi.service'

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    @ViewChild(GoogleMap, { static: true }) googleMap!: GoogleMap
    @ViewChild(MapInfoWindow, { static: true }) info!: MapInfoWindow

    zoom = 7
    center!: google.maps.LatLngLiteral

    options: google.maps.MapOptions = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        tilt: 45,
        zoomControl: true,
        scrollwheel: true,
        disableDoubleClickZoom: true,
        maxZoom: 15,
        minZoom: 4
    }
    markers!: Observable<any[]>
    infoContent = ''

    constructor(private weatherapiService: WeatherapiService) {}

    ngOnInit(): void {
        // GO TO NEPAL coords
        this.center = {
            lat: 28.26779327879068,
            lng: 83.95214993330887
        }

        //
        this.markers = this.weatherapiService.getNepalCities().pipe(
            map((cities) => {
                return cities.map((c: City) => {
                    return {
                        id: c.id,
                        city: c,
                        position: {
                            lat: c.latitude,
                            lng: c.longitude
                        },
                        label: {
                            text: c.description
                        },
                        title: 'city ' + c.id,
                        info: 'Marker info ' + c.id,
                        options: {
                            anchorPoint: new google.maps.Point(0, 50)
                        }
                    }
                })
            })
        )
    }
    click(event: google.maps.MapMouseEvent) {
        console.log(event)
    }

    onMarkerClick(marker: any) {
        this.weatherapiService.selectCity(marker.id)
    }
}
