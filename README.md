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
    - `router.js` -- configure your top level HTTP routes here.
    - `package.json` -- dependencies for the server & clients
    - `lib/` -- should be empty, look in `node_modules/` instead.
    - `config/`-- the config folder.

## Philosophies

 - Do not `require('../')`
 - Do not have stateful requires.
 - Do develop endpoint folders as standalone units.
 - Do put everything in `node_modules`. Creating new modules
    is cheap, make lot's of them.
 - zero shared code (except `node_modules`) between server & endpoint
 - lightweight static server

