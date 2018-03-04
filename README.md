# TELEFUNKEN Homebridge Plugin
`homebridge-telefunken` is a basic homebridge plugin for Telefunken TV's, the API for the TV's themselves is very bare and is quite limiting in terms of readable information so this is very basic in terms of functionality.

## Features

* On/Off Functionality (TV's network connection and USB ports stay active but is still in standby)
* WIP: Volume Up/Down, no way to set a value or read the current volume (Can only increase/decrease)


## Installation

If you are new to Homebridge, please first read the Homebridge [documentation](https://www.npmjs.com/package/homebridge).
If you are running on a Raspberry PI, you will find a tutorial in the [homebridge-punt Wiki](https://github.com/cflurin/homebridge-punt/wiki/Running-Homebridge-on-a-Raspberry-Pi).

Install homebridge:
```sh
sudo npm install -g homebridge
```

Install homebridge-telefunken:
```sh
sudo npm install -g homebridge-telefunken
```

## Configuration

Add the accessory in `config.json` in your home directory inside `.homebridge`.

```js
{
  "accessories": [
    {
      "accessory": "telefunken",
      "name": "TV",
      "ip": "192.168.1.103",
    }
  ]  
}
```

## Contributing
Feel free to contribute to this repo if you figure out any more features that could be added, currently I have mapped the following key codes:
```
1016 = Volume Up
1017 = Volume Down
1012 = Standby
```
