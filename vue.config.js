'use strict'
const path = require('path')
// 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development'
// gzip压缩
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
function resolve (dir) {
  return path.join(__dirname, dir)
}
const name = 'practice Pro'
module.exports = {
  publicPath: './', // 部署应用包时的基本URL，
  outputDir: process.env.VUE_APP_OUT, // 打包时生成的生产环境构建文件目录
  assetsDir: 'static', // 生成静态资源的目录

  lintOnSave: process.env.NODE_ENV === 'development', // 设置为 true 时，eslint-loader 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  // chainWebpack: config => {
  //   // ============压缩图片 start============
  //   config.module
  //     .rule('images')
  //     .use('image-webpack-loader')
  //     .loader('image-webpack-loader')
  //     .options({ bypassOnDebug: true })
  //     .end()
  //   // ============压缩图片 end============
  // },
  // devServer:{
  //     host:'0.0.0.0'
  // }
  devServer: {
    // host: '0.0.0.0',
    // host: '192.168.0.103',
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://api-dev.zmjubao.com', // 源地址
        ws: false,
        changeOrigin: true, // 改变源
        secure: false, // https协议
        pathRewrite: {
          '^/api': '/api' // 路径重写
        }
      }
    }
  },
  configureWebpack: config => {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    const baseConfig = {
      name: name,
      resolve: {
        alias: {
          '@': resolve('src')
        }
      }
    }
    // 生产环境相关配置
    if (isProduction) {
      // 代码压缩
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            // 生产环境自动删除console
            compress: {
              // warnings: false, // 若打包错误，则注释这行
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log']
            }
          },
          sourceMap: false,
          parallel: true
        })
      )
      // gzip压缩
      // const productionGzipExtensions = ['html', 'js', 'css']
      // config.plugins.push(
      //   new CompressionWebpackPlugin({
      //     filename: '[path].gz[query]',
      //     algorithm: 'gzip',
      //     test: new RegExp(
      //       '\\.(' + productionGzipExtensions.join('|') + ')$'
      //     ),
      //     threshold: 10240, // 只有大小大于该值的资源会被处理 10240
      //     minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
      //     deleteOriginalAssets: false // 删除原文件
      //   })
      // )
    }
    // name: name,
    // resolve: {
    //   alias: {
    //     '@': resolve('src')
    //   }
    // }
    // config.resolve.alias
    //   .set('@', resolve('src'))
    // .set('assets',resolve('src/assets'))
    // .set('components',resolve('src/components'))
    // .set('router',resolve('src/router'))
    // .set('utils',resolve('src/utils'))
    // .set('static',resolve('src/static'))
    // .set('store',resolve('src/store'))
    // .set('views',resolve('src/views'))
  },
  css: {
    // 安装scss(npm install node-sass sass-loader style-loader --save)之后
    //
    loaderOptions: {
      sass: {
        // data: `@import "~@/assets/scss/common.scss";`
        data: ` @import "@/assets/scss/common.scss";`
      },
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 37.5
          })
        ]
      }
    }
  }
}
