const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const ENV = process.env.npm_lifecycle_event;
const isDev = ENV === "dev";
const isProd = ENV === "build";

const buildPath = path.resolve(__dirname, 'dist');

function setDevTool() {
  if (isDev) {
    return "cheap-module-eval-source-map";
  } else {
    return "none";
  }
}

function setDMode() {
  if (isProd) {
    return "production";
  } else {
    return "development";
  }
}

const config = {
  target: "web",
  entry: {
    index: "./src/screens/landingPage/index.js",
    app: "./src/screens/app/app.js"
  },
  output: {
    filename: '[name].js',
    path: buildPath
  },
  mode: setDMode(),
  devtool: setDevTool(),
  module: {
    rules: [{
      test: /favicon.ico$/,
      use: {
          loader: 'file-loader',
          options: {
              name: '[name].[ext]'
          }
      }
    },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: false
            }
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: ["babel-loader", "eslint-loader"],
        exclude: [/node_modules/],
        // options: {
        //   emitWarning: true,
        //   failOnError: false,
        //   failOnWarning: false,
        // },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: { path: "./postcss.config.js" }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: { path: "./postcss.config.js" }
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "img",
              name: "[name].[ext]"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true,
              mozjpeg: {
                progressive: true,
                quality: 75
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
                optimizationLevel: 1
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "fonts"
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: "./src/screens/landingPage/index.html",
      inject: true,
      chunks: ['index'],
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      template: './src/screens/app/app.html',
      inject: true,
      chunks: ['app'],
      filename: 'app.html'
  }),
  ],

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8000,
    overlay: true,
    stats: "errors-only",
    clientLogLevel: "none"
  }
};

if (isProd) {
  config.plugins.push(new UglifyJSPlugin());
}

module.exports = config;
