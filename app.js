var user = require('./user')
var bodyParser = require('body-parser')
var fs = require('fs')
var path = require('path')
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PlayerSchema = new Schema({
    pid: Number,
    pname: String,
    pimage: String,
    pcountry: String,
    page: Number
});

mongoose.model('player', PlayerSchema);

var player = mongoose.model('player');

mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDb...")
})

mongoose.connection.on('error', () => {
    console.log("Error in connecting to MongoDb...")
})

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit:'20mb'}))
app.use(express.static(path.join(__dirname, 'public')));  

app.use('/user', user);
app.get('/', (req, res) => {
    res.send("<h2>Using mongo Api.....<h2>")

})

app.get('/player', (req, res, next) => {
    player.find({}, (err, docs) => {
        console.log(docs);
        res.send(docs)
    })
})


app.get('/player/:id', (req, res, next) => {
    var p = req.params.id;
    console.log("Player Id :" + p)
    player.find({ pid: p }, (err, docs) => {
        console.log(docs);
        res.send(docs)
    })
})

app.post('/player', (req, res, next) => {
    console.log(req.body);
    var imgdata = req.body.pimage
    var pt = '';
    var dt = new Date();
    ptr = dt.getFullYear() +""+ dt.getMonth()+"" + dt.getMilliseconds()+'.png';
    pts = './public/'+ ptr;
     fs.writeFile(pts, imgdata,'base64', (err) => {
        if(err)
        console.log(err)
        else{
            console.log('Image Saved Success...');
        }
    });

    ptr = 'http://localhost:3400/'+ptr;
    var p = new player()
    p.pid = req.body.pid;
    p.pname = req.body.pname;
    p.pimage = ptr
    p.pcountry = req.body.pcountry;
    p.page = req.body.page
    p.save(function (err, doc) {
        console.log('Saved....')
        res.json({ "message": "inserted ......." })
    });
})

app.put('/player', (req, res, next) => {
    console.log(req.body);
    var i = req.body.pid
    player.update({ pid: i }, { $set: req.body }, function (err, p) {
        if (err) {
            return next(err);
        }
        else {
            res.send({ "message": 'Player data udpated..' });
        }
    })
})

app.delete('/player/:id', (req, res, next) => {
    var i = req.params.id;
    player.remove({ pid: i }, function (err, p) {
        if (err) {
            return next(err);
        }
        else {
            res.send({ "message": 'Player data deleted..' });
        }
    })
})

app.listen('3400', () => {
    console.log("Server Started at  : http://localhost:3400")
})
