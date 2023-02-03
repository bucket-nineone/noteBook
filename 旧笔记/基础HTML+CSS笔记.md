### CSS.Day09

##### 背景图片的大小：`background-size：~ ~；`

①直接写数字  ②百分比  

③contain图片比例不变，到达盒子最大  

④cover图片等比例缩放，占满盒子，可能超出盒子



##### 精灵图：`background：url（./)-px -px;`

①画一个与图标大小一样的盒子，用px量大小

②用px量坐标,放入属性



#####  背景图连写：`background：color image no-repeat position/size`

*方位属性值必写！遵循上右下左原则

例：`background: url(./tudou.jpg) no-repeat 50px 50px /250px 300px ;`



##### 过渡属性：`transition:all 1s`; 或者 `transition：属性值 3s，属性值 3s` ；

*要给过度元素本身加！保证默认状态和hover转态不同

给本身设置，移入移出都有效果；给hover设置只有移入有效果



### HTML.Day 01标签：<h1~h6>  p hr br 

文本格式标签：strong u   加粗  del删除线   ins下划线  em倾斜 

图片标签 img  悬停显示title

音频/视频标签 audio/video  controls  loop autoplay



### HTML.Day 02

列表标签： ①无序 ul li 有序 ol li 自定义 dl dt dd   *去除小圆点 list-style：none

表格标签：①《table》属性：border cellspace width height 

​                   ②横排tr 竖排td 表头td→th 加标题caption

​				   ③头，身体，底部 thead tbody tfoot

​					④合并单元格 rowspan clospan 根据左上原则，注释掉不用的



表单控件：①《input》：属性text （placeholder占位符） password 单选radio（name实现分组）                                                                                                        					多选checkbox （默认：checked）文件file 	按钮 button 提交submit 重置reset  button					普通按钮       outline：none去除外边框      *****需要在form内使用 *****

​                   ②下拉控件：select option 默认selected  文本域：textarea  增大点击区域label 



实体字符：&emsp一个中文字  &nbsp一个空格  &gt大于号 &lt小于号



### CSS.Day01

引入方式：①link ②style ③行内

基础选择器：*全局选择器 标签选择器  .类选择择器  #id选择器 标签内选择器

字体样式：font-size-color-style-family 让倾斜的文字不倾斜：font-style：normal    文字倾斜：italic



行高：line-height  



文本样式 ①文本缩进：text-indent：2em   

​				②文本对齐（只对单行文本起作用）：text-align 属性：center  left right

​				③文本修饰：text-decoration：overline，underline，line-through   *用于取消a之类的下划线 none



### CSS.Day02

复合选择器：①后代选择器： 标签（空格）标签    ②并集选择器 标签（逗号）标签 

​					③子代选择器标签（大于）标签            ④并集选择器 标签（无空格）标签



emmet语法：* 用来同时生成多个相同标签  例如：div*10，>表示包含 例如：.father>.son

​                        +表并列 例如：.info+.demo          $ 自增符号，从1开始的正整数，经常结合*使用 例如：.demo$*5
​                        {} 里面放内容  例如：.info{xxxx}

独占一行的元素：h1~h6，p，div，table，tr，ul，ol，dl，dd

一行显示多个：a，span，input，img

背景系列：①bgc，bgu，bgi 

​            		②background-repeat：no-repeat，repeat-xy

​					③background-position：x，y，center



### CSS.Day03

css三大特性：继承性，层叠性，优先级：继承<通配符选择器<标签选择器<类选择器<id选择器<行内样式< 						!important，权重:先看有无直接选中，否则看直接选中的父元素

盒子模型：①margin，padding， border-width

​          		 ②border-style（solid实线，dashed虚线，dotted点线）boder-color

​				   ③border-top，bottom，left，right

去除默认边距：* {margin：0；padding：0；}     自动内减：box-sizing: border-box;



### CSS.Day04

结构伪类选择器：例如找到前五个→标签：nth-child（-n+5）{    }

伪元素：在元素的前或后设置，默认是行内元素，所以会转换为块元素→ 标签：：before/after{content：‘伪元				素中的内容’；display：biock}

*************双标签才有伪元素）************

清除浮动的方法：为什么要清除浮动？

 浮动的元素脱标，不占位置，撑不开父元素，就会导致父元素的高度为0，最后会影响下面的标准流；

 简而言之：就是清除浮动所带来的影响

清除浮动方式：单元素 .clearfix::after {content：“”；display:block;clear:both;}

​                           双元素 .clearfix::before,.clearfix::before {content:“”;diplay:table;}

​                                       .clearfix::after {clear:both}



### CSS.Day05

定位（子绝父相）：①相对定位：相对本身移动，占位置 position：relative   

*z-index设置层级	②绝对定位，相对父元素移动，脱标position：absolute  

​								  ③固定定位：相对浏览器可视区域定位，脱标position：fixed

​								  例：position：absolute；left：0px； top：0px；

​								  水平居中left：50%； top：50%； transform：translateX（-50%）

行内/行内块元素对齐方式：属性vertical-align：baseline，top，buttom，middle；（居中）

想谁对齐，就给谁设置



光标类型：属性cursor：pointer（小手），text（工），move（移动标）；

边框圆角：border-radius：0px 0px 0px 0px； 画一个圆：border-radius：50%；

   				画长方椭圆：px值为高的一半



溢出：overflow：hidden（超出部分隐藏），atuo（自动显示滚动条），scroll（显示滚动条）

元素本身隐藏属性：visibility：hidden(还在）display：none（没了）display：block（显示）

元素整体透明：opacity：0~1；

边框合并：border-collapse：collapse，给table标签设置

伪类选择器（悬停）：  标签：hover，vistited（访问后的状态），

​										link（未访问的状态），active（按下的状态 ）

让文本都在一行显示 white-space：nowrap；

超出部分隐藏：overflow：hidden；

超出省略号：text-overflow：ellipsis



#### 拓展：css画三角形

把边框厚度设置得大一点，把内容宽高设为0，再把其他3个隐藏→transparent



### CSS.Day06

焦点伪类选择器：   标签：focus{}  表示被鼠标选中时的样式

属性选择器:例子 input[type="text"]{}

文字阴影：text-shadow：0px 0px  0px red； 水平垂直偏量，模糊度，颜色

盒子阴影：box-shadow：0px 0px  0px 0px  red inset；color前多一个大小和最后多一个外内阴影

******图片放大代码transform: scale(1.2);******