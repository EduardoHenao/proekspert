
This is an app to show the meteo info based on the openweathermap api.

1st of all, big thanks for exercise, t'was fun.

after instancing the git repo go to the root and
    yarn install
    yarn build

to launch in an https server 
    yarn launch
    go to http://localhost:8080

if you want to switch to http, change the launch command in package.json by removing the --https from webpack-dev-server
and then change https to http in meteo-store.ts line 25
    private baseUrl: string = "https://api.openweathermap.org/";

project points:
    the api allowed me to obtain (for free) the meteo info
    for the following 5 days, so 7 days was out of reach.

    I used, with webpack 4, typescript 3, less for styles, mobx for the stores
    and js-cookie for cookies manipulation (i store the models in a cookie for later recovery)

    components are split between simpler and complex ones.
    the less are in a mirrored folder structure to the component folder structure
    
    A 3rd folder with components called svg contains (you guessed it!) the svg components.
    instead of loading a svg file with webpack, i used the react SVG component, and loaded the internal SVG info
    into the component itself.

    the models folder contains the classes to interact with the API,
    along with the meteo-store and the json-service files.

    in assets, you'll find 2 versions of roboto and the icons font.