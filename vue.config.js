const utils = require('./vue.util')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
	pages: utils.pages(), // 多页配置
    publicPath: isProduction ? '/dist/' : '/', // 部署生产环境和开发环境下的URL：可对当前环境进行区分
    lintOnSave: false, // 是否在代码保存时进行eslint检测
  	productionSourceMap: false, // 是否在构建生产包时生成sourceMap文件，false将提高构建速度
  	devServer: { // webpack-dev-server 相关配置 
	    port: '8090', // 端口号
	    https: false, // 关闭https
	    hotOnly: false, // 取消热更新
	    // proxy: { // 使用代理
	    //   '/api': {
	    //      target: '//www.woyouzhe.com', // 目标代理服务器地址
	    //     changeOrigin: true, // 允许跨域
	    //     pathRewrite:{
	    //       '^/api': '' // 重写路径，需要设置重写的话，要在后面的调用接口前加上/api来代替target
	    //     }
	    //   }
	    // }
	},
	// webpack手动配置
	configureWebpack: (config) => {
		if (isProduction) {
			// 取消webpack警告的性能提示
			config.performance = {
		      	hints: 'error', 
		      	maxAssetSize: 300000, // 生成文件的最大体积，整数类型（以字节为单位）
		      	maxEntrypointSize: 500000, // 入口起点的最大体积，整数类型（以字节为单位）
            	assetFilter: function(assetFilename) { // 只给出js文件的性能提示
          			return assetFilename.endsWith('.js')
				}
			}

			config.plugins.push(
		        new UglifyJsPlugin({
		         	uglifyOptions: {
			          	compress: {
			            	drop_debugger: true, // 生产环境自动删除debugger
			            	drop_console: true, // 生产环境自动删除console
			          	},
			           	warnings: false // 删除无用代码，不提示警告
		         	},
		         	sourceMap: false, // 关闭错误消息位置映射到模块
		         	parallel: true, // 启用多进程并行运行
		       })
		    )
		}
    }
}