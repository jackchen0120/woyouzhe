import network from './network'
import { baseUrl } from './url'
// import Mock from '@/mock'


// 普通产品API接口
export function getShopList(page, pagesize, sort, cid, key) {
  return network({
    url: '/index?AppKey=uqd2sealrp',
    method: 'get',
    params: {
      page, // 页码
      pagesize, // 页数
      sort, // 1.较新商品提交时间（默认） 2.券后价高到低 3.券后价低到高 4.（券价÷原价）优惠比例 5.开始时间较早（预告到非预告）6.销量高到低 7.两小时销量 8.全天销量
      cid, // 0.全部 1.女装 2.男装 3.内衣 4.母婴 5.化妆品 6.居家 7.鞋包配饰 8.美食 9.文体车品 10.数码家电
      key
    }
  })
}

// 单品详情API接口
export function getShopDetail(id) {
  return network({
    url: '/item?AppKey=uqd2sealrp',
    method: 'get',
    params: {
      id
    }
  })
}

// mockjs 模拟商品列表接口
export function getMockData() {
  return network({
    url: '/shoplist',
    method: 'get'
  });
}

// 商品分类
// export function getCategoryList() {
//   return network({
//     url: '/categoryList',
//     method: 'get',
//   });
// }

// 商品详情
// export function getShopDetail(id) {
//   return network({
//     url: '/shopDetail',
//     method: 'get',
//     params: {
//       id
//     }
//   })
// }




