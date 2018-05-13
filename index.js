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
    AddButton: function (buttonName, buttonCode)
    {
        service = new  Service.Switch(`${this.name}${buttonName}`, butonName);
        service
        .getCharacteristic(Characteristic.On)
        .on('get', callback => callback(null, false))
        .on('set', (value, callback) => {
            var res = request.post({
                url:     'http://'+this.ip+':56789/apps/vr/remote',
                body:    '<remote><key code="'+buttonCode+'" /></remote>'
            }, function(error, response, body){
                if (error) {
                    callback(error);
                } else {
                    callback();
                }
            });
        });

        return service;
    },

    getServices: function () {
        var services = [];
        var informationService = new Service.AccessoryInformation();

        informationService
        .setCharacteristic(Characteristic.Manufacturer, "TELEFUNKEN")
        .setCharacteristic(Characteristic.Model, "Telefunken TV")
        .setCharacteristic(Characteristic.SerialNumber, "-");

        
        services.push(informationService);
        
        for(var code in codes)
        {
            services.push(this.AddButton(code, codes[code]));
        }

        return services;
    }
};
