# JQuery第一天

### jq对象和dom对象互换

```js
//dom元素转换为jq对象
$('div')

//jq对象转换为dom元素
$('div')[0]或者$('div').get(0)
```



### 基础选择器

| **名称**   | **用法**           | **描述**                                                    |
| ---------- | ------------------ | ----------------------------------------------------------- |
| ID选择器   | $(“#id”);          | 获取指定ID的元素，id是指定的id选择器名称                    |
| 类选择器   | $(“.class”);       | 获取同一类class的元素，class是指定的class选择器名称         |
| 标签选择器 | $(“div”);          | 获取同一类标签的所有元素                                    |
| 并集选择器 | $(“div,p,li”);     | 使用逗号分隔，只要符合条件之一就可                          |
| 交集选择器 | $(“div.redClass”); | 获取class为redClass的div元素                                |
| 子代选择器 | $(“ul>li”);        | 使用>号，获取儿子层级的元素，注意，并不会获取孙子层级的元素 |

**PS;子代不会获取孙子,后代选择器获取后代所有**



### 筛选选择器

| **名称**   | **用法**                           | **描述**                                 |
| ---------- | ---------------------------------- | ---------------------------------------- |
| :eq(index) | $(“li:eq(2)”).css(“color”, ”red”); | 获取到的li元素中，索引号index从0开始     |
| :odd       | $(“li:odd”).css(“color”, ”red”);   | 获取到的li元素中，选择索引号为奇数的元素 |
| :even      | $(“li:even”).css(“color”, ”red”);  | 获取到的li元素中，选择索引号为偶数的元素 |
| :first     | $(“li:first”).css(“color”, ”red”); | 获取到的li元素中的第一个                 |
| :last      | $(“li:last”).css(“color”, ”red”);  | 获取到的li元素中的最后一个               |



### 筛选方法

| **名称**           | **用法**                   | **描述**                                     |
| ------------------ | -------------------------- | -------------------------------------------- |
| children(selector) | $(“ul”).children(“li”)     | 获取当前元素的所有子元素中的li元素           |
| find(selector)     | $(“ul”).find(“li”)         | 获取当前元素中的后代元素中的li元素           |
| siblings(selector) | $(“#first”).siblings(“li”) | 查找兄弟节点，不包括自己本身                 |
| parent()           | $(“#first”).parent()       | 查找父亲                                     |
| eq(index)          | $(“li”).eq(2)              | 相当于$(“li:eq(2)”),index从0开始，得到jq对象 |
| next()             | $(“li”).next()             | 找下一个兄弟                                 |
| prev()             | $(“li”).prev()             | 找上一个兄弟                                 |

**重点记住： parent()  children()  find()  siblings()  eq() next()**

$(“ul”).children(参数) 没传参数就会获取ul的所有子元素,如果里面有li,有ol,都会获取到.传了参数就只会获取符合的

parents(参数)  不传参数会取到所有父元素



### 样式操作

#### **样式设置**

语法:$(选择器).css(样式名称，样式值); // 设置元素的单个样式

例子:$(this).css(''color'', ''red'');



#### **获取元素样式**

语法:$(选择器).css(样式名称); // 获取指定样式属性所对应的值
例子：$("div").css("background-color"); 获取div元素的背影色

**PS:css(),括号里面写两个,代表样式设置,写一个代表获取样式**



#### 添加删除样式

```
添加类:$(“div”).addClass(''current'');
删除类:$(“div”).removeClass(''current'');
切换类:$(“div”).toogleClass(''current'');
```



### show系列动画

```
显示隐藏: show()   hide()   toggle()  
滑动:slideDown() slideUp()  slideToggle()
淡入淡出:fadeIn(0-1)  fadeOut(1-0) fadeToggle(切换)   fadeTo()指定到哪个值

三种括号里都可以传参数
例子:show|hide([speed,[easing],[fn]])
（1）参数都可以省略， 如省略则无动画直接显示。
（2）speed：三种预定速度之一的字符串(slow(200)、normal(400)、fast(600))或表示动画时长的毫秒数值(如：1000)。
（3）easing：(Optional) 用来指定切换效果，默认是“swing”，可用参数“linear”。
（4）fn:  回调函数，在动画完成时执行的函数，每个元素执行一次。

```



# JQuery第二天

### 动画animate

语法:animate(params,[speed],[easing],[fn])

```js
$div.animate({ left: 500 }, 3000, 'linear', function () {
       $div.animate( { top: 500,width:300 }, 3000, 'linear', function () {
        })
        })
  //可以不断叠加,动作以对象形式存在,对象中的键值可添加多个

//动画开始前加个停止
$(this).stop().animate()
```



获取属性和设置属性

获取: jq对象.prop(''属性'')                          设置:jq对象.prop(''属性'', ''属性值'')

​         jq对象.attr(''属性'')                             设置:jq对象.attr(''属性'', ''属性值'')

​       **PS:对象状态的值只能用prop获取,比如:disabled,checked,其他的用attr**

```js
<body>
  <!-- checkbox 选中状态由checked属性来决定 -->
  <input type="checkbox" value="你好" myindex="1" />
  <button>点我啊</button>

  <script>
    $(function () {
      let $input = $('input')
      $('button').on('click', function () {
       //获取属性值
        console.log($input.prop('type'))
        //设置属性值
          $input.prop("value","大家都好")
      })
    })
  </script>
</body> 
```



### 数据缓存date()

date()可以在指定元素上存储数据,页面刷新就没了

语法:data("name","value") //向被选元素附加数据