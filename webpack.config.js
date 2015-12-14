module.exports = {
    entry: "./js/index.js",
    output: {
        path: __dirname,
        filename: "./js/bundle.js"
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};