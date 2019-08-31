'use strict'
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
const name = 'practice Pro'
module.exports = {
  publicPath: '/', // 部署应用包时的基本URL，
  outputDir: 'dist', // 打包时生成的生产环境构建文件目录
  assetsDir: 'static', // 生成静态资源的目录
  lintOnSave: process.env.NODE_ENV === 'development', // 设置为 true 时，eslint-loader 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  devServer: {
    // host: '192.168.0.103',
    port: 8080,
    // open: true,
    overlay: {
      warnings: false,
      errors: true
    }
    // proxy: {
    //   '/api': {
    //     target: '<url>',//源地址
    //     ws: true,
    //     changeOrigin: true,//改变源
    //     pathRewrite: {
    //       '^/api': '/api' //路径重写
    //     }
    //   },
    // }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/assets/scss/common.scss";`
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
