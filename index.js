var Service, Characteristic;
var request = require('request');

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory("homebridge-telefunken", "telefunken", telefunkenAccessory);
}


function telefunkenAccessory(log, config) {
    this.log = log;
    this.ip = config["ip"];
    this.name = config["name"];
    this.default_state_off = false;
}

telefunkenAccessory.prototype = {

    getPowerState: function (callback) {
        callback(null, !this.default_state_off);
    },

    setPowerState: function(powerOn, callback) {
        var body;

        var res = request.post({
          url:     'http://'+this.ip+':56789/apps/vr/remote',
          body:    '<remote><key code="1012" /></remote>'
        }, function(error, response, body){
            if (error) {
    			callback(error);
            } else {
                callback();
            }
        });
    },

    identify: function (callback) {
        callback(); // success
    },

    getServices: function () {
        var informationService = new Service.AccessoryInformation();

        informationService
                .setCharacteristic(Characteristic.Manufacturer, "TELEFUNKEN")
                .setCharacteristic(Characteristic.Model, "Telefunken TV")
                .setCharacteristic(Characteristic.SerialNumber, "-");

        switchService = new Service.Switch(this.name);
        switchService
                .getCharacteristic(Characteristic.On)
                .on('get', this.getPowerState.bind(this))
                .on('set', this.setPowerState.bind(this));


        return [switchService];
    }
};
