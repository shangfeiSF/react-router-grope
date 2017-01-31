# react-router-grope

## Prepare

We need **webpack** and **webpack-dev-server** in global

`npm install -g webpack webpack-dev-server`

then `cd path/to/react-router` and `npm install`

##Lessons

`cd path/to/react-router/lessons` and use `node run [options]` to learn the concepts about React-router

###  Options about `node run [options]`

* `-env <String>` : Indicates which env should be setup. `development` or `production`, `-dev` and `-pro` is the shorts of `-env development` and `-env production`
* `-input <String>`: Indicates which demo by sequence should be started. `-i` is its shortcut, e.g. `-i  06.params`  will start `lessons/06.params`.
* `-port <Number>` Indicates the port of server. `-p` is its shortcut, default is `8080`

When try to run demos form `01.setting-up` to `10.clean-urls`, it is the same to use `-dev` and `-pro`.

But when try to run demos from `11.productionish-server` to `11.navigating`, you need ndicate which env should to be setup.
 
 Last when try to run `12.server-rendering`, you need to use `-pro` only.
 
 >Migrating from v1 to v2:
 >DedupePlugin has been removed.
 >Webpack.optimize.DedupePlugin isn't needed anymore. Remove it from your configuration.

##Main

Compare to `Lessons`, it is simple to run demos in `Main`

Just use npm-scripts follows:

`npm start` to develop with react-hot-loader

`npm run normal` to run with express

`npm run build` to make `__build__/` in local

## License

(The MIT License)

Copyright (c) 2010 [shangfeiSF](tony20100125@126.com)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.