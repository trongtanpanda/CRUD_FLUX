import express from 'express';
import bodyParser from 'body-parser';
import connection from './Server/utils/connect';
import crypto from 'crypto';
const app = express();

var port = process.env.PORT || 3008
var http = require('http').Server(app);
var  text = 'hello bob',
     key = 'logigear';
app.use(express.static(__dirname));
// allow cross-origin requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Cookie");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.use(bodyParser.json({
    limit: '50mb'
}));

 var hash = crypto.createHmac('sha512', key);
    hash.update(text);
    var value = hash.digest('hex');

    // print result
    //console.log(value);
// The database instance is created when this file is required
connection();

// All the route will be prefix by /api;
app.use('/us', require('./Server/service/users'));
app.use('/co', require('./Server/service/course'));
app.use('/de', require('./Server/service/departments'));
app.use('/se', require('./Server/service/sectors'));
app.use('/su', require('./Server/service/subjects'));
app.use('/ma', require('./Server/service/marks'));
app.use('/te', require('./Server/service/termClass'));
app.use('/st', require('./Server/service/students'));
http.listen(3008, function(){
    console.log('Listening on *:3008');
});
console.log('Magic happens on port ' + port);

