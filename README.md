# AlaskaUnguided 

#root dir (Server side files only)
    package.json - Config file for app
    app.js - node entry point


#node_modules (required node modules)


#bin (contains http js)
    www.js - runs the node webserver


#routes (directs GET/POST traffic to specific views)
    index.js - routes to index


#public dir (static file dependencies js,css,etc)
    Stylesheets
    javascripts
    images


#views dir (static html files)
    index.html - all root traffic routed here
    error.html - all other traffic routed here


#deployment
    https://polar-harbor-76417.herokuapp.com/ - Dev Build (syncs dev)
    https://protected-tundra-58518.herokuapp.com/ - Prod build (syncs master)