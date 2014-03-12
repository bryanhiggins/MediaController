var express = require("express"),
    fs = require("fs"),
    path = require("path"),
    app = express(),
    routePath = path.resolve(__dirname, path.join("..", "routes")),
    routes = fs.readdirSync(routePath);

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});

// Add headers to all requests
app.all('/*', function (req, res, next){
    // Disable caching
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);

    next();
});

routes.forEach(function (file) {
    var route = require(path.resolve(routePath, file));
    Object.getOwnPropertyNames(route).forEach(function (cmd) {
        app[cmd]("/" + path.basename(file, '.js'), route[cmd]);
    });
});

app.use(express.static(path.resolve(__dirname, path.join("..", "public"))));

app.get("/", function (req, res) {
    res.sendfile(path.resolve(__dirname, path.join("..", "public", "index.html")));
});

module.exports = app;
