/// <reference path="../typings/globals/node/index.d.ts" />
/// <reference path="../typings/globals/socket.io/index.d.ts" />
var Socketash = (function () {
    function Socketash(io_instance) {
        var _this = this;
        this.connect = function (io, self) {
            if (self === void 0) { self = _this; }
            try {
                io.on('connection', function (socket) {
                    self.socket = socket;
                    return true;
                });
            }
            catch (ex) {
                console.error('Could not connect to socket.io.');
                return false;
            }
        };
        this.registerEvent = function (type, event, data, callback, force) {
            var exists = _this._isRegistered(type, event);
            if (exists === true && force !== true) {
                console.log('Cannot register event.');
                return false;
            }
            else {
                if (exists === true) {
                    _this._findAndRemove(type, event);
                }
                _this.registry.push({
                    type: type,
                    event: event,
                    data: data,
                    callback: callback,
                    force: force
                });
                if (callback) {
                    callback();
                }
                return true;
            }
        };
        this.deregisterEvent = function (type, event, callback) {
            var exists = _this._isRegistered(type, event) === false;
            if (exists !== true) {
                console.log('Could not deregister event. No event was found with the given parameters.');
                return false;
            }
            else {
                _this._findAndRemove(type, event);
                if (callback) {
                    callback();
                }
            }
        };
        this._findAndRemove = function (type, event) {
            for (var e = 0; e < _this.registry.length; e++) {
                if (_this.registry[e]['type'] === type && _this.registry[e]['event'] === event) {
                    _this.registry.splice(e, 1);
                    return true;
                }
            }
            return false;
        };
        this.importEvents = function (data, callback) {
            return false;
        };
        this.send = function (event, data, callback) {
            _this.socket.emit(event, data, callback);
        };
        this.receive = function (event, callback) {
            _this.socket.on(event, callback);
        };
        this._isRegistered = function (type, event) {
            for (var e = 0; e < _this.registry.length; e++) {
                if (_this.registry[e]['type'] === type && _this.registry[e]['event'] === event) {
                    return true;
                }
            }
            return false;
        };
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
            }, {
                type: 'on',
                event: 'connection',
                data: {},
                callback: function () {
                    console.log('Connected');
                },
                force: false
            }
        ];
    }
    ;
    return Socketash;
}());
module.exports = Socketash;
//# sourceMappingURL=socketash.js.map