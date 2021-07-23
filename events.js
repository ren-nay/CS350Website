const EventEmitter = require('events');
const uuid = require('uuid');

//console.log(uuid.v4());
//console.log(uuid.v4());

class Logger extends EventEmitter {
    log(msg){
        //call event
        this.emit('message', { id: uuid.v4(), msg });
    }
}

module.export = Logger;

/*
//Create class
class MyEmitter extends EventEmitter {}

// Init object
const myEmitter = new MyEmitter();

//Event listener
myEmitter.on('event', () => console.log('Event Fired!'));

//Init event
myEmitter.emit('event');
myEmitter.emit('event');
myEmitter.emit('event');
*/