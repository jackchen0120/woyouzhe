<template>
  <!-- 商品分类 -->
  <div class="category-list">
      <div class="floor-area">
          <ul class="category fix">
              <li v-for="item in categoryList">
                <a href="javascript:;" @click="gotoSearch(item.category)" target="_blank">
                  <img :src="item.imgUrl" :alt="item.name" :title="item.name">
                  <span class="category-tit">{{item.name}}</span>
                </a>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      categoryList: [
        {
            id: "1",
            category: 2,
            name: "男装",
            sort: "100",
            imgUrl: require('../assets/img/category/nanzhuang.png')
        },
        {
            id: "2",
            category: 1,
            name: "女装",
            sort: "100",
            imgUrl: require('../assets/img/category/nvzhuang.png')
        },
        {
            id: "3",
            category: 6,
            name: "居家",
            sort: "100",
            imgUrl: require('../assets/img/category/jujia.png')
        },
        {
            id: "4",
            category: 4,
            name: "母婴",
            sort: "100",
            imgUrl: require('../assets/img/category/muying.png')
        },
        {
            id: "5",
            category: 3,
            name: "内衣",
            sort: "100",
            imgUrl: require('../assets/img/category/meizhuang.png')
        },
        {
            id: "6",
            category: 7,
            name: "鞋包",
            sort: "100",
            imgUrl: require('../assets/img/category/xiebao.png')
        },
        {
            id: "7",
            category: 5,
            name: "美妆",
            sort: "100",
            imgUrl: require('../assets/img/category/meizhuang.png')
        },
        {
            id: "8",
            category: 0,
            name: "更多",
            sort: "100",
            imgUrl: require('../assets/img/category/more.png')
        }
      ]
    }
  },
  methods: {
    gotoSearch (category) {
      window.location.href = `../woyouzhe/search?category=${category}` ;
    }
  },
  created () {
    
  },
  mounted () {
    
  }
}
</script>
  
<style scoped>
.floor-area {
    background: #fff;
    text-align: center;
    overflow: hidden;
    padding-top: .2rem;
    border-top: 1px solid #eee;
}
.floor-area li {
    width: 25%;
    display: block;
    float: left;
    margin-bottom: .2rem;
}
.floor-area li a {
  display: block;
}
.floor-area li img {
    width: 1rem;
    height: 1rem;
    display: block;
    margin: 0 auto;
}
.floor-area li .category-tit {
    font-weight: 400;
    display: block;
    text-align: center;
    padding-top: .1rem;
    font-size: .24rem;
}
</style>
