/// <reference path="../typings/globals/node/index.d.ts" />
/// <reference path="../typings/globals/socket.io/index.d.ts" />

class Socketash {

    private io: Object;
    private registry: Array<Object>;
    private socket: Object;
    private self: Object;

    constructor(io_instance: Object) {
        this.self = this;
        this.io = io_instance;
        this.registry = [
            {
                type: 'emit',
                event: 'connection',
                data: {
                    data1: 'data1',
                    data2: 'data2'
                },
                callback: null,
                force: false
            },{
                type: 'on',
                event: 'connection',
                data: {},
                callback: function() {
                    console.log('Connected')
                },
                force: false
            }
        ];
    };

    public connect = (io: Object, self: Object = this): boolean => {
        try {
            io.on('connection', function(socket) {
                self.socket = socket;
                return true;
            });
        } catch(ex) {
            console.error('Could not connect to socket.io.');
            return false;
        }
    };

    public registerEvent = (type: String, event: String, data?: Object, callback?: Function, force?: boolean): boolean => {
        var exists = this._isRegistered(type,event);
        if(exists === true && force !== true) {
            console.log('Cannot register event.');
            return false;
        } else {
            if(exists === true) {
                this._findAndRemove(type,event);
            }

            this.registry.push({
                type: type,
                event: event,
                data: data,
                callback: callback,
                force: force
            });
            if(callback) {
                callback();
            }
            return true;
        }
    };

    public deregisterEvent = (type: String, event: String, callback?: Function): boolean => {
        var exists =this._isRegistered(type,event) === false;
        if(exists !== true) {
            console.log('Could not deregister event. No event was found with the given parameters.');
            return false;
        } else {
            this._findAndRemove(type,event);
            if(callback) {
                callback();
            }
        }
    };

    private _findAndRemove = (type: String, event: String): boolean => {
        for(var e = 0; e < this.registry.length; e++) {
            if(this.registry[e]['type'] === type && this.registry[e]['event'] === event) {
                this.registry.splice(e, 1);
                return true;
            }
        }

        return false;
    };

    public importEvents = (data: Array<String>, callback?: Function): boolean => {
        return false;
    };

    public send = (event: String, data?: Object, callback?: Function): void => {
        this.socket.emit(event,data,callback);
    };

    public receive = (event: String, callback: Function): void => {
        this.socket.on(event,callback);
    };

    private _isRegistered = (type: String, event: String): boolean => {
        for(var e = 0; e < this.registry.length; e++) {
            if(this.registry[e]['type'] === type && this.registry[e]['event'] === event) {
                return true;
            }
        }
        return false;
    };
}

module.exports = Socketash;