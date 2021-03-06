# luminave-fivetwelve
Provides a server that can interact with luminave over WebSockets to control USB DMX512 controllers

---

## Table of Contents

<!-- toc -->

- [luminave-fivetwelve](#luminave-fivetwelve)
  - [Table of Contents](#table-of-contents)
  - [Setup](#setup)
  - [Config](#config)
    - [Example .env](#example-env)
  - [ToDo](#todo)

<!-- tocstop -->

---

## Setup

* Clone [this repository](https://github.com/NERDDISCO/luminave-fivetwelve)
* Install the dev dependencies by executing `npm install` inside the *luminave-fivetwelve* folder

---

## Config

If you want to change the `host` & `port` of *luminave-fivetwelve*, you have to create a `.env` file inside the *luminave-fivetwelve* folder. 

### Example .env

```bash
# Host of the luminave-fivetwelve
HOST=localhost

# Port of the luminave-fivetwelve
PORT=1234
```

---


## ToDo

* [Find a fix for the node-serialport bindings](https://github.com/node-serialport/node-serialport/issues/1733)
* Fix the fivetwelve-driver-usbpro because the default export is not working
  * Update the README
* [Fix the isOpen problem in node-serialport](https://github.com/beyondscreen/fivetwelve-driver-usbpro/pull/2) -> release a new version of the driver
* Rename to fivetwelve-driver-enttec-usbdmxpro
* Auto deployment with Travis and semantic-release
  * Create a starter repo to have all of this in place when creating a new repo
* Use the updated driver in this repo
* Make the code modular for other drivers and also configurable
