import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, combineLatest, of } from 'rxjs'
import { Observable } from 'rxjs/internal/Observable'
import { catchError, retry, switchMap } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class WeatherapiService {
    // lot of CORS Error with provided test api ...
    // apiRootPath = 'http://93.93.42.137/api'
    // apiRootPath = 'http://test:MfiTestReact2021$@93.93.42.137/api'
    // login = 'test'
    // password = 'MfiTestReact2021$'

    iconURL = 'http://openweathermap.org/img/wn/{icon}@2x.png'

    apiRootPath = 'https://api.openweathermap.org'
    apiKey = 'dc9bd1e804af39f6fa880d981645a9f6'

    headers: HttpHeaders
    options: any
    nepalCities$: BehaviorSubject<City[]> = new BehaviorSubject<City[]>([])
    selectedCityId$: BehaviorSubject<number> = new BehaviorSubject<number>(-1)
    selectedCityForecast$!: Observable<CityForecast | null>

    constructor(private http: HttpClient) {
        // const authdata = 'Basic ' + window.btoa(this.login + ':' + this.password)

        this.headers = new HttpHeaders({
            accept: '*/*'
        })

        this.options = {}
        this.options.headers = this.headers
        this.options.responseType = 'json'
        this.options.method = 'GET'

        //
        this.init()
    }

    init() {
        this.loadNepalCities()

        this.selectedCityForecast$ = combineLatest([this.nepalCities$, this.selectedCityId$]).pipe(
            switchMap(([cities, cityId]) => {
                const city = cities.find((c) => c.id === cityId)
                if (city) {
                    console.log('selectedCityForecast')
                    // return this.getCityForecastByCoordinates(city.latitude, city.longitude)
                    return this.getCityForecastByCityName(city)
                }
                return of(null)
            })
        )
    }

    loadNepalCities() {
        this.http
            .get<City[]>('./assets/api_data/nepal_cities.json')
            .pipe(
                retry(3),
                catchError((error: HttpErrorResponse) => {
                    console.error('Not able to load Nepal Cities')
                    return []
                })
            )
            .subscribe((cities) => {
                this.nepalCities$.next(cities)
            })
    }

    getCityForecastByCityName(city: City): Observable<CityForecast | null> {
        // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
        // console.log('call to getCityForecastByCityName')
        const url = `${this.apiRootPath}/data/2.5/forecast?q=${city.description}&appid=${this.apiKey}&unit=metric`

        return this.http.get<CityForecast>(url).pipe(
            retry(3),
            catchError((error: HttpErrorResponse) => {
                console.error(`Not able to load forecast by city name : ${city.description}`)
                console.error(`Trying to solve it with city coords`)
                return this.getCityForecastByCoordinates(city.latitude, city.longitude)
            })
        )
    }

    getCityForecastByCoordinates(lat: number, lon: number): Observable<CityForecast | null> {
        // console.log('call to getCityForecastByCoordinates')

        lat = parseFloat(lat.toFixed(4))
        lon = parseFloat(lon.toFixed(4))
        const url = `${this.apiRootPath}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&unit=metric`

        return this.http.get<CityForecast>(url).pipe(
            retry(3),
            catchError((error: HttpErrorResponse) => {
                console.error('Not able to load forecast for city id : ' + this.selectedCityId$.value)
                return of(null)
            })
        )
    }

    getCitiesAroundCoord(lat: number, lon: number) {
        // api.openweathermap.org/data/2.5/find?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
        const url = `${this.apiRootPath}/data/2.5/find?lat=${lat}&lon=${lon}&cnt=50&appid=${this.apiKey}&unit=metric`

        this.http
            .get<any>(url)
            .pipe(
                retry(3),
                catchError((error: HttpErrorResponse) => {
                    console.error('Not able to get cities around point')
                    return []
                })
            )
            .subscribe((result) => {
                console.log(result)
            })
    }

    getNepalCities() {
        return this.nepalCities$.asObservable()
    }

    getIconURL(iconId: string) {
        return this.iconURL.replace('{icon}', iconId)
    }

    selectCity(cityId: number) {
        if (cityId !== this.selectedCityId$.value) {
            this.selectedCityId$.next(cityId)
        }
    }

    getCityForecast() {
        return this.selectedCityForecast$
    }
}

export interface City {
    id: number
    latitude: number
    longitude: number
    description: string
    type: string
    coordinate: string
    region: string
    level: string
    geometry: string
    domain: string
    tags: string
}

export interface CityForecast {
    cod: string
    message: number
    cnt: number
    list: List[]
    city: {
        id: number
        name: string
        coord: Coord
        country: string
        population: number
        timezone: number
        sunrise: number
        sunset: number
    }
}

interface Coord {
    lat: number
    lon: number
}

interface List {
    dt: number
    main: Main
    weather: Weather[]
    clouds: Clouds
    wind: Wind
    visibility: number
    pop: number
    sys: Sys
    dt_txt: string
    rain?: Rain
}

interface Rain {
    '3h': number
}

interface Sys {
    pod: string
}

interface Wind {
    speed: number
    deg: number
    gust: number
}

interface Clouds {
    all: number
}

interface Weather {
    id: number
    main: string
    description: string
    icon: string
}

interface Main {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
}
