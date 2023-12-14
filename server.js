require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./jwt');
const errorHandler = require('./error-handler');



const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server, {
     cors: {
        origin: ["http://localhost:4200", "http://127.0.0.1:4200"],
        methods: ['GET', 'POST', 'PUT'],
        transports: ['polling'],
    } 
});



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

const port = process.env.PORT || 3000;


 

// api routes
app.use('/', require('./users/users.controller'));
app.use('/', require('./tables/tables.controller'));
app.use('/', require('./dishes/dishes.controller'));
app.use('/', require('./orders/orders.controller'));
// global error handler
app.use(errorHandler);

io.on("connection", (socket) => {
    console.log('Connection Id: '+socket.id);
    socket.on('chat message', (msg) => {
        console.log(msg);
    });

    socket.emit('Piatto aggiornato', 'i socket funzionano');
});

app.use((req, res, next) => {
    req.io = io;
    next();
});

io.listen(server);

server.listen(port, function () {
    console.log('Server listening on port ' + port);
});


//export default app;