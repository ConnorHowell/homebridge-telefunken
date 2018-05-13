var Service, Characteristic;
var request = require('request');

var codes = [];
codes["ChannelUp"] = 1032;                   //Nächster Sender
codes["ChannelDown"] = 1033;                 //Vorheriger Sender
codes["Zero"] = 1000;                        //Taste: 0
codes["One"] = 1001;                          //Taste: 1
codes["Two"] = 1002;                          //Taste: 2
codes["Three"] = 1003;                        //Taste: 3
codes["Four"] = 1004;                         //Taste: 4
codes["Five"] = 1005;                         //Taste: 5
codes["ix"] = 1006;                          //Taste: 6
codes["Seven"] = 1007;                        //Taste: 7
codes["Eight"] = 1008;                        //Taste: 8
codes["Nine"] = 1009;                         //Taste: 9
codes["Back"] = 1010;                         //Zurück
codes["ChangeRatio"] = 1011;                  //Seitenverhältnis wechseln
codes["Power"] = 1012;                        //An- oderAusschalten
codes["Mute"] = 1013;                         //Lautlos an-/ausschalten
codes["Long"] = 1015;                         //Button "LANG"
codes["VolumeUp"] = 1016;                     //Lauter
codes["VolumeDown"] = 1017;                   //Leiser
codes["Info"] = 1018;                         //Info
codes["Down"] = 1019;                         //Runter
codes["Up"] = 1020;                           //Hoch
codes["Left"] = 1021;                        //Links
codes["Right"] = 1022;                         //Rechts
codes["Stop"] = 1024;                          //Stop
codes["PlayPause"] = 1025;                     //Play/Pause
codes["Rewind"] = 1027;                        //Zurückspulen
codes["FastForward"] = 1028;                   //Vorspulen
codes["Subtitle"] = 1031;                      //Untertitel an- oder ausschalten
codes["Close"] = 1037;                         //Schließen
codes["Favorites"] = 1040;                     //Favoriten-Menü öffnen
codes["Timer"] = 1042;                         //Timer
codes["QuickMenu"] = 1043;                     //Quick-Menü öffnen
codes["Apps"] = 1046;                          //App-Dashboard
codes["EPG"] = 1047;                           //EPG an- oder ausschalten
codes["Menu"] = 1048;                         //Hauptmenü öffnen oder schließen
codes["Pause"] = 1049;                        //Pause
codes["Yellow"] = 1050;                       //Gelb
codes["Record"] = 1051;                       //Aufnehmen
codes["Blue"] = 1052;                         //Blue
codes["OK"] = 1053;                           //OK
codes["Green"] = 1054;                        //Grün
codes["Red"] = 1055;                          //Rot
codes["Input"] = 1056;                        //Bildquelle wählen
codes["MediaBrowser"] = 1057;                 //Meidabrowser öffnen
codes["Text"] = 1255;                       //Button "TEXT" 

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
        service = new  Service.Switch(`${this.name}${buttonName}`, buttonName);
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
