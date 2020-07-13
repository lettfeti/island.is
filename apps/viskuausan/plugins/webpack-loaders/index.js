const TreatPlugin = require('treat/webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = function(context, options) {
  return {
    name: 'webpack-loaders',
    configureWebpack(config, isServer) {
      return {
        plugins: [
          new TreatPlugin({
            outputLoaders: [MiniCssExtractPlugin.loader],
          }),
          new MiniCssExtractPlugin(),
        ],
        module: {
          rules: [
            // {
            //   test: /\.tsx?$/,
            //   use: 'ts-loader',
            //   exclude: /node_modules/,
            // },
            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    '@babel/preset-env',
                    '@babel/preset-react',
                    '@babel/preset-typescript',
                  ],
                },
              },
            },
          ],
        },
        // rules: [
        //   {
        //     test: /\.(gif|png|jpe?g|svg)$/i,
        //     exclude: /\.(mdx?)$/i,
        //     use: ['file-loader', { loader: 'image-webpack-loader' }],
        //   },
        // ],
      }
    },
  }
}
