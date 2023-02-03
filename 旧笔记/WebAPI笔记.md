# 特别提醒

①当一个业务处理需要一个数据时，你只有两个选择
1.有人传递参数就接收参数
2.如果不能传递参数，则先存储再获取

②滚动监听有两种
1.添加给window, 对document.documentElement有效
2.添加给父元素，对滚动子元素有效

③封装的基本想法：
1.封装就是将冗余的代码提取出来放到一个函数中
2.相同的代码直接复制，不同的做为参数
3.函数封装之后一定要记得调用



④面对一个新的业务，我的建议是
1.观看效果，心中有数
2.一定要仔细的分析页面结构
3.大致分析功能

4.重点细节和出发点：
  图片的索引和标记和索引是对应的



1.数据是用数组存储的，数组元素的删除使用那个api：splice()
2.splice方法的运行需要有索引，意味着我们如果想从数组中删除元素，需要找到你想删除的元素的索引值

3.千万不要将数组索引当成删除数据的标识，因为在删除过程中，元素的索引值会变化

4.获取随机数0-1  Math.random(); 



# WebAPI第一天

### 一.Dom的认知

DOM（Document Object Model——文档对象模型）是用来呈现以及与任意 HTML 或 XML文档交互的API,即DOM是浏览器提供的一套专门用来 操作网页内容 的功能

DOM对象:浏览器根据html标签生成的 JS对象,所有的标签属性都可以在这个对象上面找到,修改这个对象的属性会自动映射到标签身上

```js
//例如:document.body
像body,html,等只有唯一一个的DOM元素,可以直接用内置方法document.它获得
js就是通过浏览器api来操作BOM和DOM的语言
```



### 二.DOM元素的使用

根据CSS选择器来获取DOM元素  对象

```js
<body>
    <span>渲染位置</span>   //主体中的元素
 <script>
		let myspan = document.querySelector('span') 
                              querySelectorAll(取得一个数组)
		
			//取得主体元素,之后可以利用myspan进行操作
			//选择的时候,id要加#,类要加点,标签不用加
  </script>
</body>
```

querySelect没有取值得到的是null

querySelectALL得到的是一个伪数组(不论有没有值)：有长度有索引号的数组,但是没有 pop()   push() 等数组方法,想要得到里面的每一个对象，则需要遍历（如 for）的方式获得。



**其他方式:**

```js
//根据id获取一个元素
document.getElementById('nav')
//根据标签获取一类元素,获取页面所有div
document.getElementByTagName('div')
//根据类名获取元素,获取页面所有类名
document.getElementByClassName('w')
```





### 三.设置DOM元素内容

```js
<div> </div>                   
    
<script>
      // 1.获取到div元素
      let mydiv = document.querySelector('div')

      // 2.为div元素设置内容,赋值,覆盖
      // mydiv.innerText = '我是新加的内容' // 新增
      // mydiv.innerText = '我是修改的内容'     用层叠性修改内容
      // mydiv.innerText = '' // 删除文本内容

      //  3.获取标签之间的内容,如果innerText没有赋值，直接log就是取值
      console.log(mydiv.innerText) 

      // 在取值的时候，能够获取到标签里面的完整的html结构
      console.log(mydiv.innerHTML) // ? <h2>我是h2</h2>
    </script>
```



### 四.设置DOM元素属性

```js
  <body>
      <p></p>
	 <img src="" alt="" />
     <input type="text" />

<script>
    let myp = document.querySelector('p')
      // // 2.为元素的属性赋值
   		myp.id = 'abc'

     
     let myimg = document.querySelector('img')
      // 2.为img的src属性赋值
    	myimg.src = './images/qq.gif'
    	myimg.alt = '这是一张图片'
    	myimg.title = '这是一张gif图片'

      // 1.获取input元素
      let myinput = document.querySelector('input')

      // 没有设置，就是获取
      console.log(myinput.type)

      // 2 为input设置value属性
      myinput.value = 'jack'
      // 将input的文本颜色修改为red
    	myinput.style.color = 'red'
    	myinput.style.height = '100px'
   		myinput.style.fontSize = '40px'
   		myinput.style['font-size'] = '40px'   //中间有-的使用驼峰写法或加[]
    </script>
</body>
```



### 五.通过 classList 和className操作类控制CSS

```js
//追加一个类
元素.classList.add('类名')
//删除一个类
元素.classList.remove('类名')
//切换一个类
元素.classList.toggle('类名')
// 检测元素是否含有指定的class
元素.classList.contains('red');

//例子
<style>
      .red {color: red;}
      .size50 {font-size: 50px; }
      .underline {text-decoration: underline;}
      //size50和underline都是随便写的类
</style>

  </head>
  <body>
    //设置按钮的 onclick属性 调用函数
    <button onclick="addSize()">添加一个字体大小样式</button>  
    <button onclick="removeSize()">移除一个字体大小样式</button>
    <button onclick="toggleSize()">切换一个字体大小样式</button>
    <button onclick="hasClass()">判断元素是否有某个样式</button>
    <p class="red">我是百变p元素</p>
    <script>
      // 获取元素
      let myp = document.querySelector('p')

      function addSize() {
          //第一种写法----添加这个类名,类名带有样式
        myp.classList.add('size50')
        myp.classList.add('underline')
          //第二种写法
        myp.classList.add('size50', 'underline')
      }

      function removeSize() {
        // 元素.classList.remove('已有的样式类名')
        myp.classList.remove('size50')
      }

      function toggleSize() {
        // toggle:切换--如果元素有这个样式，则移除，如果没有这个样式则添加
        // 元素.classList.toggle('已有的样式类名')
        myp.classList.toggle('size50')
      }

      function hasClass() {
        // contains:判断当前元素是否包含某个样式类名，如果包含返回true,否则返回false
        console.log(myp.classList.contains('size50'))
      }
    </script>


//classname----直接添加一个类名,但是会覆盖之前的类名,类名被覆盖样式就失效了,所以不推荐
.mydiv{color:red}

<div></div>
 let mydiv = document.querySelector('p')
 mydiv.className="mydiv"
```



### 六.定时器

语法: setInterval(操作,间隔时间)

```js
//开始,停止需要一个类名
let timeId=setInterval (function() {console.log('我爱你')}, 1000)

//停止
 function stop() {clearInterval(timeId) }
```



# WebAPI第二天

### 一.事件

**①什么是事件？**事件是在编程时系统内发生的动作或者发生的事情,比如用户在网页上单击一个按钮

**②事件三要素:**事件源 (谁被触发了) 

​						事件  (用什么方式触发，点击还是鼠标经过等)

​						事件处理程序  （要做什么事情）

**③添加事件监听**:

```js
//  语法: 元素.addEventListener(用户操作,函数动作)
// onclick要是多次写会被覆盖
 // 例子: btn.addEventListener('click', function () {})\
 // 可以给函数赋值let dodo= function(){},之后直接用dodo,后面不要加()
```



### 二.事件类型

**click:**单击操作所触发的事件类型
**mouseenter:**鼠标进入，当鼠标进入到该元素的范围就会自动触发
**mouseleave:**鼠标离开，鼠标离开该元素的范围就会自动触发

**input:**文本输入框内容变化所触发的事件，只要内容变化就会触发
**fcous:**文本框聚焦事件，文本框获取焦点，焦点就是光标点
**change:**文本框失焦事件，前提是内容改变了
**blur:**文本框的失焦事件，只要失焦就会触发，不关注内容是否变化

**keydown:**键按下时自动触发
**keyup:**键松开时自动触发

```js
//   例子:按下enter键
uesr.addElementlistener('keyup',function(e){
if(e.keyCode==13){}
})
```

**change:**对于表单元素file而言，它 是用户选择好文件之后触发



**二维码案例**

```js
<body>
  <div class="w">
    <div class="controls">
      <img src="images/tip.png" alt=""><br>
      <textarea placeholder="说点什么吧..." id="area" cols="30" rows="10" maxlength="200"></textarea>
      <div>
        <span class="useCount">0</span>
        <span>/</span>
        <span>200</span>
        <button id="send">发布</button>
      </div>

    </div>
    <div class="contentList">
      <ul>

      </ul>
    </div>
  </div>
  <script>
    let useCount = document.querySelector('.useCount')
    let textarea = document.querySelector('textarea')
    
// 为textarea监听input属性
    textarea.addEventListener('input', function () {

      let cnt = textarea.value.length
      useCount.innerHTML = cnt
    })

  </script>
</body>
```



# WebAPI第三天

### 一.各类函数

**高阶函数:**即函数的高级应用,JavaScript 中函数可以被当成【值】来对待，基于这个特性实现函数的高级应用。

**回调函数:**即一个函数作为参数传参给另一个函数,这个作为参数的函数就是回调函数

```js
box.addEventlistener('click',function(){})
//addEventlistener是一个函数,里面的function函数作为参数给addEventlistener调用,所以这里的function()是一个回调函数
```



**环境对象**:即函数内部的特殊变量this,谁调用或者触发,this指的就是谁

```js
       for(let i=0;i<btns.length;i++){
          btns[i].addEventlistener('click',function(){
                 this.style.color="red"})
}       //btns通过click触发了下面的函数,所以this指btns[i]
```



### 二.节点

**DOM节点:**DOM树里每一个内容都称之为节点,例如:元素节点:div,p...  属性节点class属性,文本节点:空格或者文本

**查找节点**

```js
父找子 节点语法;子元素.parentNode.xxx    例子: clo[i].parentNode.style.display = 'none'

子找父 节点语法:
childNodes:查找所有子节点，包含文本节点 --返回伪数组，不常用
children:查找所有子节点，只包含元素节点  ---返回伪数组，重点掌握

例子:console.log(erweima.children)   获取erweima的子节点

查找兄弟节点 语法:
console.log(myimg.nextElementSibling)       获取myimg的下一个节点
console.log(myimg.previousElementSibling)   获取myimg的上一个节点

<body>
    <div class="erweima">
      <span>我是span</span>
      <p>我是p元素</p>
      <img src="images/code.png" alt="" />
      <span> X3 </span>
      <h3>我是h3</h3>
    </div>

    <script>
      let myimg = document.querySelector('img')

      //nextElementSibling:查找指定元素的下一个兄弟元素，只找元素节点
      console.log(myimg.nextElementSibling)  输出的是span标签
      // previousElementSibling:查找指定元素的上一个兄弟元素，只找元素节点
      console.log(myimg.previousElementSibling) 输出的是p标签
    </script>
  </body>

```



**创造元素**

一般情况下，我们新增节点，按照如下操作：①创建一个新的节点
																			 ②把创建的新的节点放入到指定的元素内部

```js
btn.addEventListener('click', function() {
        // 1.创建一个p元素，createElement可以创建一个元素，并返回元素对象--dom元素
        // 创造节点:document.createElement('你想创建的标签名称')
        let myp = document.createElement('p')
        
        myp.innerHTML = '<span>我是子元素</span>'
        myp.style.color = 'red'
        console.log(myp)
    
    //box.children[0]指box子元素数组的第一个
    //if (box.children[0].nextElementSibling)指如果box子元素的第一个有下一个兄弟节点
    
    if (box.children[0].nextElementSibling) {
          box.insertBefore(myp, box.children[0].nextElementSibling)
        } else {
          box.appendChild(myp)
        }
    
   // 插入子元素:
   // appendChild:将这个元素追加做为父元素的最后一个子元素,box.appendChild(myp)
   // 父容器.insertBefore(你想插入的元素，在哪个元素前面) 
   // box.insertBefore(myp, box.children[0])
```



**删除节点**

父元素.removeChild(要删除的元素)



**增加节点**

克隆一个已有的元素节点     语法:已有元素.cloneNode(布尔值)

```js
 btn.addEventListener('click', function() {
        // 先 复制p元素 -- 先获取到你想复制的p元素
        let oldp = document.querySelector('.first > p')

        // 复制指定的节点  cloneNode它是一个函数，可以用来复制指定的节点，返回复制的节点
        // 细节：如果不传递参数，代表不需要元素的内容，如果传入true,则会复制该节点的内容(子节点)
        let newp = oldp.cloneNode(true)

        // 再 将复制的p元素添加到second盒子中
        second.appendChild(newp)
      })

cloneNode会克隆出一个跟原标签一样的元素，括号内传入布尔值,默认为false
若为true，则代表克隆时会包含后代节点一起克隆
若为false，则代表克隆时不包含后代节点


老师笔记:

1.创建元素： document.createElement('标签名称')

2.追加到w父元素中做最后一个子元素：  父元素.appendChild(你刚刚创建的元素)

3.插入到某个子元素的前面： 父元素.insertBefore(你刚刚创建的元素，做为参照的兄弟元素)
```



## **各类节点用法汇总**

```js
子找父:clo.parentNode.style.display = 'none'  clo的父盒子的属性改变

父找子:console.log(erweima.children)  box.child[0] 获取erweima这个父元素的子节点,返回一个伪数组

查找兄弟节点
console.log(myimg.nextElementSibling)       获取myimg的下一个节点
console.log(myimg.previousElementSibling)   获取myimg的上一个节点

创造节点
let myp = document.createElement('p') 创造一个叫myp的p元素

添加节点
box.appendChild(myp)  把myp添加到box元素后面
box.insertBefore(myp, box.children[0])  把myp添加到box的第一个子元素之前

删除节点
box.removechild(p)   删除box中的子元素p

克隆节点
let newp = oldp.cloneNode(true) 
oldp.cloneNode(true)是一个被复制出来的值,true会把后代节点而已复制出来,比如p里面的文字节点,flase只复制标签,不复制后代
```



## **时间戳**

```js
   //时间戳是指1971年1月1日00:00到现在的毫秒数 
<script>
      // new Date():可以获取当前时间
      ##用+号--->隐式转换为数字即可得到秒数
      let mydate = new Date()
      // 获取当前日期日间戳
      // console.log(Date.now())

      //获得指定时间的时间戳
      let date=new Date('2021-12-05 11:17:08')
      // 获取年：getFullYear()
      let year = mydate.getFullYear()
      // 获取月，月从0开始:getMonth()
      let month = mydate.getMonth() + 1
      // 获取日:getDate()
      let day = mydate.getDate()

      // 获取时:getHours()
      let hour = mydate.getHours()
      // 获取分:getMinutes()
      let minute = mydate.getMinutes()
      // 获取秒:getSeconds()
      let second = mydate.getSeconds()

      console.log(`${year}/${month}/${day}  ${hour}:${minute}:${second}`)
    </script>
```



## 倒计时

```js
    <script>
        //获取当前时间的秒数
        const res=+new Date()
        //获取倒数指定时间的秒数
        let des='2022-3-14 06:00'
        let res1=+new Date(des)
        //相减得到倒数的秒数
        let indexval=parseInt((res1-res)/1000)
    
       //时分秒,渲染就行
        let hour = parseInt(indexval/60/60)
        let min= parseInt(indexval%3600/60)
        let second=parseInt(indexval%60)
    </script>
```



# WebAPI第四天

### 一.事件对象

事件对象也是个对象,表示事件实施时的事件信息,

获取方式 :在事件绑定的回调函数的第一个参数就是事件对象,一般命名为event、ev、e

```js
let btn = document.querySelector('button')
     //function(e)就是事件对象,里面包含click事件的信息,比如点击位置
      btn.addEventListener('click', function(e) {
        console.log(e)    //输出对象信息
      })

// 例如:  e.clientX   e.clientY  即可输出相对浏览器视口的坐标值
```

**事件对象部分常用属性**
①type:获取当前的事件类型
②clientX/clientY:获取光标相对于浏览器可见窗口左上角的位置
③offsetX/offsetY:获取光标相对于当前DOM元素左上角的位置
④key:用户按下的键盘键的值现在不提倡使用keyCode,例如e.keyCode



### 二.事件流

事件流指的是事件完整执行过程中的流动路径,说明：假设页面里有个div，当触发事件时，会经历两个阶段，分别是捕获阶段、冒泡阶段



**①捕获阶段:**![](D:\黑马\资料笔记\img\01.png)



**②冒泡阶段**:当一个元素的事件被触发时，同样的事件将会在该元素的所有祖先元素中依次被触发。这一过程被称为事件冒泡
简单理解：当一个元素触发事件后，会依次向上调用所有父级元素的同名事件(同名事件指:chick等)



**③阻止流动**

语法:    事件对象.stopPropagation()

```js
<body>
    <div>
      <p>我是p元素</p>
      <br /><br /><br /><br /><br /><br />
      <button>点我可以触发事件</button>
    </div>
    <script>
      let div = document.querySelector('div')
      let button = document.querySelector('button')

      button.addEventListener('click', function(e) {
       e.stopPropagation() // 阻止冒泡
   // e是button的事件对象,button的click会传给父盒子div,使用e(事件对象).stopPropagation()即可阻止
       console.log('button')
      })
      div.addEventListener('click', function() {
        console.log('div')
      })
    </script>

//此方法可以阻断事件流动传播，不光在冒泡阶段有效，捕获阶段也有效
```



**④阻止默认行为**

阻止默认行为，也叫解绑,比如链接点击不跳转，表单域的不提交

语法:  事件函数.preventDefault()

##### 重要:匿名函数无法被解绑

```js
 <a href="#">不跳转到百度</a>
    <form action="">
      <input type="submit" value="默认提交效果" />
    </form>

    <script>
      let mya = document.querySelector('a')
    
      // 设定一个aa函数,输出'你点击我了'
      function aa(e) {
        // preventDefault:阻止元素的默认行为
        e.preventDefault()
        console.log('你点击我了')
        // 将事件解绑
        mya.removeEventListener('click', aa)
      }

      mya.addEventListener('click', aa)
```



### 三.事件委托

事件委托是利用事件流的特征解决一些开发需求的知识技巧
**总结：**优点：给父级元素加事件（可以提高性能）
			原理：事件委托其实是利用事件冒泡的特点， 给父元素添加事件，子元素可以触发
			实现：事件对象.target 可以获得真正触发事件的元素

```js
      //给父元素加事件
		div.addEventListener('click', function (e) {
      // e.target：当前真正触发事件的子元素
      //e.target.className输出的是正在点击的子元素的类名
      console.log(e.target.className)
      // 判断，判断用户当前单击的是否是按钮
      if (e.target.className === 'btn') {
        e.target.parentNode.removeChild(e.target)
      }
    })
```



# WebAPI第五天

### 一.滚动事件和加载事件

**①滚动事件:**很多网页需要检测用户把页面滚动到某个区域后做一些处理， 比如固定导航栏，比如返回顶部

```tex
// 语法:window.addEventlistener('scroll',function(){})

滚动监听有两种:
1.添加给window, 对document.documentElement有效;document.documentElement.scrollTop指html页面
2.添加给父元素，对滚动子元素有效
```



**②加载事件**

有些时候需要等页面资源全部处理完了做一些事情

```tex
// 语法:window.addEventListener('load', function () {}   一般最后执行(常用)

// 语法:document.addEventListener('DOMContentLoaded', function () {}  一般首先执行(少用),只能给document加
```



### 二.元素大小和位置

**①scroll家族**:

获取宽高scrollWidth和scrollHeight:获取元素的内容总宽高包含元素卷出屏幕的大小

比如aaaaa很长,屏幕只有100px,超出屏幕了,但获取的宽高是aaaaa的长度

```js
      div {
        width: 200px;
        height: 200px;
        padding: 10px;
        border: solid red 10px;
        /* overflow: scroll; */  //形成滚动条
        word-break: break-all; //可以强制打断
      }
```


获取位置: 获取元素内容往左、往上滚出去看不到的距离
scrollLeft和scrollTop这两个属性是可以修改的

![](D:\黑马\资料笔记\img\图片1.png)

**`注意:document.documentElement   HTML 文档返回对象为HTML元素**

```js
scrollWidth和scrollHeight是得到元素内容的宽高

被卷去的头部或者左侧用 scrollTop / scrollLeft 属性,可以读取，也可以修改（赋值）
console.log(document.documentElement.scrollTop)   //输出元素上方滚动距离
```

`

**②offset家族:**

(重要)  获取宽高：
获取元素的自身宽高、包含元素自身设置的宽高、padding、border
offsetWidth和offsetHeight  

offsetWidth和offsetHeight是得到元素内容 + padding +  border的宽高？

获取位置：
获取元素距离自己定位父级元素的左、上距离
offsetLeft和offsetTop  注意是只读属性

![](D:\黑马\资料笔记\img\图片2.png)



**③clinet家族**

clientWidth,clinetHeight元素获取的可视区域的宽高，不包含border， 宽度 = content + padding

获取位置：获取左边框和上边框宽度 clientLeft和clientTop   注意是只读属性(只是边框!边框!边框!)



```tex
**特别提醒**:clinet和offset的区别:offset包含border,offsettop获取的是子到父的距离.clinet获取的是上边框的距离
```



**④理解窗口**

**event.clientX、event.clientY**

鼠标相对于[浏览器](http://www.2cto.com/os/liulanqi/)窗口可视区域的X，Y坐标（窗口坐标），可视区域不包括工具栏和滚动条。IE事件和标准事件都定义了这2个属性

**event.pageX、event.pageY**

类似于event.clientX、event.clientY，但它们使用的是文档坐标而非窗口坐标。这2个属性不是标准属性，但得到了广泛支持。IE事件中没有这2个属性。

**event.offsetX、event.offsetY**

鼠标相对于事件源元素（srcElement）的X,Y坐标，只有IE事件有这2个属性，标准事件没有对应的属性。

**event.screenX、event.screenY**

鼠标相对于用户显示器屏幕左上角的X,Y坐标。标准事件和IE事件都定义了这2个属性

![](D:\黑马\资料笔记\img\1009007-20170223112832882-336762012.png)



# Web API 第六天

### 一.window对象

window 是浏览器内置中的全局对象，我们所学习的所有 Web APIs 的知识内容都是基于 window 对象实现的
window 对象下包含了 navigator、location、document、history、screen 5个属性，即所谓的 BOM （浏览器对象模型）

document 是实现 DOM 的基础，它其实是依附于 window 的属性。
注：依附于 window 对象的所有属性和方法，使用时可以省略 window



### 二.定时器-延时函数

```js
//  settimeout(处理函数，延迟时间)
setTimeout(function() {div.style.display = 'none'}, 5000)

//关闭定时器:clearTimeout(定时器)
```



### 三.JS 执行机制

**同步:**前一个任务结束后再执行后一个任务，程序的执行顺序与任务的排列顺序是一致的、同步的。比如做饭的同步做法：我们要烧水煮饭，等水开了（10分钟之后），再去切菜，炒菜。

**异步:**你在做一件事情时，因为这件事情会花费很长时间，在做这件事的同时，你还可以去处理其他事情。比如做饭的异步做法，我们在烧水的同时，利用这10分钟，去切菜，炒菜。

```tex
同步任务都在主线程上执行，形成一个执行栈。

异步是通过回调函数实现的。一般而言，异步任务有以下三种类型:
1、普通事件，如 click、resize 等
2、资源加载，如 load、error 等
3、定时器，包括 setInterval、setTimeout 等
异步任务相关添加到任务队列中（任务队列也称为消息队列）
```



### 四.location对象

```tex
location 的数据类型是对象，它拆分并保存了 URL 地址的各个组成部分
常用属性和方法：
href 属性获取完整的 URL 地址，对其赋值时用于地址的跳转 location.href=''
search 属性获取地址中携带的参数，符号 ？后面部分   //地址栏中?aa=bb及为传参(键=值)
hash 属性获取地址中的啥希值，地址栏符号 # 后面部分    
reload 方法用来刷新当前页面，传入参数 true 时表示强制刷新 //location.reload(true) 
```



### 五.navigator对象

通过 userAgent 检测浏览器的版本及平台

```jd
  // 检测 userAgent（浏览器信息）
        !(function () {
            const userAgent = navigator.userAgent
            // 验证是否为Android或iPhone
            const android = userAgent.match(/(Android);?[\s\/]+([\d.]+)?/)
            const iphone = userAgent.match(/(iPhone\sOS)\s([\d_]+)/)
            // 如果是Android或iPhone，则跳转至移动站点
            if (android || iphone) {
                location.href = 'http://m.itcast.cn'
            }
        })()
```



### 六.history对象

history 的数据类型是对象，该对象与浏览器地址栏的操作相对应，如前进、后退、历史记录等

![](D:\黑马\资料笔记\img\图片3.png)

```js
 后退一步键    btn.addElementlistener('click',function(){history.back()})
 前进一步键    btn.addElementlistener('click',function(){history.forward()})
 随机一步键    btn.addElementlistener('click',function(){history.go(-1)})
```



# Web API 第七天

### 一.本地储存

localStorage的基本使用,以

```js
localStorage以键值对的形式存储,存储字符串
//key由自己设定,value为要存储的值,要转为josn字符串
存储数据：localStorage.setItem(key, value) 
获取数据：localStorage.getItem(key)
删除数据：localStorage.removeItem(key)


```

### 二.类型转换

如果存储的不是字符串,而是对象,数组,那么本的存储的时候就会默认调用toString()将内容转换为字符串,所以我们需要先手动转为字符串,避免默认操作带来的风险

```tex
语法:JOSN.stringify((复杂数据类型)     将复杂数据转换成JSON字符串  存储 本地存储中

PS:JOSN格式是一种新的文件,可以取得的对象转化为json格式字符串
并用localStorage.setItem语法存储已转化为josn格式字符串 的对象

json文件语法规则:
1.描述的数据形式和对象基本一样
2.键值都一定要双引号,除了数字,布尔值
3.josn文件中不能写注释
```

```
JSON.parse(JSON字符串)  将JSON字符串转换成对象(面向对象编程)     取出 时候使用
```



### 三.自定义属性

在一个标签中添加data-xxxx=" "即可,使用dataset即可取得全部的值

```js
<button class="btn" data-name="aaa" data-age="15"></button>
             //在btn中添加data-name属性等
 <script>
        $('.btn').on("click", function () {
            let obj = this.dataset
            console.log(obj)
    //可输出obj.name
        })
    </script>
```



拓展:indexOf

```
作用,判断数组中的某个数值是否存在,存在则返回该数值的下标,否则返回-1
newarr.indexOf(arr)     判断newarr里面是否存在arr这个数值
```



### 四.正则表达式

```js
//语法:let reg=/正则/
利用正则判断---->test()
let str='11223344'
let reg=/11/   //判断str时候符合reg的规则
reg.test(str)----->会返回true或者false

元字符(特殊含义的字符)
1.占位符
---\d代表一个数字
---\D代表一个非数字
---\w匹配一个合法字符 a-z A-Z _
---\W匹配一个非法字符
---\s匹配一个空字符 空格 换行符 制表位
---\S匹配一个非空字符 
----[]匹配指定范围或者字符,可以用'-'表示范围,不要写空格
----\+上一个符号表示写这个符号就行,比如\@,表示这里要写@

2.修饰符
修饰前面的字符出现的次数,下方有图

3.定界符
限定匹配字符的长度--->/^表达式$/
```

![](D:\黑马\资料笔记\img\图片15.png)



### 五.replace(是个字符串)方法,exec方法-------可用在正则的方法

```js
//replace------>替换,可以通过正则替换里面的值 
//语法:str=str.replace('正则式','要替换的值')
let str = '23565942652'
let reg =/2/  或者/2/g--->+一个g匹配所有
str=str.replace(reg,'3')-----正则式是2,把str的第一个2替换成3
str=str.replaceAll(reg,'3')-----正则式是2,把str的全部2替换成3

//exec 提取,侧重是正则匹配之后字符串的提取,调用这个方法会返回一个数组,不匹配就返回null
方法--->如果想提取字符串,就在正则式上用()包含要提取的字符
let email='wush012@163.com'
let reg=/^\w+[@]\w+[0]\w+$/
let obj=reg.exec(email)------->obj就是提取的数组
```

