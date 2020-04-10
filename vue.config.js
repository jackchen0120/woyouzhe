const utils = require('./vue.util');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    pages: utils.pages(),
    publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
    lintOnSave: false,
  	productionSourceMap: false,
  	devServer: {
	    port: '8090',
	    disableHostCheck: true,
	    https: false,
	    hotOnly: false,
	    // 本地开发代理
	    // proxy: {
	    //   '/api': {
	    //   	// target: '//www.woyouzhe.com',
	    //     changeOrigin: true,
	    //     // 重写路径  需要设置重写的话，要在后面的调用接口前加上/api 来代替target
	    //     pathRewrite:{
	    //       '^/api': ''
	    //     }
	    //   }
	    // }
	},

	configureWebpack: config => {
		if (isProduction) {
			config.performance = {
		      hints: 'warning', 
		      maxAssetSize: 300000, // 整数类型（以字节为单位）
		      maxEntrypointSize: 500000, // 整数类型（以字节为单位）
          assetFilter: function(assetFilename) { // 只给出 js 文件的性能提示
            return assetFilename.endsWith('.js');
          }
			}

			config.plugins.push(
	      // 生产环境自动删除console
	      new UglifyJsPlugin({
	         	uglifyOptions: {
	          	compress: {
	            	drop_debugger: true,
	            	drop_console: true,
	          	},
	           	warnings: false
	         	},
	         	sourceMap: false,
	         	parallel: true,
	      })
      )
		}

  }
}