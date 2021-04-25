#TEST

The context of this test is to provide a simple application to display city weather forecast of Nepal.
API provided but fake data or any open source data can be used instead (in that case, any country is allowed).

Using React (preferred) or any Javascript framework of your choice,  implement the following features:

- Display cities locations for on a map
- On click on a city pin, display the next 3 days temperature (t) and humidity (hu) forcast on a chart (library of your choice, highcharts recommended).
- Deploy all this stack using docker and docker-compose
- API (use for this purpose only):
	- HTTP authentication : login:"test",password:"MfiTestReact2021$"
	- Request cities : http://93.93.42.137/api/cities?domain=nepal
	- Request a city forecast: http://93.93.42.137/api/forecast?area_id={int}
	- swagger documentation :  : http://93.93.42.137/media/swagger-ui/index.html
- [Optional] Make it responsive for mobile device.
- [Optional] Also display weather icon on the chart using parameter "ww". Code correlation can be founed in"substitutes" section on endpoint http://93.93.42.137/api/forecastconfig.

The source code should be delivered using github with detailed explanations on how to deploy and launch the project.

#NOTE

## Problem to connect with the API

I was unable to connect to the provided API (http://93.93.42.137/) with any browser 

Tried with:

`apiRootPath = 'http://93.93.42.137/api'`

and

`apiRootPath = 'http://test:MfiTestReact2021$@93.93.42.137/api'`

in HttpRequest

`const authdata = 'Basic ' + window.btoa(this.login + ':' + this.password)`

`headers.set('Authorization', authData)`

I only had had cors error.

It worked With other rest testing application however , with basic Auth.

So finally I saved the result of http://93.93.42.137/api/cities?domain=nepal in a local json (nepal_cities.json) 
and used another weather API (openweather)

## JS framework = Angular 11

I wish I could have done it with ReactJS, that's was my objective at first but I dont know ReactJs enough to do this exercice fast enough

## Google Map

GoogleMap is used without an api key => dev mode

## Getting Forecast with different City Name

The name and the coordinates of the cities are from the provided API, but forecast data comes from openweather.
So if openweather can't fin the name of the city after 4 try, the local service fallback to a search by coordinates (approximate).

That's why some city pin display forecast for another city
example: clic on Jhapa display Bhadrapur (south-east pin)


# NgWeatherApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
