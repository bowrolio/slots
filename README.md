# Slots

A simple demo application.

## Getting Started

### Dependencies

* NodeJS 12+
* NPM 6+

### Installing

```
npm install
```

### Executing program

```
npm start
```
This starts the application using webpack dev server at http://localhost:3000

### Building program

```
npm run build
```
Outputs to /build

### Linter

```
npm run lint
```
Runs eslint on /src

### Test

```
npm run test
```
Runs Jest unit tests

## Help

Any advise for common problems or issues.
```
command to run if program contains helper info
```

## Technology

This is a demo application to demonstrate technical ability. It focuses on the implementation and use of front end technologies to create an enterprise grade application. Areas of focus to consider include:
* React - Frontend library
* Webpack - to bundle Javascript for use in browser
* Babel - to convert ECMAScript/TypeScript to JavaScript suitable for use in client browsers
* Sass - for styling
* Eslint - to ensure consistent coding standards
* Jest - for unit testing

## Features

* Loading game list from API endpoint (in dev mode, served from webpack dev server)
* Filter games by game name
* Filter games by top / new / all
* If filter games by top / new is active, game name search maintains top / new filter
* Games automatically become active, new, disabled (disappear from site) based on start date, expires date, newPeriod number in data. This gives the ability to add an 'ending soon' filter (not yet implemented) encouraging games to make the most of favourite games 
* Basic concepts of responsive web design with the help of bootstrap (v5)
## Authors

James Bowler
[james@bowlerltd.com](mailto:james@bowlerltd.com)

## License

This project is licensed under the [Apache License] License, excluding image assets

Image assets are copyright of their respective copyright holders and may not be copied, redistributed, modified or re-used in any way. Image licensing - https://gan.com/
