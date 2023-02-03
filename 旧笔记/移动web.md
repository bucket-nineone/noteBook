### 特别提醒

`i`和`em`用作字体图标的标签

`sapn`标签转换，平移通通都不行

单标签没有伪元素

脱标的元素都转块，可以直接设置宽高

添加浮动，父元素可以由内容撑开

关于过渡，谁要变化就给谁！！

边偏移，动画，过渡都要有个起始位置和定位

单行溢出表省略号，必须设置宽度

placeholdery也是伪元素

在less语法里面写伪元素,直接用&::after{}



#### 移动端最终优化方式

①给body设置一个上限的宽和下限的宽,再给footer和header设置

②限制HTML字体大小,使用媒体查询,记得要加!important



### Day01

**旋转效果：**标签`transform:rotate(180deg);` 默认的转换中心在元素中心

**旋转改变原点：**`transform-origin:left center；`

**平移效果：**`transform：translate（0px，0px）；`相对自身平移

（注意层叠性！！！ 还有前后顺序，一般先写平移，先写旋转会改变坐标轴方向）

**缩放：**`transform：scale（`倍数）

**透明度：**`opacity：1`  

**斜切：**`transform：skew（0deg）`，可做擦亮效果，设置一个伪元素，赋予斜切效果，颜色渐变为透明-白色透明-透明，初始位置设置在盒子外面，通过过渡穿过盒子。

**渐变色文字：**先设置渐变色背景，加上`background-clip：text，-webkit-background-clip：text，`再把文字变透明





### DAY02

**空间3D转换：**z轴是面对自己的，transform:translate3d(x,y,z);     transform:translateZ(200px);

**实现透视效果：**perspective添加给观测元素的父级(模拟)。数值一般是800~1200.（相当于安排一只眼睛在距离屏幕8000px的位置帮你观测）

**空间3D旋转**：①transform:rotateX/Y/Z（0deg）  

​						②transform：rotate3d（x,y,z,60deg),旋转线指3个坐标交汇的线。xyz取0~1.

​						③同时在两条轴旋转transform：rotateX() rotateY();

**实际3D效果：**transform-sytle：preserve-3d（flat，默认值，平面）给父盒子设置3d

**开启上帝视觉：**transform: rotateX(-20deg) rotateY(30deg); 



**动画**：@keyframs 动画名称{  0%{}    50%（） 100%{} } 

**调用动画**：animation：动画名称 时间 速度曲线 延迟时间  次数 动画方向 执行完毕的状态；

​					动画名称：必写			单次动画执行时间：必写				动画延迟animation-delay：3s

​					执行次数  infinite 无限次
​					速度曲线：ease默认值（渐慢）    linear 匀速
​					动画方向  ：alternate反向播放
​					执行完毕：backwards默认值   forwards停留在最后一帧

暂停：animation-play-state：paused；配合hover使用





### DAY03

 **可视窗口:**在meta里设置 <meta name="viewport" content="width=device-width",(当前宽度等于设备宽度)



**flex的特点：**给父元素设置了display：flex之后，所有子元素一行排列，不换行，并且可以设置宽高默认宽度由内容撑开，默认高度与父元素等高



**主轴对齐方式:**

```
     .box {
            width: 1000px;
            height: 600px;
            background: orange;
            display: flex;
            justify-content:flex-start;默认靠左
            justify-content:flex-end;全部靠右
            justify-content:space-around; 左右间隙一样
            justify-content:space-evenly; 所有间隙一样
            justify-content:space-between; 两者靠边，中间自动计算
            justify-content:center;居中
        }
```

**侧轴对齐方式**：align-content: center;添加给父元素，如果子元素没有给宽高，默认由内容撑开

```css
 .box {
            display: flex;
            justify-content: center;
            align-items:center; 侧轴居中
     		align-items:flex-start;在上面
     		align-items:flex-end;在下面
            align-items:stretch; 当子元素没有高度才有效，这是默认值拉伸
            width: 1000px;
             height: 600px; 
            background: orange;
        }

        .box span {
        	align-self: flex-start，end，center  给子元素设置
            width: 100px;
            height: 100px;
            color: #fff;
            font-size: 30px;
            font-weight: 700;
            text-align: center;
            line-height: 100px;
            background-color: #0a0;
            border: 1px solid #fff;
        }
```



### DAY 04

 **Flex-direction改变元素排列方向** ：

```css
flex-direction:row;   主轴默认方向
flex-direction:colum  把主轴方向变成从上到下，把侧轴方向变成从右到左
tip：由于方向变了，子元素由横向拉伸变成竖向拉伸

flex-direction:row-reverse; 改变主轴方向,从右到左
flex-direction:colum-reverse; 改变侧轴方向,从下到上
```

**flex换行**

```css
flex-wrap:wrap; 有空白原因：默认拉伸，占满父元素
```

**多行侧轴对齐**

```
.box {
            display: flex;
            /* 子元素换行显示 */
            flex-wrap: wrap; 要先换行！！！
            /* 多行侧轴对齐方式 */
            /* 默认值 stretch拉伸 */
            align-content: center;
            /* align-content: flex-start; 开始端排列对齐
            /* align-content: flex-end;   结束端排列对齐
            /* align-content: space-around; */
            /* align-content: space-evenly; */
            /* align-content: space-between; */
            width: 1000px;
            height: 600px;
            background: orange;
        }
```



### DAY 05

**媒体查询：**em等于当前页面字体大小，rem等于html（根标签）的大小，

```css
  /* 使用媒体查询, 根据不同的视口宽度, 设置不同的根字号 */
        @media (width:320px) {html {font-size: 32px;}}
			字体大小一般设置为宽度的1/10
            rem = 测量出的数据/设计稿对应的根标签字体大小
		@media (width:400px) {html {font-size: 40px；}}
```

 **flexible js配合rem实现** ： flexible.js是手淘开发出的一个用来适配移动端的js框架。 核心原理就是根据不同的视口宽度给网页中html根节点设置不同的font-size。  

```css
<script src="./js/flexible.js"></script> 在最后写，body末标签前面
```

**Less运算：**如果算式中有多个单位，只取第一个；

**变量：**@自定义的变量名: 值;**注意 结尾必须有分号*  `@theme_color:red;`

​           使用：在任意需要的地方直接书写自定义的变量名即可 使用时也需要带上@

**导入语法：**@import "要导入的less文件路径";

注意：①和变量语法极其类似，注意区分import 后面是空格 是空格 是空格 不是冒号 不是等号导入的				只能是less文件。

​			②如果路径有误，则无法编译后缀名.less可省略

​			③当A.less文件导入了B.less文件，在B.less文件修改了，需要在A.less中再次保存，才能编译				到css文件中。

**导出语法：**①out: 导出路径/    只能用单行注释；

​					②作用：写在第一行将文件导出到上一级目录下的css文件夹下

**禁止导出**：*// out: false*

**压缩css文件 :** 在less文件第一行添加: // compress: true

**文件生成sourceMap文件()可在调试器看less代码**** :** 在less文件第一行添加：// sourceMap: true 

**如果有多个属性需要设置，使用逗号分隔即可: // compress: true, sourceMap: true**



### DAY 06

**移动端网页优化:**只适用于rem

①`设置最大值和最小值`

```css
body {max-width:750px;  min-width:320px; margin:0 auto;}
*//脱标元素要单独设置!!!
```

②用媒体查询优化移动端显示

```css
@media screen and (min-width:750px){html{font-size:75px; !important}}
给最小值是750px的位置,设置字体大小为75px,即大于750的区域
@media screen and (max-width:320px){html{font-size:32px; !important}}
给最大值是320px的位置,设置字体大小为320px,即小于320的区域

加个!important提升权重
```



### DAY 07

媒体查询的写法

```css
@media (min-width:750px) and (max-width:1200px){body {font-size:60px;}}
设定750到1200之间字体大小,中间用and连接,记得空格
```

