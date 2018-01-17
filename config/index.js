// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8068,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/rz_manage': {
        // target:'http://192.168.18.220:8061', // 修庆
        // target:'http://192.168.18.218:8061',
        // target:'http://192.168.18.177:8030', // 子涵
        target: 'http://121.199.33.100:8030', // 线上正式
        // target:'http://192.168.18.178:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/rz_manage': ''
        }
      },
      '/zsf_manage': {
        // target:'http://192.168.18.227:8090',
        // target:'http://114.55.86.215:8090', // 线上
        //  target:'http://192.168.18.10:8090', // 石智颖
        target: 'http://121.199.33.100:8090', // 线上正式环境
        changeOrigin: true,
        pathRewrite: {
          '^/zsf_manage': ''
        }
      },
      '/zyd_manage': {
        // target:'http://192.168.18.220:8061', // 修庆
        // target:'http://192.168.18.218:8061',
        // target:'http://192.168.18.227:8090',
        target: 'http://101.37.255.101:8061', // 线上
        // target:'http://192.168.18.178:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/zyd_manage': ''
        }
      },
      '/zsy_manage': {
        // target:'http://192.168.18.220:8061', // 修庆
        // target:'http://192.168.18.218:8061',
        // target:'http://192.168.18.227:8090',
        // target: 'http://106.14.39.56/zsmanage',
        target: 'http://47.96.251.43:8084/zsmanage',
        // target: 'http://192.168.20.214:8080', // 测试环境
        // target:'http://192.168.18.178:3000',
        // target: 'http://192.168.20.47', //张尊
        changeOrigin: true,
        pathRewrite: {
          '^/zsy_manage': ''
        }
      },
      '/zed_manage': {
        target: 'http://192.168.20.214:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/zed_manage': ''
        }
      }
    }
  }
}
