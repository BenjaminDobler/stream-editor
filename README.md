# RXJS Stream Visualization/Editor







# Publish 

First build and link the rx-drag lib and the ng-monaco lib.
```npm run ng-monaco:build```
and
```npm run rx-drag:build```

now for publishing the stream-viz lib you first need to remove the paths config from the tsconfig.json.

No you can create a release build:

```npm run stream-viz:build```

No change to the dist/stream-viz dir and run

```npm publish --access public``` (because of the scoped package)