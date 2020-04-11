import '../css/common.css'

import C from './common'

// 解决click点击300毫秒延时问题
import FastClick from './fastclick'

// FastClick.attach(document.body);
!(function(){
    new FastClick(document.body)
 })


export default C