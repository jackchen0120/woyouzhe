import Mock from 'mockjs'

let shopData = {
	'id': '@guid',
	'name': '@cname'
}

let categoryData = {
	"userInfo|5": [{    //生成|num个如下格式名字的数据
     "id|+1": 1,  //数字从当前数开始后续依次加一
     "name": "@cname",    //名字为随机中文名字
     "ago|18-28": 25,    //年龄为18-28之间的随机数字
     "sex|1": ["男","女"],    //性别是数组中的一个，随机的
     "job|1": ["web","UI","python","php"],    //工作是数组中的一个
 			"img": Mock.Random.image('200x100')
	}]
}

Mock.mock('/api/shoplist', shopData)
Mock.mock('/api/categoryList', categoryData)

export default Mock