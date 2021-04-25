import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { GoogleMapsModule } from '@angular/google-maps'
import { AppComponent } from './app.component'
import { MapComponent } from './components/map/map.component'
import { HttpClientModule } from '@angular/common/http'

import { CityForecastComponent } from './components/city-forecast/city-forecast.component'
import { FormsModule } from '@angular/forms'
import { ChartModule } from 'angular-highcharts'

@NgModule({
    declarations: [AppComponent, MapComponent, CityForecastComponent],
    imports: [BrowserModule, GoogleMapsModule, HttpClientModule, FormsModule, ChartModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
