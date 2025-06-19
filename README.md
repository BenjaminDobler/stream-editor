# RXJS Stream Visualization/Editor

The idea here is to have a drag & drop builder to construct new streams out of existing streams.
Think of an editor for RX streams.

The monaco code edior is integrated to edit expressions for operators like filter and map.
The connections are drawn via SVG and the bubbles, which indicate events are drawn with pixi.js.

![Streams](https://github.com/BenjaminDobler/stream-editor/blob/main/documentation/stream.png)

# Publish

First build and link the rx-drag lib and the ng-monaco lib.
`npm run ng-monaco:build`
and
`npm run rx-drag:build`

now for publishing the stream-viz lib you first need to remove the paths config from the tsconfig.json.

No you can create a release build:

`npm run stream-viz:build`

No change to the dist/stream-viz dir and run

`npm publish --access public` (because of the scoped package)
