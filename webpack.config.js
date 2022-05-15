const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopiWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    entry:{
        main:path.join(__dirname,"src/index.js"),
        form:path.join(__dirname,'src/form/form.js'),
        topbar:path.join(__dirname,"src/assets/javascript/topbar.js"),
    },
    output:{
        path:path.join(__dirname,"dist"),
        filename:"[name].bundle.js"
    },
    module:{
        rules:[{
        test: /\.js/,
        exclude: /(node_modules)/,
        use:["babel-loader"]
     },
     {
         test: /\.scss$/i,
         use:["style-loader","css-loader","sass-loader"]
     }
  ]
},
plugins:[
    new CleanWebpackPlugin(),
    new CopiWebpackPlugin({
       patterns:[
           {
               from:"./src/assets/images/*",
               to: 'assets/images/[name][ext]',
           }
       ]
   }),
   new htmlWebpackPlugin({
        filename:"index.html",
        template:path.join(__dirname,'./src/index.html'),
        chunks: ["main", "topbar"]
    }),
    new htmlWebpackPlugin({
        filename:'form.html',
        template:path.join(__dirname,'./src/form/form.html'),
        chunks: ["form", "topbar"]
    }),
],


    
stats:"minimal",
devtool:"source-map",
mode:"development",
devServer:{
    open:false,
    static:path.resolve(__dirname,'./dist'),
    port:4000
}
};


