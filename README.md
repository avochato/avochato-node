# avochato-node

Simple HTTP wrapper for the Avochato API in node.js.

## Introduction

This is a partial implementation of Avochato's APIs in NodeJS.  The intention will be to
eventually implement ALL methods for public usage, but it may take awhile to get there.

For now this library just supports:
```
  client.sendMessage({phone, message}) => SendMessage
```


## Usage

```
npm install avochato
```

## Usage

### Creating an Avochato client

``` javascript
var avochato = require('avochato');

client = avochato.connectWith({
  auth_id: <your_api_auth_id>,
  auth_secret: <your_api_auth_secret>,
});

client.
```

### Debug

To enable a simple debug of ingoing/outgoing messages pass `debug: true` into
the connectWith options. Debug is disabled by default.

``` javascript
client = avochato.connectWith({
  auth_id: <your_api_auth_id>,
  auth_secret: <your_api_auth_secret>,
  debug: true,
});
```

### Connection timeout

By default the connection will fail after 10000 ms if it doesn't connect.
A `timeout: <time in millis>` option can be sent when making the connection.

``` javascript
client = avochato.connectWith({
  auth_id: <your_api_auth_id>,
  auth_secret: <your_api_auth_secret>,
  timeout: 30000,
});
```

## API

### client = avochato.connectWith(options)
Creates an Avochato API client with your provided options.  Options should be in the format:
```
{
  auth_id: <your_api_auth_id>, // Avochato auth_id generated in your settings ** REQUIRED
  auth_secret: <your_api_auth_secret>, // Avochato auth_secret generated in your settings ** REQUIRED
  timeout: 15000, // time in milliseconds (default: 10000ms)
  debug: true, // enable debugging logs (default: false)
}
```

#### client.sendMessage(options)
Generate an Avochato API request to send a message given the provided options.  Options should be in the format:
```
{
  phone: '+15105551234', // User's phone number ** REQUIRED
  message: 'some message', // Message to send to the user ** REQUIRED unless media_url is provided
  media_url: 'https://images.com/my_image', // Image to add to the MMS (default: attach nothing)
  from: '+15105554321', // The Avochato phone number you want to send from (default: auto choose the best number)
  mark_addressed: false, // Mark the conversation as addressed when sending this message (default: false)
  tags: 'api-message,api-connect', // CSV of tags to add to the contact after sending
  status_callback: 'https://mydomain.com/handle_status_callback', // Callback url to receive webhook events
}
```

## Roadmap

- Add support for all API endpoints

## License

avochato-node is released under the MIT license.
