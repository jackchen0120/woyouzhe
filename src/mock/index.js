import Mock from 'mockjs'

let shopData = {
	'success|1': [true, false],
	'msg': function() { 
		if (this.success) {
			return '调用成功';
		} else {
			return '调用失败';
		}
	},
	'pageNum': 1,
	'pageSize': 10,
	'data': function() {
		if (this.success) {
			return this.result;
		} else {
			return this.result = [];
		}
	},
	'result|1-10': [{
		'id|+1': 1,
		'GoodsId': '@guid',
		'GoodsName|1': ['浙江特产手工糯米糕桂花糕250g', '【买一送一】夏季冰丝男裤休闲长裤', '仁和红豆薏米祛茶湿茶饮小袋装'],
		'actDate': '@now',
		'sales|0-100': 10,
		'ShopName|1': ['汉兰图旗舰店', '吴玉源旗舰店', '帅趣旗舰店'],
		'ImgUrl': '@image("200x200", "#00405d", "#FFF", "Mock.js")',
		'GoodsPrice|1-200.1': 50,
		'GoodsLink': '@url'
	}],
	'totalNum': function() {
		return this.data.length; 
	},
}

let categoryData = {
	'userInfo|1-5': [{    //生成|num个如下格式名字的数据
       'id|+1': 1,  //数字从当前数开始后续依次加一
       'name': '@cname',    //名字为随机中文名字
       'ago|18-28': 25,    //年龄为18-28之间的随机数字
       'sex|1': ['男', '女'],    //性别是数组中的一个，随机的
       'job|1': ['web', 'UI', 'python', 'java'],   //工作是数组中的一个
 	   'img': '@image("200x100")'
	}]
}

//格式：Mock.mock(url, post/get, 返回的数据)
Mock.mock('/api/shoplist', shopData)
Mock.mock('/api/categoryList', categoryData)

export default Mock