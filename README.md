# TELEFUNKEN Homebridge Plugin
`homebridge-telefunken` is a basic homebridge plugin for Telefunken TV's, the API for the TV's themselves is very bare and is quite limiting in terms of readable information so this is very basic in terms of functionality.

This plugin is a fork of [this](https://www.npmjs.com/package/homebridge) plugin.

This version of the plugin allows to add the older as well as the newer telefunken tv's(which can be configurated in the json config with `api_url`).

## Features

* All well know Button on a TV Remote full list below


## Installation

If you are new to Homebridge, please first read the Homebridge [documentation](https://www.npmjs.com/package/homebridge).
If you are running on a Raspberry PI, you will find a tutorial in the [homebridge-punt Wiki](https://github.com/cflurin/homebridge-punt/wiki/Running-Homebridge-on-a-Raspberry-Pi).

Install homebridge:
```sh
sudo npm install -g homebridge
```

Install homebridge-telefunken:
```sh
sudo npm install -g homebridge-telefunken-new_tvs
```

## Configuration

Add the accessory in `config.json` in your home directory inside `.homebridge`.
For older telefunken-tv's use `apps/vr/remote` for `api_url`.
In order to work on some tv's you should activate virtual remote in the settings of your telefunken-tv.

```js
{
  "accessories": [
    {
      "accessory": "telefunken",
      "name": "TV",
      "api_url": "apps/SmartCenter",
      "ip": "192.168.1.103"
    }
  ]  
}
```

## Contributing
Feel free to contribute to this repo if you figure out any more features that could be added, currently I have mapped the following key codes:
```
ChannelUp = 1032;                 
ChannelDown = 1033;                 
Zero = 1000;                        
One = 1001;                          
Two = 1002;                          
Three = 1003;                        
Four = 1004;                         
Five = 1005;                         
ix = 1006;                          
Seven = 1007;                        
Eight = 1008;                        
Nine = 1009;                         
Back = 1010;                         
ChangeRatio = 1011;                
Power = 1012;                        
Mute = 1013;                         
Long = 1015;                         
VolumeUp = 1016;                     
VolumeDown = 1017;                   
Info = 1018;                         
Down = 1019;                         
Up = 1020;                           
Left = 1021;                        
Right = 1022;                         
Stop = 1024;                          
PlayPause = 1025;                     
Rewind = 1027;                        
FastForward = 1028;                   
Subtitle = 1031;                      
Close = 1037;                         
Favorites = 1040;                     
Timer = 1042;                         
QuickMenu = 1043;                     
Apps = 1046;                          
EPG = 1047;                           
Menu = 1048;                         
Pause = 1049;                        
Yellow = 1050;                       
Record = 1051;                       
Blue = 1052;                         
OK = 1053;                           
Green = 1054;                        
Red = 1055;                          
Input = 1056;             
MediaBrowser = 1057;                 
Text = 1255;  


