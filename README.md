# playdoh api scaffold

This repository is an example of how you might build and structure
    a non trivial node service (an API service).

The scope of this project is to show how you scaffold an API
    with the following features

 - HTTP server
 - Configuration
 - Validation
 - Business logic ( Domain )
 - Calling out to external services.
 - Calling out to databases.
 - Unit tests
 - Integration tests

## The layers

### Business layer

There is a "business" layer that would normally be called
    the "model" layer in loose MVC terminology.

This is why you put the business / application logic of your
    application, any logic that is not generic to anything else
    but specific to your application.

### Endpoints layer

There is an "endpoints" layer that would normally be called
    the "controller" layer in loose MVC terminology.

This is the place where you define a new endpoint and a new
    resource.

Here you put the definition of your endpoint using a schema
    and a concrete implementation. You can then get validation
    for free.

An endpoint will contain cod that calls out into "services"
    defined in the business layer or calls out to "clients"
    defined in the server layer

### Server layer

There is a "server" layer that contains the raw server and all
    the concrete stateful clients / connections / sockets needed
    for your application.

The server layer is a very simple static layer. This is the
    place where you put your configuration, and wire up your
    stateful clients and business services and pass them into
    endpoints.

The server layer should contain no logic except for bootstrapping
    your application.

## Folder structure

 - `README.md` -- top level documentation of your service
 - `udeploy/` -- put your udeploy config & scripts here

 - `server/` -- contains base server. Contains stateful clients
    - `server.js` -- the entry point to your process. Keep this
        as lightweight as possible. This sets up global concerns
        like listening to a port or setting up uncaught exception
    - `http-router.js` -- configure your top level endpoints here.
        You can also place any custom HTTP level logic like
        static file serving in here.
    - `package.json` -- dependencies for the server & clients
    - `clients/` -- Where all the low level stateful clients go.
        Consider this the data layer of your application, this
        is the place where you configure and instantiate the
        stateful parts of your app (redis, onClient, logger, etc).
        Actual client implementation should live in node_modules
    - `clients/index.js` -- Creates the clients object that's
        passed around.
    - `endpoints.json` -- a json file defining all the endpoints
        in your service. This is the top level config that defines
        what endpoints your service contains.
    - `protocol_version.json` -- an auto generated file using
        `make swagger-update` that defines your service to be
        read by documentation sites.
    - `config/`-- the config folder.
    - `lib/` -- does not exist, look in `node_modules/` instead.
    - `http/` -- If you want to do any custom HTTP request
        handling code feel free to put it here.
    - `test/` -- test folder for full integration tests for the
        entire service. You should do tests with actual HTTP
        but without spawning child processes.

 - `business/` -- contains all the business logic.
    - `index.js` -- The entrypoint for all the business logic
        and services defined. This should be a function that
        takes the clients object from `server/clients/index.js`
    - `package.json` -- The dependencies used in the business
        logic.
    - `my-folder/` -- Secret sauce goes here.
    - `test/fast.js` -- fast unit tests for business logic
    - `test/index.js` -- slower integration tests for business
        logic. Probably not worth implementing integration tests
        for business logic, just implement integration tests for
        entire service.

 - `endpoints/my-endpoint/` -- contains the spec implementation
    - `specs/spec.json` -- The endpoint definition file defining
        what operations you should support
    - `index.js` -- the endpoint entry point, here you wire up
        the spec with concrete implementation
    - `x.js` -- the concrete implementation of your handler
    - `package.json` -- dependencies used in your endpoint.
    - `specs/` -- contains all the json specification files
        for your data structures and endpoints you should support.
    - `test/` -- unit tests for your handling including
        validation and HTTP -> endpoint conversion

## Philosophies

 - Do not `require('../')`
 - Do not have stateful requires.
 - Do develop endpoint folders as standalone units.
 - Do put everything in `node_modules`. Creating new modules
    is cheap, make lot's of them.
 - zero shared code (except through duplicate `node_modules`)
    between server, business & endpoint
 - lightweight static server
 - 100% test coverage, it's easy, really.

## Hackedy hack

Hello, you want to build a thing.

Please run `make install` to install all the things,
    remember to open a ssh to `adhoc01-peak` because much
    gitolite sad.

Please secondly run `make test` and stare at the glorious greens

If test works then hackedy hack time.

Next run `make swagger` to build the documentation server then
    `open localhost:8000` to see the documentation

If you run `make start` it will run the server on port 14598
    which means you can go to the swagger-ui and click the 0.2.0
    version of your local service.

Then try expanding health and try it out.

Yay your thing works, now we build MOAR endpoints
