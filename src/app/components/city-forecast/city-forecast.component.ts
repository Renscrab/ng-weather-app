import { Component, OnInit } from '@angular/core'
import { Chart } from 'angular-highcharts'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { CityForecast, WeatherapiService } from 'src/app/services/weatherapi.service'

@Component({
    selector: 'app-city-forecast',
    templateUrl: './city-forecast.component.html',
    styleUrls: ['./city-forecast.component.css']
})
export class CityForecastComponent implements OnInit {
    forecastData$!: Observable<CityForecast | null>
    chart!: Chart

    constructor(private weatherapiService: WeatherapiService) {}

    ngOnInit(): void {
        this.forecastData$ = this.weatherapiService.getCityForecast().pipe(
            tap((forecastData) => {
                if (forecastData != null) {
                    console.log(forecastData)
                    this.updateChart(forecastData)
                }
            })
        )
    }
    updateChart(forecastData: CityForecast) {
        //
        const dateData: string[] = []
        const tempData: any[] = []
        const huData: number[] = []
        const weatherIcons: any[] = []

        forecastData.list.forEach((data) => {
            if (data.dt_txt.indexOf('12:00:00') > -1) {
                dateData.push(data.dt_txt)
                tempData.push({
                    y: Math.round(data.main.temp / 10)
                })

                huData.push(data.main.humidity)
                weatherIcons.push({
                    weather: data.weather[0].main,
                    y: 150,
                    marker: {
                        symbol: `url(${this.weatherapiService.getIconURL(data.weather[0].icon)})`
                    }
                })
            }
        })

        this.chart = new Chart({
            chart: {
                type: 'line'
            },

            title: {
                text: 'Temperature & Humidity forecast'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: dateData
            },
            series: [
                {
                    name: 'Weather',
                    type: 'line',
                    data: weatherIcons
                },
                {
                    name: 'Temperature',
                    type: 'line',
                    data: tempData
                },
                {
                    name: 'Humidity',
                    type: 'line',
                    data: huData
                }
            ]
        })
    }
    onClose(event: MouseEvent) {
        this.weatherapiService.selectCity(-1)
    }
}
