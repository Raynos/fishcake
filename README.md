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


## Folder structure

 - `README.md` -- top level documentation of your service
 - `udeploy/` -- put your udeploy config & scripts here


 - `server/` -- contains base server. Contains stateful clients
    - `server.js` -- the entry point to your process. Keep this
        as lightweight as possible. This sets up global concerns
        like listening to a port or setting up uncaught exception
    - `http-router.js` -- configure your top level HTTP routes here.
        You can also place any custom HTTP level logic like
        static file serving in here.
    - `package.json` -- dependencies for the server & clients
    - `clients/` -- Where all the low level stateful clients go.
        Consider this the data layer of your application, all
        stateful singleton should go in here.
    - `clients/index.js` -- Creates the clients object that's
        passed around.
    - `config/`-- the config folder.
    - `lib/` -- does not exist, look in `node_modules/` instead.
    - `http/` -- If you want to do any custom HTTP request
        handling code feel free to put it here.
    - `test/` -- test folder for full integration tests for the
        entire service. You should do tests with actual HTTP
        but without spawning child processes.

 - `specs/` -- contains all the json specification files
    for your data structures and endpoints you should support.

 - `business/` -- contains all the business logic.
    - `index.js` -- The entrypoint for all the business logic
        and services defined. This should be a function that
        takes the clients object from `server/clients/index.js`
    - `package.json` -- The dependencies used in the business
        logic.
    - `my-folder/` -- Secret sauce goes here.
    - `test/fast.js` -- fast unit tests for business logic
    - `test/index.js` -- slower integration tests for business
        logic.

 - `endpoints/my-endpoint/` -- contains the spec implementation
    - `index.js` -- The endpoint definition file defining
        what operations you should support
    - `package.json` -- dependencies used in your endpoint.
    - `test/` -- unit tests for your handling including
        validation and HTTP -> endpoint conversion

## Philosophies

 - Do not `require('../')`
 - Do not have stateful requires.
 - Do develop endpoint folders as standalone units.
 - Do put everything in `node_modules`. Creating new modules
    is cheap, make lot's of them.
 - zero shared code (except `node_modules`) between 
        server, business & endpoint
 - lightweight static server

