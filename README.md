# Frontend

This is repository for frontend for RecoFach application.

## Project setup

To install and run this repo locally for development
perform following steps:

1. Clone the repository.
1. `cd` into needed folder.
1. Install dependecies

    ```bash
    yarn install
    ```

1. Done.

### Compiles and hot-reloads for development

To run development server - use following command:

```bash
yarn serve
```

### Compiles and minifies for production

To run optimizations and minifications for *production build*
simply use:

```bash
yarn build
```

If you want **more** optimization run:

```bash
yarn bmodern
```

It will create two bundles:

1. Modern bundle targeting modern browsers that support
   [ES modules](https://jakearchibald.com/2017/es-modules-in-browsers/)
1. and legacy bundle targeting older browsers that do not

For more details see [documentation](https://cli.vuejs.org/guide/browser-compatibility.html#modern-mode)

### Lints and fixes files

We use Airbnb config to keep our code clean, fast,
readable and usable. Use following command to check if
new code have code-style issues **before** push.

```bash
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
