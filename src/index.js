const path = require("path");
const express = require("express");
const stats = require("./lib/stats");
const geoLocation = require("./lib/geolocation");
const hbs = require("hbs");
// const geolocation = require("./lib/geolocation");

const app = express();
const port = process.env.PORT || 3000;


//express config pathes
const publicDirPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../views/partials");

//express config
app.set("view engine", "hbs");
app.use(express.static(publicDirPath));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
hbs.registerPartials(partialsPath);

//cordinates
let longitude;
let latitude;

app.get("/", (req, res) => {
    res.render('index', {
        title: "Corona Stats"
    })
})

app.post("/post-stats", (req, res) => {
   longitude = req.body.longitude;
   latitude = req.body.latitude;
   res.sendStatus(201);
})
app.get("/stats", (req, res) => {
    geoLocation(longitude, latitude, (err, contry) => {
        if(err){
            return res.send(err);
        }
        stats(contry, (err, coronaData) => {
            if(err){
                return res.send(err); 
            }
            res.send(coronaData);
        })
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help page"
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: "404"
    })
})



app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
})



