# xr-global-vue

[![pipeline status](https://code.organise.earth/xr-global/xr-vue/badges/master/pipeline.svg)](https://code.organise.earth/xr-global/xr-vue/commits/master)

[![coverage report](https://code.organise.earth/xr-global/xr-vue/badges/master/coverage.svg)](https://code.organise.earth/xr-global/xr-vue/commits/master)

## Inital Setup

Update submodules:
`git submodule update --init --recursive`

Get [nvm](https://github.com/nvm-sh/nvm) set up and run `npm install`.

## Development

Run both `npm run build:dev` and `npm run start:dev` to get started.

```
# Will run webpack, which are all the Vue.js templates we need to render the data
npm run build:dev

# Will run the server, that supplies the data, when you visit a route on http://localhost:3000/
# it will figure out which template and which data need to be rendered and do so
npm run start:dev

# Unit tests (watcher)
npm run unit:dev

# 1-command build for production
npm run generate

# Run eslint and all unit tests
npm test

# Remove all built files
npm run clean
```

## Staging / Docker / Nginx / PHP

The setup above works fine when working on the front-end for the website. But in some cases you'll need Nginx + PHP
- When working on the contact form => This needs PHP
- When working on the submit group form => This needs PHP
- When testing headers or configuring the nginx config
- When you want to verify that `npm run generate` works as it should

In those cases you can use the local docker setup. Before you start, change the e-mail address in:
- php/contact.php => $mail_to = 'your@mail.com'
- php/group.php => $mail_to = 'your@mail.com'

This will actually send e-mails (max 300/day) to the address you specify.

```sh

# Start docker
cd docker
docker-compose up
# This will open a server running on
# http://localhost:8081

# Generate all the files (this won't be hot-reloaded and you'll need to call this after changing)
npm run generate
```

## Production

```
# Production build
npm ci
npm run eslint
npm run unit:ci
npm run generate
```
