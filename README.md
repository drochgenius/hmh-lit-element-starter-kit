# HMH Lit-Element Starter Kit

Starter repository for building Polymer/lit-element-based web components. 

## Technology Stack

* Polymer [Lit-Element](https://github.com/Polymer/lit-element) as base class for building native custom elements.
* [Lit-HTML](https://polymer.github.io/lit-html/) as templating library.
* [Typescript](http://www.typescriptlang.org/).
* Extensible [development server](https://github.com/hmhco/mtl-nodejs-base-server) with support for bare ECMAScript imports.
* Custom mocha-based unit test framework with code coverage: [lit-element-tester](https://github.com/drochgenius/lit-element-tester).

## Getting started

1. Fork this repository

2. Install dependencies

```
npm install
```

3. Run the watch script (should be continuously running in the background)

```
npm run watch
```

4. In another terminal window, run the development server

```
npm start
```

5. Open your browser at the given location to view your component documentation and demo pages.

[DEMO PAGE](http://localhost:3000/demo/index.html)

6. You can also execute the unit test suite

```
npm test
```

## Add your own components

You can add your own components in the `src/components/` directory.
Add the associated unit tests in the `src/unit/` directory.
