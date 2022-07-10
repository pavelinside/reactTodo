const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// для сжатия css, полученного из js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// для сжатия css, полученного из js
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env = {}) => {
  //console.log(env);
  //const isDev = process.env.NODE_ENV === 'development'; //const isProd = !isDev;
  const isProd = env.mode === 'production';
  const isDev = env.mode === 'development';
  const filename = ext => isDev ? `[name].${ext}` : `[name]-[contenthash].${ext}`; // [hash] [contenthash:8]

  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : 'style-loader', // в production css отдельными файлами
      'css-loader'
    ]
  };

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        title: 'Notebook',
        buildTime: new Date().toISOString(),
        template: 'public/index.html'
      }),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public/favicon.ico'),
            to: path.resolve(__dirname, 'dist')
          }, {
            from: path.resolve(__dirname, 'public/css'),
            to: path.resolve(__dirname, 'dist/css')
          }, {
            from: path.resolve(__dirname, 'public/fonts'),
            to: path.resolve(__dirname, 'dist/fonts')
          }
        ]
      })
    ];
    if(isProd){
      plugins.push(
        // извлекать css из js в отдельные файлы
        new MiniCssExtractPlugin({
          filename: filename('css')
        })
      );
    }
    if(isDev){
      plugins.push(
        new ESLintPlugin({
          extensions: [`js`, `jsx`],
          exclude: [
            `/node_modules/`
          ],
        })
      )
    }
    return plugins;
  };

  const optimization = () => {
    const config = {
      // если один и тот же файл подключается много раз в разных местах, выносить его отдельно
      splitChunks: {
        chunks: 'all'
      }
    }
    if (isProd) {
      config.minimizer = [
        new CssMinimizerPlugin(),
        new TerserWebpackPlugin()
      ]
    }
    return config
  };

  return {
    //context: path.resolve(__dirname, 'src'),
    mode: isProd ? "production" : isDev && "development",
    stats: {
      errorDetails: true,
    },

    entry: {
      index: './src/index.js'
    },
    output: {
      filename: filename('js'),
      path: path.resolve(__dirname, 'dist')
    },
    optimization: optimization(),

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        // Images
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          use: [{
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name]-[sha1:contenthash:7].[ext]'
            }
          }]
        },
        // Fonts
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/,
          use: [{
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
              name: '[name].[ext]'
            }
          }]
        },
        {
          test: /\.css$/,
          use: getStyleLoaders()
        },
        // SASS/SCSS
        {
          test: /\.(s[ca]ss)$/,
          use: [...getStyleLoaders(), 'sass-loader' ]
        },
      ]
    },

    plugins: getPlugins(),

    devServer: {
      open: true,   // auto open browser
      historyApiFallback: true,
      //static: {   directory: path.join(__dirname, "/"), },
      // contentBase: path.resolve(__dirname, "dist"),
      port: 8081,
    }
  };
};
