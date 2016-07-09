#Socketash

Currently In Development. Don't cry if it breaks. Fixes are great, though! Contributors welcome!

Socketash is simply an organizer for socket.io events. It wraps up all of your events into a not-so-fancy object so that you can better organize things.

###Getting Started

Holding off on putting anything on npm until stable. 

Clone from Github at `https://github.com/Aetiranos/socketash`
```
var Socketash = require('./socketash'),
    express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);
    
var sash = new Socketash(io);

```
###Registering Events

To add events to the Socketash registry, simply call: 

`registerEvent(type,event[,data,callback,force])`

`sash.registerEvent('emit','connection',{message: 'Connected!'});`

The first parameter can be either 'emit' or 'on' (sender or receiver). The second is the event name/identifier. Any data that you wish to pass along follows with an optional callback and force parameter (if you wish to override an existing registered event).

Events can also be deregistered by calling: `deregisterEvent(type,event)`

Here, you only have to specify the event's type ('emit' or 'on') and identifier to remove it.
 
###Calling Events
 
When you want to use your registered events, simply call the 'send' event (to emit an event) or 'receive' event (to open a listener). 

###Broadcasts

Coming soon...

###Contributing

Anyone who is interested in contributing and building this project up, feel free to jump in! The more, the merrier!

If you find any bugs or issues with the source code, be sure to submit an issue or submit a pull request with a fix.

If you have a feature request, submit an issue ticket (particularly if this is a major request). For smaller requests, feel free to submit a pull request with the requested feature code.
