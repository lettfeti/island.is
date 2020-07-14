# Viskuausan

This app is the home of the Digital Iceland's API Catalog, Data Catalog and API Design Guide.

## Getting Started

This project was created using the Nx community plugin [@nx-plus/docusaurus](https://github.com/ZachJW34/nx-plus/tree/master/libs/docusaurus)

### Serve the application

```
yarn nx run viskuausan:docusaurus
```

### Build the application

```
yarn nx run viskuausan:build-docusaurus
```

### island-ui components

To be able to utilize the island-ui components we need a custom plugin, `webpack-loaders`,
located in `apps/viskuausan/plugins/webpack-loaders`.
We could relocate this to the `libs` folder if we want.

In the plugin folder we have a `package.json` file which indicates the
current version of the plugin, and an `index.js` which contains the implementation
of the plugin.

#### Install

In the workspace root `package.json` we add the plugin as dependency:

```
"webpack-loaders": "file:./apps/viskuausan/plugins/webpack-loaders",
```

and to install it we use

```
yarn install
```

#### Update

To update the code of the plugin we can simply run

```
yarn upgrade webpack-loaders
```

## Customizing Docusaurus

### Swizzle theme components

Docusaurus CLI provides a command [swizzle](https://v2.docusaurus.io/docs/cli#docusaurus-swizzle)
wich copies the theme component to `src/theme/<componentName>`
where we can change it as we want.

To run this command on the `Layout` component:

```
yarn run docusaurus swizzle @docusaurus/theme-classic Layout apps/viskuausan
```

Note: Docusaurus is working on providing --typescript feature so the component
is copied as typescript code. But it is possible to change the index.js file
to index.ts and adjust the code.
