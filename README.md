# mnubo JavaScript SDK

This is a Javascript opinionated version of the original [API documentation](https://sop.mtl.mnubo.com/apps/doc/?i=t).

The current SDK version only works in a NodeJS environment. Browsers environments will be supported soon. The APIs will remain the same.

## Requirements

The SDK uses the concept of promises without polyfills. Because of that you need node >= 0.12.

## Initialization

    // Load mnubo SDK.
    var mnubo = require('mnubo-js');

    // Create a new client with client id and client secret.
    var client = new mnubo.Client({
      id: 'KyR2LipTvH2ltAML4ScOTZ7TPLZvjV6oVYIYyx6CZORsoa131d',
      secret: 'B0KcvAeSZJuSXg9Hi0IYZKcsCNNUkw8bxsZ0GSgAW5cWKARa6m'
    });

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
      .then(function() {
        console.log('object created');
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
