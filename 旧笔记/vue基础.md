#  Vue基础第一天

### webpack

**webpack是一个工具,主要作用**

1. 整合文件
2. 压缩代码
3. 识别代码并删除无用代码

**使用方法**

- 初始化,在使用代码npm i webpack webpack-cli -D 下载
- 配置文件,在package.json文件中的scripts中添加"build":"webpack"代码,其中build是自定义的
- 在最大的主文件夹执行npm run build代码生效(build是自定义的)



### webpack打包过程

- 执行npm run build----立即找到package中的build命令,并执行webpack
- 开始在根目录执行打包入口文件,src是webpack默认的打包目录,逻辑代码都写在打包目录下
- 打包目录里面的index.js是打包入口js文件,最后执行打包



### .gitignore文件

```tex
# 这个是git上次忽略文件，比如node_modules文件这个依赖包文件，是比较大的，
# 一般情况不会上到码云（或其他远程仓库），那么我们就可以通过这个文件来忽略node_modules
# 上传的时候如何忽略node_modules呢？答：进行如下配置即可
node_modules
```



### ES6语法导出

```js
//写法一
//模块导出
export default add
//模块导入
import add from "./add.js"

//写法二\
//模块导出
export function add(a,b){
    return  a+b
}

//模块导入
import {add} from "./add/add.js"
```



### 配置webpack的入口文件和出口文件

`**需要新建一个webpack.config.js文件,文件内部写入**`

```js
//只配置入口
module.exports = {
  entry: '路径',
};


//配置出口
//output 属性告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件。主要输出文件的默认值是 ./dist/main.js，其他生成文件默认放置在 ./dist 文件夹中

const path = require('path');
module.exports = {
  entry: '入口路径',
    //出口函数 output
  output: {
   path: path.resolve(__dirname, 'dist'), //一般不改,会创建出这个目录下的dist/xxx
    filename: 'mian.js' //生成的打包文件名
  },
};
```



### 打包文件要引入各配置文件

**引入模块**

```
import 名称 from "模块名"
例:import $ from "jquery"($为jq简写)
```

  

**引入js**

```
import 路径
例: import "./add/add.js"
```



### 同时整合(webpack默认只处理js)

#### webpack-plugin插件---HTML

```js
//安装
npm install --save-dev html-webpack-plugin

//需要新建一个webpack.config.js文件,文件内部写入

//用法,可以把写好的html结构打包进去
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: 'index.js',
  plugins: [new HtmlWebpackPlugin({
      //template:"事先写好的html路径"
      template:"./public/index.html"
  })],
};
```





#### webpack使用加载器插件---CSS,less,img,字体图标,语法降级

**编写一个主函数**

```js
import $ from 'jquery'
import './css/index.css'
import './less/index.less'
import './assets/fonts/iconfont.css'

//图片的引入
import _src from "./assets/三剑客.png"

let _img = document.createElement("img")
_img.src = _src
document.body.appendChild(_img)



//主体函数的原样式
$('li').odd().css("color", "green")
$('li').even().css("color", "red")


//字体图标
let _i = document.createElement("i")
_i.className = "iconfont icon-weixin"
document.body.appendChild(_i)


//新语法转换为旧语法(语法降级)
import { LibManifestPlugin } from 'webpack'
```



**wbpack配置处理**

```js
//主函数记得引入css,lesss,img等文件

//处理css需要用到css-loader和style-loader
//安装
npm install css-loader style-loader -D

//用法,其他的配置基本写在module里面,entry,output,plugins,module都是module.exports里的对象的键
module.exports = {
  module: {
    //rules是modeule一个数组,里面包含很多打包参数
    rules: [
      {
        test: /\.css$/i,  //表示匹配以css结尾的文件
        use: ["style-loader", "css-loader"],
        //css-loader 让webpack能处理css类型的文件
       //style-loader  把css插入到DOM中
	//webpack代码执行顺序是上下右左,所以一定要先执行css-loader
      },
  //less文件的配置
        {
            test:/\.less$/i,
            use:["style-loader","css-loader"]
        },
   //img文件的配置     
        {
            test:/\.(png|jpg|gif|jpeg)$/i,
            type:"asset"
        },
    //字体图标文件的配置   
        {
            test:/\.(eot|svg|ttf|woff|woff2)$/,
            type:"asset/resource",
            generator:{
                filename:"font/[name].[hash:6][ext]"
            }
        }, 
    ],
  },
};
```



### web开发服务器 

`web开发服务器 把代码运行在内存中, 自动更新, 实时返回给浏览器显示 ,通过webpack-dev-server插件运行`

**webpack-dev-server**

```js
//安装
npm i webpack-dev-sever-D

//配置
"scripts": {
    "serve":"webpack serve"
  }

//运行命令,启动服务器,运行后得到的服务器地址可以在线访问
http://127.0.0.1:8080
```



```
mode: "development", // 配置打包环境 
development:表示开发环境，production：表示生产环境
```



**webpack添加开发服务器配置**

```js
module.exports = {
    devServer:{
        port:3000,  //配置端口
        open:true   //自动打开
    }
```







# Vue基础第二天

### vue介绍

- vue是一个渐进式的JavaScript框架,
- 渐进式就是逐渐使用,集成更多的功能
- 现在都基于webpack开发vue,需要先配置webpack'环境,可以直接下载



### 安装配置vue

```js
//安装,vue提供了@vue/cli全局依赖包,通过安装这个包,可以得到配置好webpack环境
npm i -g @vue/cli

//创建vue项目
vue create 项目名  //注意:项目名不能有中文,大写字母,特殊字符(空格也不行)

//下载好项目后,启动脚手架项目
cd 项目  ----为了进入项目
npm run serve  --启动服务器
得到一个服务器地址,使用这个地址访问脚手架项目 http://127.0.0.1:8080
```



### 脚手架里主要文件和作用

| node_modules      | 都是下载的第三方包 |
| ----------------- | ------------------ |
| public/index.html | 浏览器运行的网页   |
| src/main.js       | webpack打包的入口  |
| src/App.vue       | Vue页面入口        |
| package.json      | 依赖包列表文件     |



### 脚手架执行流程

```js
//执行完npm run serve后
//找到webpack的打包入口文件,main.js的文件
//开始执行它的代码

import Vue from 'vue'   //引入vue框架
import App from './App.vue'  //页面入口文件(.vue后缀文件都是组件)

Vue.config.productionTip = false  //隐藏浏览器中console的提示

//实例化vue构造函数
new Vue({
  //el:"#app"  el等价与$mount()函数
  render: h => h(App),  //render表示渲染,它的值定义了将来在浏览器渲染的内容
  //也就是后面将吧app.vue组件的内容渲染到页面
}).$mount('#app')   //mount:挂载,表示渲染的内容将来要替换到id为app的标签上
```



### 关闭elint语法报错

```js
//vue如果声明变量但不使用就不符合elint语法,会报错.所以要先关闭
//关闭方式
module.exports={
    //需要重启服务
    lintOnsave:false
}
```



### vue准备工作/插值表达式

1. assets 和 components 文件夹下的一切都删除掉 (不要默认的欢迎页面)
2. src/App.vue默认有很多内容, 可以全部删除留下template和script和style的框

```js
//插值表达式 
//语法: `{{表达式}}`作用:将表达式的值显示在对应的标签上

<template>
  <div>  //只有一个根标签,即div
    //用插值表达式显示
    <h1>{{ msg }}</h1>
    <h1>{{ obj.name }}</h1>
    <h1>{{ obj.age > 18 ? "成年了" : "未成年" }}</h1>
    </div>   
</template>

<script>
export default {
//通过data函数的返回对象生成值
  data() {
    return {
      msg: "hello,vue",
      obj: {
        name: "小强",
        age: 19,
      },
    };
  },
}
</script>

<style scoped>  //style配合scoped属性, 保证样式只针对当前template内标签生效
</style>
```



### vue指令

`以v-开头的叫vue指令,给标签添加额外功能`

#### ①v-bind

```js
//语法和简写
作用:可以动态设置标签属性值
语法:v-bind:属性名="vue变量"
简写: :属性名="vue变量"

//例子
<template>
  <div>
    //hf,imgSrc通过js模块的data设定
     <a v-bind:href="hf">点我跳转到百度</a>
    <img :src="imgSrc" />
  </div>
</template>

<script>
//本地图片需要先引入
import imgSrc from "./assets/三剑客.png"
export default {
  data() {
    return {
      //在线图片可以直接引用
      imgSrc:imgSrc,
      hf:"http://www.baidu.com",
    };
  },
};
</script>
```



#### ②v-on

```js
//语法
l v-on:事件名=“要执行的少量代码" 
l v-on:事件名=“methods中的函数名" 
l v-on:事件名=“methods中的,函数名(实参)
简写:@事件名=""
//方法在methods选项定义,methods是vue提供给开发者声明函数的对象

<template>
  <div>
      <h1>你要购买的商品数量:{{count}}</h1>
    <button v-on:click="count=count+1" >增加1个</button>
    <button v-on:click="reduce()">减少1个</button>
    <button @click="add(5)">增加5个</button>
  </div>
</template>


<script>
export default {
  data(){
      count:0
  },
  //关于this的指向
  //this指向export default的对象,只要里面有这个对象,就能读取到
  methods:{
      reduce(){
      this.count=this.count-1
    },
    add(num){
      this.count=this.count+num
    }
  }
};
</script>
```



#### ③vue修饰符

```js
//stop修饰符,阻止事件冒泡
//preven修饰符.阻止默认事件
//once修饰符,只执行一次
//keyup.enter keyup.esc键盘修饰符
<template>
  <div>
    
     <div @click="fatherFn">
    //给儿子一个stop
      <button @click.stop="sonFn">修饰符测试</button>
    </div>
   //阻止默认行为
<a href="http://www.baidu.com" @click.prevent="twoFn">阻止跳转百度</a>
//一次修饰符,只会log一次
<button @click.once="threeFn">测试once修饰符</button>
//键盘修饰符,检测按键
<input type="text" @keyup.enter="enterFn">
    <input type="text" @keyup.esc="escFn">
//vue中如何获取事件对象(e)
//无传参,直接通过形参接收
  <a @click="one" href="http://www.baidu.com">阻止我跳转到百度</a>

//有传参,通过(参数,$event)接收
  <a @click="two(10,$event)" href="http://www.baidu.com">阻止我再次跳转到百度</a>
  </div>
</template>

<script>
export default {
  methods:{
     fatherFn(){
      console.log("我是爸爸");
    },
    sonFn(){
      console.log("我是儿子");
    },
    twoFn(){
      console.log("阻止了默认行为");
    },
    threeFn(){
      console.log("只能执行一次");
    },
    enterFn(){
      console.log("按下回车键");
    },
    escFn(){
      console.log("按下退出键");
    },
    one(e){
         e.preventDefault()
    },
    two(num,e){
         e.preventDefault()
    }
  }
};
</script>
```



### 逆转世界案例

```js
// arr.reverse()可以翻转数组

<template>
  <div>
    <h1>{{message}}</h1>
    <button @click="reverseFn">逆转世界</button>
  </div>
</template>

<script>
export default {
  data(){
      message:"Hello world!"
  },
  methods:{
     reverseFn(){
   //split以空格分割hello world,让它变为数组,reverse可以翻转,join把数组合成,并以空格连接
      this.message=this.message.split("").reverse().join("")
    }
  }
};
</script>
```



# Vue基础第三天

### v-model

作用:将表单的value元素和数据变量双向绑定一方变化另一方跟着变化

```js
//语法 v-model="数据变量名"   
//让v-model转化类型,   用法:v-model.修饰符="数据变量名"
//.number 以parseFloat转成数字类型
//.trim 去除首尾空白字符
//.lazy 在change时触发而非inupt时,input是输入时,change是失焦时.onchange是聚焦时
<template>
  <div>
    //tirm,去除空格
    用户名: <input type="text" v-model.trim="username">
    <br>
   //number转化为数字类型
    密码:<input type="text" v-model.number="password">
        
//下拉框,在select中设置v-model变量名
   <select v-model="city">
      <option value="上海">上海</option>
      <option value="广州">广州</option>
      <option value="深圳">深圳</option>
    </select>
    <hr>
   爱好:
//复选框都要设置v-model属性=变量名和value属性
   //v-model绑定的数据变量为数组的时候,vue变量和表单元素的value属性绑定一起
   //v-model绑定的数据变量为非数组的时候,vue变量和表单元素的checked属性绑定一起
   <input type="checkbox" v-model="hobby" value="敲代码" >敲代码
   <input type="checkbox" v-model="hobby" value="吃饭" >吃饭
   <input type="checkbox" v-model="hobby" value="打机" >打机
//单选框,文本域与普通的一样
<input type="radio" v-model="gender" value="男">男
<input type="radio" v-model="gender" value="女">女
//lazy,失焦才会同步
 <textarea v-model.lazy="inrdo"></textarea>
  </div>
</template>

<script>
export default {
    data(){
      return{
         username:"",
         password:"",
          //可设置默认值
          city:"广州",
        //复选框需要定义为数组
         hobby:[],
          gender:"",
          inrdo:""
      } 
    }
}
</script>
```



`关于表单的value值`

```
表单元素上的value属性有时候需要自己加上去，有时候又不需要，为什么？因为输入框和多行文本域，输入的内容就是value的值了，因此不需要写value属性。多选框或者单选框等等是通过某些操作得到一些固定的值，因此需要写value属性。

当复选框绑定的是checked属性的时候。有多少个复选框就需要使用多少个变量来绑定他们，这样就能够做到单独选中。
```



### v-text和v-html 

```js
//语法v-html="变量名",v-text="变量名",相当于添加
<template>
  <div>
  <p v-html="str"></p>
<p v-text="str"></p>
   </div>
</template>

<script>
export default {
    data(){
      return{
         str:"<span>我是一个span标签</span>"
      } 
    }
}
</script>
```



### v-if和v-show,v-else

```js
//语法v-if="变量名",v-show="变量名"
//v-show是通过css样式(display)来控制标签的显示和隐藏的
//v-if:是通过直接删除或创建来控制显示隐藏的
<template>
  <div>
   <p v-show="isok">我是一个可以隐藏的标签</p>
   <p v-if="isok">我是一个可以隐藏的标签</p>

//v-if还可以结合v-else使用,并且它们必须使兄弟元素,通过age判断显示哪一个
//v-if的值为false就会显示v-sels
<p v-if="age > 18">你已长大,要会自己敲代码</p>
<p v-else>未成年,不行</p>
   </div>
</template>

<script>
export default {
    data(){
      return{
          isok:true
          age:17
      } 
    }
}
</script>
```



### v-for

```js
//作用:渲染列表,要渲染谁就+给谁
//语法v-for="(变量名,索引变量) in 目标结构"||v-for="变量名 in 目标结构"
//目标结构: 数组/对象/数组/字符串,变量名可以自定义,索引变量指的是目标结构的索引值
<template>
  <div>
   <ul>
 //当使用v-for不添加key属性的时候,编辑器上就会报红,但这并不是真的语法错误,因此vue建议我们使用时添加key属性   :key="index"

//循环数组
  <li v-for="(value,index) in arr" :key="index">{{value}}-----{{index}}</li>
//循环数组对象
<li v-for="(value, index) in obj" :key="index">
    {{ value.name }}--{{ value.age }}--{{ index }}</li>
//循环对象
<li v-for="(value, key, index) in newobj" :key="key">
          {{ value }}--{{ key }}--{{ index }}</li>
//循环数字
<li v-for="value in 10">{{value}}</li>
//循环字符串
<li v-for="(value) in 'str'">{{value}}</li>
   </ul>
   </div>
</template>

export default {
  data() {
    return {
      arr:['小明','小芳','李华'],
        obj: [
        { name: "小米", age: 18 },
        { name: "小红", age: 28 },
        { name: "小明", age: 38 },
      ],
      newobj: { name: "你爸爸", age: 100, gender: "男" }
    };
  }
};
</script>
```



### 数组更新

**到底哪些方法会造成v-for更新,哪些不会呢?**

- 会造成原始数组更新的方法:reverse/push/splice/shift/unshift
- 不会改变原始数组的方法就不会更新:slice(开始索引,显示个数)/forEach/filter/map



### $set,splice,slice

```js
//想在页面显示,可以let一个新的arr,把只赋给新arr,最后把新arr显示在页面上
//语法:this.$set(要修改的数组/对象, 下标值/属性名, 新的值),对象原本是空的就是添加
//语法:this.splice(要添加数据的数组/对象, 下标值/属性名, 新的值)
//语法slice(开始的索引,截取的个数)  例:slice(0,2)
<template>
  <div>
      <ul>
          <li v-for="value in arr">{{value}}</li>
      </ul>
      <h1>显示用户名:{{obj.name}}</h1>
          
    <button @click="setFn">点我根据下标修改数组</button>
    <button @click="nameFn">修改用户名</button>

<button @click="addFn">下标为1的位置新增一个</button>
  </div>
</template>

<script>
export default {
 data(){
     return{
      arr:["李白","鲁班","马可","赵云"],
      obj:{name:"小明",age:18}
     }
 },
 methods:{
    setFn(){
    //this.$set(数组名,修改的索引值,修改后的值)
     this.$set(this.arr,1,"新来的")
    },
   //修改对象,this.$set(对象名,对象键,修改后的值)
    nameFn(){
    this.$set(this.obj,"name","大白")
    },
        addFn(){
  //增添值
   this.arr.splice(1, 0, '新来的')
 }
}
</script>
```



### 虚拟DOM

虚拟dom只会生成标签类型,只有有id这一个属性,有子元素的话子元素也是一样

### key的作用

key值必须使唯一不重复的字符串或者数字,,有key值的话只要key相同就可以复用,减少更新,没有的才更新,提高DOM的更新性能

`有id,key值就要用id,没id用索引`



### 动态设置样式

```js
//语法 v-bind:class="{类名:布尔值}"
//当布尔值为true表示使用词类名,false表示不使用
//语法:行内样式  :style="{css属性名:值}"

<template>
  <div>
    //bool不是css样式,需要在data里面书写
      <p :class={redStr:bool} >第一个p</p>
//语法:行内样式  :style="{css属性名:值}"
       <p :style="{ 'font-Size': fontSize }">我是用来测试动态设置行内样式的</p>
  </div>
</template>

<script>
export default {
    data(){
        return{
            bool:true,
            fontSize: "50px",
        }
    }
}
</script>

<style lang="less" scoped>
.redStr{
    color:red
}
</style>
```



### 品牌管理删除

```js
//传入点击按钮所在对象的id
delFn(id){
      //数组.findIndex(),与indexOf作用一样,找到与id相等的值并返回
       let index=this.list.findIndex((value)=>{
           return value.id=id
       })
       this.list.splice(index,1)
    }
```



# Vue基础第四天

### 过滤器filter

> 作用:处理数据返回新数据

- 全局过滤器:,在main.js注册
- 语法:Vue.filter("过滤器名".(值)=>{return 处理后的值})
- 局部过滤器;当前vue使用,在export default下注册
- 语法:filters:{"过滤器名":(值)=>{return 处理后的值}}
- 过滤器传参用法
- 语法:变量|过滤器名字(参数)
- 过滤器只能用在插值表达式和动态属性里面

```js
//局部使用方法:变量|过滤器名称
<template>
  <div>
//使用局部过滤器
    <h1>{{msg|reverseStr}}</h1>
//传参用法
 <h1>{{msg|reverseStrA(",")}}</h1>
//多个过滤器
 <h1>{{msg|reverseStr|toUp}}</h1>
//使用全局过滤器
 <h2 :title="msg | toUp">测试全局过滤器 </h2>
  </div>
</template>

<script>
export default {
   data(){
     return{
       msg:"hello world"
     }
   },
 //定义过滤器,与data同级
   filters:{
     reverseStr:(val)=>{
       return val.split("").reverse().join("")
     },
     reverseStrA:(val,str)=>{
       return val.split("").reverse().join(str)
     }
   }
}
</script>

//全局过滤器定义,一定要写在new vue之前
//实现全部字母大写
Vue.filter("toUp",(val)=>{
  return val.toUpperCase()
})

//重点:::!!1新写法直接当成函数写
filters:{
    formDate(val){
      return moment(val).format("YYYY-MM-DD")
    }
  }
```



### 计算属性computed&累计器

> **作用:当一个变量的值需要依赖别的变量得来的时候,可以使用**
>
> 优势:计算属性会基于依赖项的值进行缓存,依赖的变量不变,都直接从缓存获取结果.
>
> 比如需要输出3次计算的值,计算属性只会执行一次,函数会根据调用次数执行

```js
//语法:compted:{"属性名"(){return "值"}}
//定义时是一个函数,使用是一个变量,即变量num,与data中的值不能重名
computed:{
     num(){
       return this.a+this.b
     }
   }

//累计器reduce()属性
//语法:reduce((result,item)=>{return 计算结果},result的初始值),
//result:表示需要计算的结果
//item表示数组中的元素
computed:{
     num(){
      //这次return给num函数
       return this.list.reduce((result,item)=>{
       //这次ruturn给调用redude的数组/对象
           return (result+=item.price)
       },0)  //0是result的初始值
     }
   }

//计算属性普通的写法只能获取它,而修改它需要完整写法,可以双向绑定在输入框上
//完整写法,修改计算属性或者给计算属性赋值的时候才用到
  * 完整写法语法：
     * "属性名": {
      //给计算属性赋值的时候触发set函数
     *  set(值){
     *    值：指的就是用户修改的内容
     *  },
      //获取计算属性的时候触发get函数
      //依赖项改变时会触发
     *  get(){
     *    return "值" // 这个值就是我们对计算属性设置的原来写法的值
     *  }
     * }
    
//案例
全名: <input type="text" v-model="fullName" />
//data里面要有name这个值
fullName: {
    //给计算属性赋值时触发
      set(val ){
    //val得到的是用户全选框状态的值
        console.log(val);
      },
     //调用计算属性时触发
      get() {
        return "黄" + this.name;
      },
    },
```



### 拓展:every()方法

```js
//统计小选框是否全部选中,如果是则返回true,只要有一个不成立就是false
//every语法:
return arr.every((item)=>{
    //item指的是数组中的元素
    //这里可以判断item的checked状态,再做下一步
    return (判断条件,都符合就返回true)item.goods_state == true;
} 
```



### 拓展:jsonp





### 侦听器

> **可以监听data/computed属性值的改变**

```js
//语法
watch:{"被侦听的属性值"(newVal,oldVal){}}

<template>
  <div>
      名字:<input type="text" v-model="name">
      名字:<input type="text" v-model="obj.name">
  </div>
</template>

<script>
export default {
data(){
    return{
        name:"小明"  //简单类型
        obj:{name:"小明"}  //复杂类型
        }},
watch:{
   name(newVal,oldVal){
       console.log(newVal,oldVal);
   }}}

//监听复杂类型 
watch: {
    obj: {
      immediate: true, //立即执行,很少用到
      deep: true, //深度监听监听复杂类型就要开启
      handler(newVal) {    //只有一个值,就是新值
        console.log(newVal);
      },},}
</script>
```



> 标签自动补全"emmet.triggerExpansionOnTab"



### 组件

- 组件是可复用的 Vue 实例, 封装标签, 样式和JS代码.......一个vue文件就是一个组件 

- 组件化 ：封装的思想，把页面上 `可重用的部分` 封装为 `组件`，从而方便项目的 开发 和 维护

- 一个页面， 可以拆分成一个个组件，一个组件就是一个整体, 每个组件可以有自己独立的 结构 样式 和 行为 (html, css和js) 

  ```js
  //组件的使用步骤
  1.创建组件, 封装要复用的标签, 样式, JS代码
  2.哪个要使用就哪个引入vue组件,比如App.vue
  3. 注册组件
  ---全局注册 – main.js中
  ---局部注册 – 某.vue文件内
  4.使用组件
  
  //局部组件的使用案例
  <template>
   //使用组件,把组件名当做普通的dom对象即可使用
   //test只是一个占位符,也可以理解为一个变量,实际内容为创建好的组件
       <test></test>
  </template>
  
  <script>
  //引入组件
  import test from "./components/test.vue"
  export default {
  //局部注册组件
  components:{
      //键:值  键自己设,值为引入的组件对象
      test:test}}
  </script>
  
  //全局注册组件,要在mian.js中
  先引入  import 组件对象 from "引入路径"
  注册    Vue.component("testTwo",testTwo)  
  Vue.component("组件名",组件对象)
  之后使用<testTwo> </testTwo>就行,即组件名
  ```

  

### scoped属性

> 给style标签添加scoped属性,使得样式只作用于当前的属性中,执行时会给组内标签添加data-v-hash值,这个组件内的所有标签都是通过这个属性选择器,选中然后设置对应样式的



### 组件通信

> 一个组件给另一个组件传值

**父传子**.在父引入子,被引入的就是子组件

- 子组件内:props定义变量,在子组件中使用变量
- 父组件内,使用子组件,属性方式给props变量传值

```js
//myproduct组件
<template>
  <div class="my-product">
    <h3>标题: {{title}}</h3>
    <p>价格: {{price}}</p>
    <p>{{info}}</p>
  </div>
</template>

<script>
export default {
//传值
  props:["title","price","info"]
};
</script>

//App.vue
<template>
  <div>
    //这里接收props的值
   <my-product title="口水鸡" ></my-product>
  </div>
</template>

<script>
    //引入
    import myProduct from './myProduct.vue';
export default {//注册  components: { myProduct }};
</script>

<style>
</style>
```



### 循环使用组件

```js
//在组件内循环
<my-product v-for="item in list" :key="item.id" :title="item.proname" :price="item.proprice" :info="item.info"></my-product>

  data() {
    return {
      list: [
        {id: 1,
          proname: "超级好吃的棒棒糖",
          proprice: 18.8,
          info: "开业大酬宾, 全场8折", },
        {id: 2,
          proname: "超级好吃的大鸡腿",
          proprice: 34.2,
          info: "好吃不腻, 快来买啊",},
        {id: 3,
          proname: "超级无敌的冰激凌",
          proprice: 14.2,
          info: "炎热的夏天, 来个冰激凌了",},],
  };},
```



### 单向数据流





# Vue基础第五天

### 组件子传父&&自定义事件

- 什么时候使用子传父技术? 

当子想要去改变父里的数据 ,例如按键在子组件里面,只能在子组件添加点击事件,再由父组件操作

- 子传父如何实现? 

子组件内,在需要操作的元素内添加点击函数事件 恰当时机给点击函数添加this.$emit('自定义事件名' , 参数1,参数2 ) ,之后就可以在父组件使用

- 父组件内,,使用方式如下 给组件@自定义事件="父methods函数" ,通过父methods函数实现操作



> 子组件内,当用户点击砍价按钮的时候，自定义一个事件，并将数据通过该事件传递出去。 @click="kanFn"
>
> 父组件内, 绑定子组件中的自定义事件和事件处理函数 
>
> 语法: @自定义事件名="父methods里函数名" 



**子传父案例**

```js
//点击按钮在子组件中,所以需要子传父,给按钮添加点击事件
<button @click="kanFn">宝刀-砍1元</button>

//但按钮点击时,就是恰当时机,给子组件添加自定义事件
methods: {
    kanFn(){
      //subprice即为一个自定义事件,可理解为click等,后面的是参数,会向父组件传递
      this.$emit('subprice', this.index, 1) // 子向父
      eventBus.$emit("send", this.index, 1) // 跨组件
    }
  }
  
//父组件使用,在子组件的占位符添加事件  @自定义事件="执行函数"
<MyProduct v-for="(obj, ind) in list" :key="obj.id"
    :title="obj.proname"
   //直接绑定自定义的subpeice事件,使用fn函数进行砍价
    @subprice="fn"></MyProduct>

//使用这个fn函数
methods: {
    //接收了子组件的两个参数值并执行函数
    fn(index, price){
      // 逻辑代码,proprice是价格,price是砍价的值,为1,index是下标值,根据下标来砍
      this.list[inde].proprice > 1 && (this.list[index].proprice = (this.list[index].proprice - price).toFixed(2))
     //精度问题,有些小数点,添加.toFixed(2)保证两位小数
    }
  }
```



### 兄弟组件通信EventBus

> 通过EventBus让两个没有任何引入关系的组件进行通信,EventBus是空白Vue对象,可以监听和触发事件
>
> 如何创建一个空白的Vue实例化对象?
>
> new Vue()即可,EventBus就是这样一个对象
>
> EventBus如何监听和触发?
>
> 监听:eventBus.$emit('事件名',值)    触发:eventBus.$on('事件名',值)
>
> 最后在app.vue中使用



**通信步骤**

```js
//创建一个src/EventBus文件存放EventBus,文件名为index.js

//引入vue
import Vue from "vue"
//导出EventBus
export default new Vue()

//创建要监听的组件a和要触发的组件b,ab组件都要引入enentbus
//a组件
template>
  <div><h1>我是A组件</h1>
  <!-- 点击触发eventBus.$emit -->
  <button @click="sendFn">点我,发送数据给b组件</button>
  </div>
</template>

<script>
//引入eventBus
import eventBus from "../EventBus/index"
export default {
   methods:{
       //a组件在恰当时机,通过点击触发eventBus.$emit
       sendFn(){
      //事件名要一样------sendData,后面的值即为b组件接收的数据(val)
           eventBus.$emit("sendData","我是a组件的数据")
       }
   }
}
</script>

//b组件
<template>
  <div><h2>我是b组件</h2></div>
</template>

<script>
//引入eventBus
import eventBus from "../EventBus/index";
export default {
//created是vue的内置函数,b创建了即可自动执行
  created() {
//b组件要用回调函数来接收
    //事件名要一样------sendData,val即为a组件发送的值
    eventBus.$on("sendData", (val) => {
      console.log("接收a组件的数据", val);
    });
  },
};
</script>

//App.vue中使用
<template>
  <div>
//使用ab组件
    <rea></rea>
<reb></reb>
  </div>
</template>

<script>
//引入ab组件
import rea from './components/a.vue';
import reb from './components/b.vue';
export default {
//给他们注册
components: {rea,reb},
</script>
```







# Vue基础第六天

### 生命周期

> 指vue从创建到销毁的过程,钩子函数,Vue 框架内置函数，随着组件的生命周期阶段，自动执行 ,4大阶段8个方法 ,这8个方法就是钩子函数

| **阶段**      | **方法名** | **方法名** |
| ------------- | ---------- | ---------- |
| beforeCreate  | 初始化     | created    |
| beforeMount   | 挂载       | mounted    |
| beforeUpdate  | 更新       | updated    |
| beforeDestroy | 销毁       | destroyed  |



### 四个阶段解析

```js
<template>
  <div>
    <h1 class="test">{{ msg }}</h1>
    <button @click="changeMsg">改变msg的值</button>
    <button @click="destroyedFn">销毁App.vue组件</button>
    <button @click="timerFn">点我，启动定时器</button>
  </div>
</template>

<script>
export default {
  methods: {
    changeMsg(){
      this.msg = "666"
    },
    destroyedFn(){
      // 调用$destroy方法销毁当前组件
      this.$destroy();
    },
    timerFn(){
      this.timer = setInterval(()=>{
        console.log("定时器触发了");
      },2000)
    }
  },
  // 钩子函数：vue内置函数，是伴随着vue生命周期自动执行的函数
  /**
   * vue生命周期有4个阶段，触发8个方法（这8个方法就是钩子函数）
   * 
   * */ 
  data(){
    return {
      msg: "hello vue",
      timer: null
    }
  },
  // 初始化阶段
  beforeCreate(){
    console.log(this.msg); // 不能拿到data和methods, 显示undefined
    console.log("beforeCreate 初始化了生命周期和事件");
  },
  created(){
    console.log(this.msg); // 可以拿到"hello vue",
    console.log( document.querySelector(".test") ); // null 因为DOM还未挂载到真实DOM中
    console.log("created vue初始化完成  向vue内部注入了data和methods");
    // 一般情况下，我们能够在这个钩子函数中发起ajax请求，获取页面的初始数据
    // 因为数据越早获取到越好，这样可以更快渲染到页面，能够提高用户体验
  },
  // 挂载阶段
  beforeMount(){
    console.log(34,document.querySelector(".test")); // null
    console.log("beforeMount 真实DOM挂载前触发");
  },
  mounted(){
    // 一般情况下，在这个函数中就可以自由操作DOM ，发起请求也是可以。
    console.log(38,document.querySelector(".test")); // <h1 class="test">hello vue</h1>
    console.log("mounted 真实DOM挂载完成后触发");
  },
  // 更新阶段（数据更新，注意：数据必须在dom中使用了才会触发这两个钩子函数）
  beforeUpdate(){
    console.log(document.querySelector(".test").innerHTML); // hello vue
    console.log("beforeUpdata 数据改变后 DOM更新前触发")
  },
  updated(){
    console.log(document.querySelector(".test").innerHTML); // 666
    console.log("updated dom更新后触发");
  },
  // 销毁阶段
  beforeDestroy(){
    // 这里一般可以用来移除全局的事件，比如：注册的全局滚动事件，定时器等等
    console.log("beforDestroy 销毁前触发的钩子函数");
    // 比如销毁定时器
    clearInterval(this.timer)
  },
  destroyed(){
    console.log("destroyed 销毁后触发");
  }
};
</script>
```



### Axios封装的ajax库

> 支持客户端和服务端发送请求,支持Promise相关用法
>
> 支持请求和响应的拦截器功能
>
> 自动转换JSON数据



```js
//安装 npm install axios
//引入 import axios from "axios"
//使用语法
            axios( {
              method: "请求方式",
              url: "请求地址",
              data: {
                post的请求参数
              },
              params: {
                get的请求参数
              }
            } ).then(res=>{
              res: 请求返回结果
            }).catch(err=>{
              err: 请求失败的结果 (一般是后的服务器错误会触发)
            })
```



**axios案例:**

```js
<template>
  <div>
    <h1>1.查询所有信息</h1>
    <button @click="serchFn">点击查询</button>
    <br />
    <h1>查询某图书信息:</h1>
    <input type="text" v-model="bookname" /><button @click="oneFn">
      查询一本
    </button>
    <hr />
    <h1>新增图书</h1>
    书名:<input type="text" v-model="obj.bookname" />
    作者:
    <input type="text" v-model="obj.author" />
    出版社
    <input type="text" v-model="obj.publisher" />
    <button @click="addFn">添加</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      bookname: "",
      obj: {
        appkey: "7250d3eb-18e1-41bc-8bb2-11483665535a",
        bookname: "",
        author: "",
        publisher: "",
      },
    };
  },
  methods: {
    serchFn() {
      axios({
        url: "http://123.57.109.30:3006/api/getbooks",
      }).then((res) => {
          console.log(16, res);
        })
        .catch((err) => {
          console.log(18, err);
        });
    },

    oneFn() {
      axios({
        methods: "get",
        url: "http://123.57.109.30:3006/api/getbooks",
        params: {
          bookname: this.bookname,
        },
      })
        .then((res) => {
          console.log(16, res);
        })
        .catch((err) => {
          console.log(18, err);
        });
    },
    addFn() {
      axios({
        method: "post",
        url: "http://123.57.109.30:3006/api/addbook",
        data: this.obj,
      }).then((res) => {
        console.log(16, res);
      });
   },},};
</script>
```



### 封装axios

```js
//封装请求的基本路径 /src/utils/request.js

//引入axios
import axios from "axios"

//设置基本路径 语法:axios.defaults.baseURL
axios.defaults.baseURL="http://123.57.109.30:3006";

//导出axios
export default axios


//封装接口函数,新建/src/api/book.js文件
import axios from "../utils/request"

export function getBooks(params){
    return axios({
        url:"/api/getbooks",
        method:"get",
        params
    })
}


//App.vue中调用axuos
<template>
  <div>
      <h1>hello vue</h1>
  </div>
</template>

<script>
import { getBooks } from "./api/book"
export default {
 //通过create函数调用导出的axios,函数可直接执行
   created(){
       getBooks().then(res=>{
           console.log(10,res);
       })
   }
}
</script>
```



### $refs的使用

> ```tex
> vue中如何获取DOM？
>       答：可以使用原生js方法（document.querySelector ....）
>           vue专门提供了一种方式来获取，通过$refs来获取
>       
>       如何通过$refs来获取呢？
>        答： 1、给标签设置ref属性，并赋值
>             2、在恰当的时机通过 this.$refs.ref属性的值 来获取到DOM
> 
>       总结：$refs的作用
>         1、获取原生DOM
>         2、获取组件对象
>           可以利用这个组件对象获取子组件的函数和属性
>           可以利用这个组件对象的函数函数（属性）进行传值
> ```



**案例**

```js
//父组件
<template>
  <div>
    //h1和子组件demo分别添加ref属性
      <h1 ref="mh1">{{msg}}</h1>
      <demo ref="mh2"></demo>
  </div>
</template>

<script>
import demo from './components/demo.vue'
export default {
  components: { demo },
  data(){
      return{
          msg:"我是原生dom",
          a:"666"}},
  mounted(){
   //使用this.$refs.上面的ref属性值即可拿到相应的DOM
    console.log(19,this.$refs.mh1);
   //子组件可用同样的方法得到
    console.log(20,this.$refs.mh2);
  //通过"."子组件中的data值也可取得
    console.log(22,this.$refs.mh2.test);
//可以直接给子组件的data值赋值
    this.$refs.mh2.test=this.a
  // //通过"."子组件中的函数值也可调用函数,还可以传参
    this.$refs.mh2.fn(48) }}
</script>


//子组件demo
template>
  <div>
      <h1>{{test}}</h1>
  </div>
</template>

<script>
export default {
data(){
    return{
        test:"我是子组件demo"
    }},
    methods:{
        fn(num){
            console.log(123);
            console.log(num);}}}
</script>
```



### $nextTick使用

> data改变更新DOM是同步还是异步的? 
>
> 异步 
>
> 我们可以在哪里访问到更新后的DOM呢? 
>
> this.$nextTick里的函数体 



**案例**

```js
<template>
  <div>
      //给需要取得的函数值添加ref属性
      <h1 ref="mh1">{{count}}</h1>
      <button @click="addFn">数量+1</button>
  </div>
</template>

<script>
export default {
   data(){
       return{
           count:1
       }},
   methods:{
       addFn(){
           this.count++
           //使用$nextTick属性即可立即得到更新的DOM
           this.$nextTick(()=>{
               console.log(this.$refs.mh1.innerHTML);
           })}}}
</script>
```



### 购物车案例知识点

> 设置传递的值
>
> props: [] - 只能声明变量和接收, 不能类型校验
>
> props: {} - 声明变量和校验类型规则 - 外部传入值不对则报错

```js
export default {
  //props可以传数组也可以传对象
  props:{
    title:{
      required:true, //要求必须传这个值
      type:String  //定义数据类型
    },
    bgColor:String,
    fontColor:{
      default:"#fff",  //默认值
      type:String
    }}}
```



> **label的作用**

```js
//用label包裹的结构,只要给某些状态框与label设置相同的id
//这些结构也会有这个状态框的效果
//例如:单选框的id与label一致,那么点击label的结构也==点击单选框
<input type="checkbox"  class="custom-control-input" :id="obj.id"
        v-model="obj.goods_state"
        >
        <label class="custom-control-label" :for="obj.id">
          <img :src="obj.goods_img" alt="">
        </label>
```



### 拓展;只读属性

```
//添加readonly只读属性,可以让该框无法修改
<input  readonly  type="number" >
```

# Vue基础第七天

### 动态组件+缓存

> **可以多个组件使用同一个挂载点，并动态切换**

-  准备被切换的 - UserName.vue / UserInfo.vue 2个组件 
- 引入到UseDynamic.vue注册 
- 准备变量(comName)来承载要显示的"组件名" 
- 设置挂载点, 使用(is)属性来设置要显示哪个组件 
- 点击按钮 – 修改comName变量里的"组件名" 

------

keep-alive包裹挂载点(component)可以缓存组件,避免频繁销毁,浪费性能

```js
<template>
  <div>
  <h1>动态组件的使用</h1>    
//点击修改comName的值来修改挂载的组件
  <button @click="comName='UserName'">账号密码填写</button>
  <button  @click="comName='UserInfo'">个人信息填写</button>
  <hr> //添加keep-alive包裹实现缓存
  <keep-alive> //添加component属性作为挂载点,配合is属性使用
    <component :is="comName"></component>
</keep-alive>
  </div>
</template>

<script>
//组件引入
import UserName from './components/UserName.vue'
import UserInfo from './components/UserInfo.vue'
export default {
  components:{//组件注册
    UserName,UserInfo},
  data(){return{comName:"UserName"  //定义comName,设置默认值
}}}
</script>
```



### 新的生命周期activated和deactivated

> 作用:让处于缓存状态的组件知道自身是否处于激活状态或隐藏状态
>
> activated():当钩子函数触发的时候 件显示出来了(激活了)
>
> deactivated():当钩子函数触发的时候,表示当时组件隐藏起来了(非激活状态)

```js
export default {
activated(){console.log('我激活了')},
deactivated(){console.log("我隐藏了");}
}
```



### 组件插槽slot

> 可以让组件内接收不同的标签结构,给组件插入什么标签就显示什么标签
>
> 使用步骤
>
> 1.在封装的组件中,给需要插入结构的对象添加<slot>属性
>
> 2.App.vue中使用组件时,直接在组件中添加需要的结构即可

```js
//App.vue使用,插入文字和图片
<Ponnel>
          <p>寒雨连江夜入吴,</p>
    </Ponnel>
     <Ponnel>
         <img src="./assets/三剑客.png" alt="">
    </Ponnel>
//什么都不写显示默认内容
 <Ponnel></Ponnel>

//子组件中需要插入的地方添加<slot></slot>,默认内容直接在里面+
 <div class="container" v-show="isShow">
        <slot>我是默认内容</slot>
  </div>
```



### 具名插槽

> 当slot标签有name属性的时候那么这个插槽就是"具名插槽"
>
> 使用步骤
>
> 1.在封装的组件中,slot使用name属性来区分不同的插槽
>
> 2.在父组件使用的时候,在引入的组件里面使用template标签配置v-slot:名称使用

```js
//子组件的相应位置添加slot,并添加name属性区分
<slot name="title"></slot>
    </div>
    <!-- 下拉内容 -->
    <div class="container" v-show="isShow">
        <slot name="content"></slot>
    </div>

//父组件中配合template使用,给template属性添加'v-slot:名称'属性,插入相应内容
<Ponnel>
    //'#为v-slot:' 的简写
    <template #title> <h4>三贱客</h4>  </template>
    <template v-slot:content>
            <img src="./assets/三剑客.png" alt=""></template> </Ponnel>
```



### 作用域插槽

> ```tex
> 需求：父组件想要使用子组件的defaultObj.defaultTwo如何实现？
> 答：可以将数据传给父组件，可以通过作用域插槽传值
> 
> 作用域插槽的使用：
> 什么是作用域插槽：需要通过slot属性传值给父组件使用的插槽叫作用域插槽
> 使用步骤：
> 1、在子组件中通过slot的属性设置需要传递给父组件使用的数据变量(默认用row)
> 2、在父组件中通过template标签结合v-slot指令接收数据(默认用scope)
> ```

```js
//父组件,template添加v-slot="scope"属性,即可通过scope.row调用子组件的值
<Ponnel>
        <template v-slot="scope">
        {{ scope.row.defaultTwo }}
      </template>
</Ponnel>

//子组件 添加 :row="传值对象"  属性    后面的是默认值
 <slot :row="defaultObj">{{defaultObj.defaultOne}}</slot>
 
//定义对象演示案例
 data() {
    return {
      isShow: false,
      defaultObj: {
        defaultOne: "无名氏",
        defaultTwo: "小传同学"
      }
 
 //作用域插槽使用场景,想插入什么就插入什么
 //自定义组件内标签+内容
 //例子: 我想要给td内显示图片, 需要传入自定义的img标签
```



```js
PS:作用域插槽和具名插槽同时使用,可以设置多个组件值
//父组件  
<template v-slot:title="scope" >
    <h4>芙蓉送----{{scope.row}}</h4>
</template>
//子组件
<slot name="title" :row="isShow">dakia</slot>
```



### 自定义指令

> **在Vue内置指令满足不了需求时, 可以自己定义使用**

```js
//使用方式
<h1 v-color>局部</h1>
<h1 v-fcolor>全局</h1>
//传值
<h1 v-color="'green'">传值</h1>  //记得+引号
<button @click="changeFn">点击变红色</button>

//局部注册---app.vue----局部有s
export default {
    data() {
    return {
      color: "green",
    };},
    
  methods: {
    changeFn() {
      this.color = "red";},},
    
   directives:{
       //color是事件名,使用时在标签加v-事件名
       "color":{
           //el即为作用的标签,比如作用于h1,el就是h1
           inserted(el){//inserted是内置属性,默认写
               el.style.color="red"}}}
    //传值写法
    directives:{
       "color":{
  inserted(el,bingding){
     //inserted只会在标签插入时触发一次,数据改变不会触发
     //bingding是第二个参数,是个对象,里面的value值可以定义
               el.style.color=bingding.value}},
     //所以需要update触发刷新,可更新数据,update在color里面写
        update(el, bingding) {
        console.log(29, "触发了");
        el.style.color = bingding.value;
      },
}}

//全局注册---mian.js
Vue.directive("fcolor",{
  inserted(el){
    el.style.color="yellow"}})
```



### 案例-tabbar

#### validator校验规则

```js
arr:{ //validator是vue提供的一个自定义校验规则的函数
      validator(arr){//校验arr,让arr最少2个最多5个
        return arr.length>=2&&arr.length<=5(规则)
      }}
```



**findIIndex方法**

```js
delFn(id) {//可以通过id找到index
    //当数组中的元素在测试条件时返回 true 时, findIndex() 返回符合条件的元素的索引位置，之后的值不会再调用执行函数。
如果没有符合条件的元素返回 -1
      let index = this.list.findIndex((item) => item.id === id)
    },
```



#### 内置失焦属性blur

```js
//@blur="失焦触发的事件"
@blur="scope.row.inputVisible = false"
```



# Vue基础第八天

### 路由

-  路由是什么呢? 

  路由是一种映射关系 

-  Vue中的路由是什么? 

  路径和组件的映射关系 

```
什么是单页面应用?----所有的业务都在一个页面编写, 只有一个html,整体不刷新
单页面如何切换场景?----依赖路由切换显示
```



### 组件分类

>  **.vue文件分2类, 一个是页面组件, 一个是复用组件**  
>
> src/views文件夹------页面组件 - 页面展示 - 配合路由用 
>
> src/components文件夹------复用组件 - 展示数据/常用于复用



### vue-router路由模块

```js
//安装
npm i vue-router

//在main.js中引入VueRouter函数
//项目中会直接创建router/index.js文件作为路由组件------需要导出export default router
import VueRouter from "vue-router"

//添加到Vue.use()身上 – 注册全局RouterLink和RouterView组件
Vue.use(VueRouter)

//创建路由规则数组 – 路径和组件名对应关系,在src/views文件夹创建对应组件
const routes=[
    {
    path:"/",  //匹配网页打开的默认路径"/"
    redirect:"/find"  //重新定向到"发现音乐的界面,redirect的值就是目录路由的path值
  },
  {
    path:"/find",  //定义访问路径
    component:()=>import("./views/find.vue") // 注册对应的组件并引入
  },
  {
    path:"/my",
    component:()=>import("./views/my.vue")
  },
  {
    path:"/friend",
    component:()=>import("./views/friend.vue")
  },
    {//配置一个404界面,一定要放最后,创建notfind.vue组件
    path:"*",
    component:()=>import("./views/notfind.vue")
  }
]

//用规则生成路由对象
const router=new VueRouter(
  {routes:routes}
)

//把路由对象注入到new Vue实例中
new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')

//在App.vue设置挂载点
 <router-view></router-view>
```



### 声明式导航

```js
//App.vue使用,用router-view作为挂载点, 切换不同的路由页面
<template>
  <div>
    
//可用组件router-link来替代a标签
//<router-link to="path路径(main.js里面有)">内容</router-link>可以实现页面导航
    <router-link to="/find">发现音乐</router-link>
    <router-link to="/my'>我的音乐</router-link>
    <router-link to="/friend">盆友</router-link>
//挂载点
    <router-view></router-view>
  </div>
</template>

//设置点击时的高亮效果
<style>
.router-link-active{
  color:red
}
</style>
```





### 声明式导航传值

```js
方法一
1.在导航页面,给需要传值的路由路径添加参数即可:to="/path?参数名=值"
2.在路由路径(对应的页面)中接收:$route.query.参数名

方法二
1.在路由规则中(main.js)配置参数名,path:"/path/参数名"
2.在导航页面中(App.vue),在跳转的路径后面直接传值即可 to="/path/值"
3.在路由路径对应中(对应的页面)接收: $route.params.参数名


//方法一
//导航页面App.vue中  to="/my?健名=键值"
<router-link to="/my?name=小猪">我的音乐</router-link>
//对应路由页面中,使用$route.query.健名调用
<h1>{{$route.query.name}}</h1>

//方法二
//导航页面App.vue中,to="/friend/值"
<router-link to="/friend/18">盆友</router-link>
//路由规则中(main.js),对应的path添加健path:"/friend/:健名",
{
    path:"/friend/:age",
    component:()=>import("./views/friend.vue")
  },
//对应路由页面中,使用$route.params.键名调用
 <h1>年龄:{{$route.params.age}}</h1>
```



### 路由 - 模式设置

> 路由模式有两种,默认为hash

- hash路由例如: http://localhost:8080/#/home 
- history路由例如: http://localhost:8080/home (以后上线需要服务器端支持, 否则找的是文件夹) 

> 修改路由模式

```js
//在main.js/生成路由对象设置时mode的模式为history,默认为hash
const router=new VueRouter(
  {routes:routes,
    mode:"history",}
)
```



### 编程式导航

> 就是用JS代码来进行跳转

```js
//定义一个按钮用来跳转
<button @click="jump">点我跳转到发现音乐</button>
//函数中用this.$router.push({})方法跳转
 methods:{
    jump(){
      this.$router.push({
       //path和name只能用一个
        path:"/find"   //path方法直接写path就行
        name:"find"   //name方法要在定义路由规则时添加name属性
       
       //跳转传参query和params只能用一个,
       //path只能和query配合使用,name两种都可用
      query:{age:18,gender:"女"}
      params:{age:18,gender:"女"}
   })}}

//使用name要添加name属性
{path:"/find", component:()=>import("./views/find.vue"),
    name:"find" } //添加name属性

//跳转的路由页面接收参数
<h1>年龄:{{$route.query.age}}</h1>   //用query传参,就用query接收
<h1>性别:{{$route.params.gender}}</h1>  //用params传参就用params接收
```



### 二级路由

```js
//创建好相应的文件 src/views/Second/Recommend.vue
//在一级路由的规则中使用children函数,配置路由规则
children: [//children也是一个数组,方便添加多个对象
      {//只需要写文件名称就行
        path: "Recommend",    //下面是注册引入的路径
        component: () => import("./views/Second/Recommend.vue")
      },{
        path: "Ranking",
        component: () => import("./views/Second/Ranking.vue")
      },{
        path: "SongList",
        component: () => import("./views/Second/SongList.vue")
      },
    ]
//在对应的一级路由中设置2级路由的挂载点
    <router-view></router-view>
//二级路由的跳转路径:由一级路由的path值拼接二级路由的path值
//例如: 一级路由/find  二级路由Recommend  路径为拼接的如下
<router-link to="/find/Recommend">推荐页面</router-link>
     <router-link to="/find/Ranking">排行榜</router-link>
     <router-link to="/find/SongList">音乐列表</router-link>二级

```

> **二级路由会有两个router-link类名,有什么区别?**

- router-link-exact-active (精确匹配) url中hash值路径, 与href属性值完全相同, 设置此类名     

-  router-link-active (模糊匹配) url中hash值, 包含href属性值这个路径 

即hash完全等于href的值,就会精确匹配,hash只包含href的值就是模糊匹配



### 导航守卫的使用

> 全局前置守卫,就是路由跳转之前,会触发的一个函数,阻止未登录进入页面

```js
//书写位置main.js,路由规则之后

//先设定他没有登录
let token = false
router.beforeEach((to,from,next)=>{
  //to:跳转去的页面 (里面有path这个属性)
  //from:跳转前的页面
  //next:下一步,必须要有
  if(to.path==='/my'&&token==false){ //想要跳转my并且没登录
    alert('请登录')
    next(false)  //阻止他的行为
  }
  else{ //不是的话就直接跳
    next()
  }
})
```