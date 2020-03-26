const path = require("path")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin}  = require('clean-webpack-plugin')

const dev = process.env.NODE_ENV === 'dev'

let config = {

   mode: dev ? 'development' : 'production',

   entry: "./src/scripts/main.js",

   output: {
      path: path.resolve(__dirname, "./public"),
      filename: "./js/app.js"
   },

   devtool: dev ? "inline-cheap-module-source-map" : false,

   watch: dev ? true : false,

   //REMOVE WARNING IMG
   performance: {
      hints: false
   },

   module: {

      rules: [

         {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env'],
                  plugins: [
                      "@babel/proposal-class-properties"
                  ]
               }
            }
         },

         {
            test: /\.(scss)$/,
            use: [
               MiniCssExtractPlugin.loader,
               {
                  loader: 'css-loader',
                  options: {
                     sourceMap: true,
                     url: false
                  }
               },
               {
                  loader: 'sass-loader',
               },
               {
                  loader: 'postcss-loader',
                  options: {
                     sourceMap: true,
                     plugins: (loader) => [
                        require('autoprefixer')({
                           browsersList: [
                              "defaults",
                              "ie 6-8",
                              "IE 10",
                              "> 1%"
                           ]
                        }),
                        require('postcss-merge-rules'),
                        //require('postcss-uncss')({
                        //   html: ['./**/*.php']
                        //})
                     ]
                  }
               }
            ]
         },

         // SVG - NON-OPTIMIZED
         {
            test: /\.svg$/,
            include: [path.resolve(__dirname, "./src/svg/non-optimized")],
            use: [
               {
                  loader: "file-loader",
                  options: {
                     name: "[name].[ext]",
                     outputPath: "svg/non-optimized"
                  }
               },
               {
                  loader: "svgo-loader",
                  options: {
                     plugins: [
                        {cleanupIDs: true},
                        {removeTitle: true},
                        {removeDesc: true},
                        {removeComments: true},
                        {removeDoctype: true},
                        {removeViewBox: true},
                        {removeEmptyAttrs: true},
                     ]
                  }
               }
            ]
         },

         // SVG - OPTIMIZED
         {
            test: /\.svg$/,
            include: [path.resolve(__dirname, "./src/svg/optimized")],
            use: [
               {
                  loader: "file-loader",
                  options: {
                     name: "[name].[ext]",
                     outputPath: "svg/optimized"
                  }
               },
               {
                  loader: "svgo-loader",
                  options: {
                     plugins: [
                        {cleanupIDs: true},
                        {removeTitle: true},
                        {removeDesc: true},
                        {removeComments: true},
                        {removeDoctype: true},
                        {removeViewBox: false},
                        {removeEmptyAttrs: true},
                        {removeStyleElement: true},
                        {removeUselessStrokeAndFill: true},
                        {removeAttrs: {attrs: "*:(fill|stroke)"}},
                        {convertColors: {shorthex: true}},
                        {convertPathData: true},
                        {removeUselessDefs: true},
                        {convertShapeToPath: true},
                        {removeDimensions: true},
                        {removeOffCanvasPaths: true},
                     ]
                  }
               }
            ]
         },

         // Images
         {
            test: /\.(png|jpg)$/,
            use: [
               {
                  loader: "file-loader",
                  options: {
                     name: "[name].[ext]",
                     outputPath: "images/",
                     publicPath: "/public"
                  }
               },
               {
                  loader: 'image-webpack-loader'
               }

            ]
         },

         // Videos
         {
            test: /\.(webm|mp4)$/,
            use: [
               {
                  loader: "file-loader",
                  options: {
                     name: "[name].[ext]",
                     outputPath: "videos/"
                  }
               }
            ]
         },

         // Fonts
         {
            test: /\.(woff|woff2)$/,
            use: [
                {
                  loader: "file-loader",
                  options: {
                     name: "[name].[ext]",
                     outputPath: "fonts/",
                     publicPath: "public/fonts",
                  }
                }
            ],
         },
         
      ]

   },

   plugins: [
      new MiniCssExtractPlugin({
         filename: 'css/style.css'
      }),

      new BrowserSyncPlugin({
         files: './**/*.php',
         ui: false,
         ghostMode: false,
         logPrefix: "DEV",
         open: false,
         notify: false,
         logSnippet: false
      }),

      ...(dev ? [] : [new CleanWebpackPlugin(),]),

      new CopyPlugin([
         { from: './src/favicon', to: 'favicon/' },
         { from: './src/json', to: 'json/' }
      ])

   ]

}

module.exports = config;
