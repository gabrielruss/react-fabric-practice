module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle-new.js",
        path: __dirname + "/dist"
    },
    
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};