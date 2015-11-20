# mnubo JavaScript SDK

This is a JavaScript opinionated version of the original [API documentation](https://sop.mtl.mnubo.com/apps/doc/?i=t).

The current SDK version only works in a NodeJS environment. Browsers environments will be supported soon. The APIs will remain the same.

## Requirements

The SDK uses the concept of promises without polyfills. Because of that you need node >= 0.12.

## Authentication

The authentication is wrapped for every SDK call. The library will first fetch a new Access Token and make the API call. There is nothing to do from a developer's perspective besides setting the client id, client secret and environment up initialization.

## Initialization

    // Load mnubo SDK.
    var mnubo = require('mnubo-sdk');

    // Create a new client with client id and client secret.
    var client = new mnubo.Client({
      id: 'KyR2LipTvH2ltAML4ScOTZ7TPLZvjV6oVYIYyx6CZORsoa131d',
      secret: 'B0KcvAeSZJuSXg9Hi0IYZKcsCNNUkw8bxsZ0GSgAW5cWKARa6m'
    });

## API Calls

All the API calls return a [Promise](https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Promise).

- When a promise is successful, you can call the `.then()` function to get the data returned by the mnubo servers. If there is no data, the value is `null`. ex: `client.events.send({...}).then(function(data) { console.log(data); });`

- When a promise is fails, you can call the `.catch()` function to get the error returned by the mnubo servers. If there is no data, the value is `null`. ex: `client.events.send({...}).catch(function(error) { console.log(error); });`

If you are not familiar with promises, there is an excellent article on [html5rocks](http://www.html5rocks.com/en/tutorials/es6/promises/).

## Examples

If you need some examples to get started with the SDK, you can check out the [wiki page]().

## Ingestion

### Owners

#### Create Owner

    client.owners
      .create({
        username: 'user@example.com',
        x_password: 'password'
      })
      .then(function(user) {
        console.log(user);
      });

#### Update Owner

    client.owners
      .update('user@example.com', {
        x_registration_date: new Date()
      })
      .then(function() {
        console.log('owner updated');
      });

#### Delete Owner

    client.owners
      .delete('jattali@mnubo.com')
      .then(function() {
        console.log('owner deleted');
      });

#### Claim Object

    client.owners
      .claim('jattali@mnubo.com', 'BA2DBC92-E24C-48D4-8F73-7748683E18CC')
      .then(function() {
        console.log('object claimed');
      });

### Objects

#### Create Object

    client.objects
      .create({
        x_device_id: 'BA2DBC92-E24C-48D4-8F73-7748683E18CC',
        x_object_type: 'fridge',
        x_owner: {
          username: 'user@example.com'
        }
      })
      .then(function(object) {
        console.log(object);
      });

#### Update Object

    client.objects
      .update('BA2DBC92-E24C-48D4-8F73-7748683E18CC', {
        x_object_type: 'freezer'
      })
      .then(function() {
        console.log('object updated');
      });

#### Delete Object

    client.objects
      .delete('BA2DBC92-E24C-48D4-8F73-7748683E18CC')
      .then(function() {
        console.log('object deleted');
      });

## Restitution

### Search

#### Get Datasets

    client.search
        .getDatasets()
        .then(function(datasets) {
          console.log(datasets);
        });

#### Create Basic Query

    client.search
      .createBasicQuery({
        from: 'event',
        select: [
          {count: '*'}
        ]
      })
      .then(function(results) {
        console.log(results);
      });
