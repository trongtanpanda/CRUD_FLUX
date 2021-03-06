var webpack = require('webpack');

module.exports = {
    entry: [
        './index'
    ],
    output: {
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    watch: true,
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['jsx?harmony'], exclude: /node_modules/ }
        ]
    },
    node: {
            fs: 'empty'
    },
    externals: [
        {
            './cptable': 'var cptable'
        }
    ]
};
