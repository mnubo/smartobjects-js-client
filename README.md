# SmartObjects JavaScript Client

[![Build status](https://travis-ci.org/mnubo/smartobjects-js-client.svg?branch=master)](https://travis-ci.org/mnubo/smartobjects-js-client)
[![npm version](https://badge.fury.io/js/mnubo-sdk.svg)](https://www.npmjs.com/package/mnubo-sdk)

## Quickstart

[comment]: # (Important: leave the HTML in this section)
[comment]: # (quickstart-setup)

<h3>Getting the client library</h3>
<p>The client library is available on <a target="_blank" href="https://www.npmjs.com/package/mnubo-sdk">NPM</a>.</p>

<p>Below is an example of how you can install everything:</p>
<pre>
    <code>
npm install --save es6-shim  # if you run node < 4.0.0
npm install --save mnubo-sdk
    </code>
</pre>

<p>For more information, visit <a target="_blank" href="https://github.com/mnubo/smartobjects-js-client">GitHub</a>.<p>

<h3>Create a client instance</h3>

<p>The following JavaScript code can be used to create an instance:</p>

<pre>
    <code>
var mnubo = require('mnubo-sdk');

/* Create a new client with client id and client secret. */
var client = new mnubo.Client({
  id: '<%= clientKey %>',
  secret: '<%= clientSecret %>',
  httpOptions = {
    protocol: 'https',
    hostname: "<%= hostname %>",
    port: 443
  };
});
    </code>
</pre>

[comment]: # (quickstart-setup)

## Introduction

This is a JavaScript opinionated version of the original [API documentation](https://sop.mtl.mnubo.com/apps/doc/?i=t). Use classes Owners, Objects, Events, and Search to manage your owners, objects, events and perform searches using the API.

## Prerequisites

The current SDK version only works in a NodeJS environment. For security reasons, it is not recommended to use this SDK in a browser environment because the client id and secret could easily be discovered.

The minimum requirement is `node>=0.10.40` but because the code uses [Promise](https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Promise) and [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), if you are not running `node>=4.0.0`, you need to require `es6-shim` or any other library that polyfills those structures.

    npm install --save es6-shim

    require('es6-shim'); // before loading mnubo-sdk

## Installation

    npm install --save mnubo-sdk

## Usage

Because the platform supports UTF-8 for ingesting data, the encoding to use in the client must be UTF-8 as well.

### Authentication

The authentication is wrapped for every SDK call. The library will first fetch a new Access Token and make the API call. There is nothing to do from a developer's perspective besides setting the client id, client secret and environment during initialization.

### Initialization

The initialization of the SDK client requires two mandatory fields:

- `id` (**mandatory**): The client id.
- `secret` (**mandatory**): The client secret.
- `env` (*optional*): The environment where the API calls will be sent. It can be either `sandbox` or `production`. By default the `env` is `sandbox`.
- `compression` (*optional*): If you want to use `gzip` compression for both inbound and outbound data, set the value to `true`. By default this parameter is `false`.
- `exponentialBackoff` (*optional*): If you want to use exponential back off retries. By default, the feature is off (`null`).

```
/* Load mnubo SDK. */
require('es6-shim'); /* only if running node < 4.0.0 */
var mnubo = require('mnubo-sdk');

/* Create a new client with client id and client secret. */
var client = new mnubo.Client({
  id: 'KyR2LipTvH2ltAML4ScOTZ7TPLZvjV6oVYIYyx6CZORsoa131d',
  secret: 'B0KcvAeSZJuSXg9Hi0IYZKcsCNNUkw8bxsZ0GSgAW5cWKARa6m',
  env: 'production'
});
```

You can also create a client with an access token. We do not recommend that for production usage:
```js
/* Create a new client with an access token. */
var client = new mnubo.Client({
  token: 'token...',
  env: 'sandbox'
});
```

#### Compression
You can also fine grain the `compression` by using this syntax:

```
compression: {
  requests: true,  /* sets Accept-Encoding: gzip */
  responses: true, /* sets Content-Encoding: gzip */
}
```

Note that, when using compression, the data being resolved in the Promise will always be JSON. The compression/decompression is done behind the scenes using NodeJS `zlib` library.

#### Exponential backoff retries
Exponential backoff retries allows a user of the client to automatically retry requests when a `503` HTTP error is returned from the `SmartObjects` platform. It will gradually increase the interval between retries to allow the server to recover. The configuration to turn on the feature looks like this:

```typescript
exponentialBackoff: {
  numberOfAttempts: 2, /* How many retries to make before failing. Default to 5 if undefined. */
  initialDelayInMillis: 100, /* The number of ms to wait before the first retry. Default to 500 if undefined. */
  onRetry: (attempt: number) => { /* A callback function called for every retry. Default to nothing if undefined. */
    console.log('Attempt #' + attempt);
  }
}
```

### API Calls

All the API calls return a [Promise](https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Promise).

- When a promise is successful, you can call the `.then()` function to get the data returned by the mnubo servers. If there is no data, the value is `null`. ex: `client.events.send({...}).then(function(data) { console.log(data); });`

- When a promise has failed, you can call the `.catch()` function to get the error returned by the mnubo servers. If there is no data, the value is `null`. ex: `client.events.send({...}).catch(function(error) { console.log(error); });`

If you are not familiar with promises, there is an excellent article on [html5rocks](http://www.html5rocks.com/en/tutorials/es6/promises/).

### Examples

If you need some examples to get started with the SDK, you can check out the [wiki page](https://github.com/mnubo/smartobjects-js-client/wiki/Examples).

## References

[mnubo documentation](https://smartobjects.mnubo.com/documentation/)

[Promise](https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Promise)

[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

[Examples](https://github.com/mnubo/smartobjects-js-client/wiki/Examples)
