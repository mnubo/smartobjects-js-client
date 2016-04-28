<a name="1.8.0"></a>
# [1.8.0](https://github.com/mnubo/smartobjects-js-client/compare/1.7.0...1.8.0) (2017-04-28)


### Features

* **model:** add export model functionality ([e766108](https://github.com/mnubo/smartobjects-js-client/commit/e766108))
* **owners:** support a body for claim/unclaim of objects ([1768933](https://github.com/mnubo/smartobjects-js-client/commit/1768933))



<a name="1.7.0"></a>
# [1.7.0](https://github.com/mnubo/smartobjects-js-client/compare/1.5.0...1.7.0) (2017-04-03)


### Features

* **bigdata:** add lowlevel api for bigdata ([9c6159e](https://github.com/mnubo/smartobjects-js-client/commit/9c6159e))
* **events:** add options for send from device ([42f29c6](https://github.com/mnubo/smartobjects-js-client/commit/42f29c6))



<a name="1.6.0"></a>
# [1.6.0](https://github.com/mnubo/smartobjects-js-client/compare/1.5.0...1.6.0) (2017-03-17)


### Features

* **owners:** add batch claim and unclaim ([222cc75](https://github.com/mnubo/smartobjects-js-client/commit/222cc75))



<a name="1.5.0"></a>
# [1.5.0](https://github.com/mnubo/smartobjects-js-client/compare/1.4.0...1.5.0) (2016-12-07)


### Bug Fixes

* **compression:** properly handle types and string conversion ([dcb1297](https://github.com/mnubo/smartobjects-js-client/commit/dcb1297))
* **mnubo:** make ClientOptions.env optional ([007cbe6](https://github.com/mnubo/smartobjects-js-client/commit/007cbe6))


### Code Refactoring

* remove window related files ([b515bed](https://github.com/mnubo/smartobjects-js-client/commit/b515bed))


### Features

* **owners:** add unclaim of deviceId ([3717112](https://github.com/mnubo/smartobjects-js-client/commit/3717112))


### BREAKING CHANGES

* remove any reference to mnubo.static and other related `window` object.
    Now you can only use the `node` related files and objects.



<a name="1.4.0"></a>
# [1.4.0](https://github.com/mnubo/smartobjects-js-client/compare/1.3.0...1.4.0) (2016-09-01)


### Features

* **compression:** introduce gzip compression to requests and responses ([a072fc9](https://github.com/mnubo/smartobjects-js-client/commit/a072fc9))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/mnubo/smartobjects-js-client/compare/1.2.0...1.3.0) (2016-08-03)


### Features

* **events:** allow `reportResults` and `objectsMustExist` options in send ([993111a](https://github.com/mnubo/smartobjects-js-client/commit/993111a))
* **events:** introduce exists APIs for events ([c378fe2](https://github.com/mnubo/smartobjects-js-client/commit/c378fe2))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/mnubo/smartobjects-js-client/compare/1.1.0...1.2.0) (2016-07-12)


### Bug Fixes

* **tsconfig:** add main.d.ts to included files ([e4dc870](https://github.com/mnubo/smartobjects-js-client/commit/e4dc870))

### Features

* **objects:** add exists to check device_id presence ([d549a8c](https://github.com/mnubo/smartobjects-js-client/commit/d549a8c))
* **owners:** add exists to check username presence ([4c4529c](https://github.com/mnubo/smartobjects-js-client/commit/4c4529c))
* **search:** add validateQuery ([e7fc754](https://github.com/mnubo/smartobjects-js-client/commit/e7fc754))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/mnubo/smartobjects-js-client/compare/1.0.4...1.1.0) (2016-04-28)


### Features

* **objects:** add create or update in batch ([a9cb52e](https://github.com/mnubo/smartobjects-js-client/commit/a9cb52e))
* **owners:** add create or update in batch ([0ba49ad](https://github.com/mnubo/smartobjects-js-client/commit/0ba49ad))



