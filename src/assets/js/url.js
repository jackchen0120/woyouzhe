
let baseUrl = ''

if (process.env.NODE_ENV == 'development') {
  console.log('dev')
  //开发、测试环境
  // baseUrl = '/api' // mock默认地址
  // baseUrl = '//yapi.demo.qunar.com/mock/95397/api' // yapi配置生成服务器地址
  baseUrl = '//api.xuandan.com/DataApi'
} else if (process.env.NODE_ENV == 'production') {
  console.log('prod')
  // 生产环境	
  baseUrl = '//api.xuandan.com/DataApi'
}
  
export {
  baseUrl
}