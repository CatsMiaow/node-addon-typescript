# node-addon-typescript

Node.js WebAssembly and C++ addons TypeScript example

## Configure

```sh
npm ci
npm run addon:init
```

## Build

```sh
npm run addon:build # cpp
npm run asbuild # assembly
```

## Run

```sh
npx tsx src/index
# OR
npm start
```

### Documentation

* [Node.js C++ Addons](https://nodejs.org/api/addons.html)
* [Node.js C++ Addons Examples](https://github.com/nodejs/node-addon-examples)
* [Module for using N-API from C++](https://github.com/nodejs/node-addon-api)
* [AssemblyScript](https://www.assemblyscript.org)
* [Wasmer](https://wasmer.io)
