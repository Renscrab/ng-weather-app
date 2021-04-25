import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Observable, of } from 'rxjs'
import { CityForecast, WeatherapiService } from 'src/app/services/weatherapi.service'

import { CityForecastComponent } from './city-forecast.component'

describe('CityForecastComponent', () => {
    let component: CityForecastComponent
    let fixture: ComponentFixture<CityForecastComponent>
    let weatherapiServiceStub: Partial<WeatherapiService>
    weatherapiServiceStub = {
        getCityForecast(): Observable<CityForecast> {
            return of({} as CityForecast)
        }
    }
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CityForecastComponent],
            providers: [{ provide: WeatherapiService, useValue: weatherapiServiceStub }]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(CityForecastComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
