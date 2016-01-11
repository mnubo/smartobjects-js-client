# mnubo JavaScript SDK

Table of Content
================
 
[1. Introduction](#section1)

[2. Architecture](#section2) 

[3. Pre-requisites](#section3)

[4. Installation & Configuration](#section4) 

[5. Usage](#section5)

[6. Important notes](#section6) 

[7. Source code](#section7)

[8. Known limitations](#section8)

[9. References](#section9)

---
#<a name="section1"></a>1. Introduction

This is a JavaScript opinionated version of the original [API documentation](https://sop.mtl.mnubo.com/apps/doc/?i=t).

---
#<a name="section3"></a>2. Architecture

Use classes Owners, Objects, Events, and Search to manage your owners, objects, events and perform searches using the API.

---
#<a name="section3"></a>3. Prerequisites

The current SDK version only works in a NodeJS environment. Browsers environments will be supported soon. The APIs will remain the same.

The minimum requirement is `node>=0.10.40` but because the code uses [Promise](https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Promise) and [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), if you are not running `node>=4.0.0`, you need to require `es6-shim`.

    npm install --save es6-shim

    require('es6-shim'); // before loading mnubo-sdk

---
#<a name="section4"></a>4. Installation & Configuration

    npm install --save mnubo-sdk

---
#<a name="section5"></a>5. Usage

## Authentication

The authentication is wrapped for every SDK call. The library will first fetch a new Access Token and make the API call. There is nothing to do from a developer's perspective besides setting the client id, client secret and environment during initialization.

## Initialization

The initialization of the SDK client requires two mandatory fields:

- `id` (**mandatory**): The client id.
- `secret` (**mandatory**): The client secret.
- `env` (*optional*): The environment where the API calls will be sent. It can be either `sandbox` or `production`. By default the `env` is `sandbox`.

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

## API Calls

All the API calls return a [Promise](https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Promise).

- When a promise is successful, you can call the `.then()` function to get the data returned by the mnubo servers. If there is no data, the value is `null`. ex: `client.events.send({...}).then(function(data) { console.log(data); });`

- When a promise is fails, you can call the `.catch()` function to get the error returned by the mnubo servers. If there is no data, the value is `null`. ex: `client.events.send({...}).catch(function(error) { console.log(error); });`

If you are not familiar with promises, there is an excellent article on [html5rocks](http://www.html5rocks.com/en/tutorials/es6/promises/).

## Examples

If you need some examples to get started with the SDK, you can check out the [wiki page](https://github.com/mnubo/mnubo-js-sdk/wiki/Examples).

---
#<a name="section6"></a>6. Important notes

N/A

---
#<a name="section7"></a>7. Source code

https://github.com/mnubo/mnubo-js-sdk/tree/master/src

---
#<a name="section8"></a>8. Known limitations

N/A

---
#<a name="section9"></a>9. References

https://sop.mtl.mnubo.com/apps/doc/?i=t

https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Promise

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

https://github.com/mnubo/mnubo-js-sdk/wiki/Examples


