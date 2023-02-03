# Javascript第一天

**Javascript是什么?**

Javascript是一门运行在客户端(浏览器)的编程语言,实现人机交互效果

**Javascript的作用**

1. 网页特效(监听用户的一些行为让网页做出相应的反馈)
2. 表单验证(针对表单数据的合法性进行判断,例如用户名对不对)
3. 数据交互(获取后台数据,渲染到前端)

**JavaScript的组成**

ECMAScript(javascript语言基础和webapi)

webapi包括DOM页面文档对象模型,BOM浏览器对象模型



### 一.书写位置

内部:默认写在</body>的前面,添加script标签

外部:通过script标签引入外部的js文件



### 二.注释

单行注释// ,块注释/**/



### 三.输入和输出

```js
// 输入
prompt('内容')
//输出
console.log():在浏览器控制台中输出
document.write():在页面中输出
alert():在页面上弹出框   // 不建议使用

```



### 四.变量

```js
//声明变量
let 变量名
//  赋值
变量名=变量值    (声明时可直接赋值： let 变量名 =变量值)
```

**命名规范:**命名要语义话,智能用数字,字母和_,$两个特殊符号,数字不能用于开头



### **五.数据的基本类型:**

number 数字型:单数字

string 字符串型:用单引号或双引号包裹

boolean  布尔型:表示肯定的数据用 true（真），表示否定的数据用 false（假）。

```js
let score=ture
console.log(score) //这样就会输出ture

let score=prompt('请输入考试成绩')
console.log(score>=60) //当score小于60,就会输出false
```

undefined未定义类型:一个变量定义了但是没有赋值,那么为undefined

null:赋值了,但是个空值 let age=null



### 六.字符串

①字符串要用''或""包裹

②加号:+两边有一个是字符串,即是连接符,两边都是数值,即是＋号

③:单引号可以用/'表示,避免读取错误

④模板字符串:用反引号即tab健上面的,包裹输出内容,字符串用${  }包裹,例子

```css
  let name = '赵四', age = 30, gender = '男'
  document.write(`我的名字是:${name},我的年龄是${age},我的性别是${gender}`)
```

**通过typeof关键字检测数字类型:**

```
console.log(typeof 变量名)
```



### 七.类型转换

**隐式转换:**内部转换,将数值转换为字符串;

​				在字符串前加个+或-0或*1等,变成运算的式子,即转换成数值类型.

**显式转换:**①Number(变量)：将变量转换为数值;**如果字符串里面含有非数字(如123abc)**,转换失败时结果为NaN,即不是一个数字,NaN也是数字类型的数据,代表非数字

​				②String(变量)：将变量转换为字符串

​				③parseInt(变量)：将变量转换为整数

​				④parsefloat(变量)：可保留小数

例子

```js
let name="123"
console.log(Number(name))  //即可转化值name的数据类型
```

**拓展:**isNaN,判断值是否为非数值,是的话就是ture,不是的话false



### 八.var和let的区别

```js
//var没有作用域,并且会提升层级,可以先使用再声明
##情况一
console.log(age)  ===>实际:var age
var age=20                console.log(age)
                          age=20
会把定义的var提高----所以会输出undefind,而用let会直接报错

##情况二
if(true){ var age =20}
console.log(age)
如果用let,则会输出underfind,而var就会输出20,因为var定义的哪里都可以用
```



# Javascript第二天

### 一.简单预算符

①算术运算符:一共五种"+"  '-'  "*"  "/"  "%"(取余数)

②赋值运算符:=  变量=值即给变量赋值 

③一元运算符:作用于单变量,只有"++"和"--"两个符合,让变量自增或自减.

   **注意:**++(--)写在变量前面和后面不一样,会按顺序执行

```js
let a=10
       a=10            a=11再自增 
let b =a++ (第一次使用) + ++a (第二次使用)  +5
console.log(a)=
consele.log(b)=
```



### 二.比较运算符

```js
//常规值:  ">" "<" ">=" "<=" 
"==" //只比较数值,不比较类型.  例如100="100"成立
"===" //比较类型和数值
"!=" //不等于
// 注意:一般数值比较大小,字符串比较是否相等
```



### 三.逻辑运算符

①逻辑与:&& 同时满足多个条件,一个条件不成立,即不成立,为flase

②逻辑或:||  满足其中一个条件就行,有一个成立即成立,为ture

③逻辑非:取反

**④逻辑运算符里的短路:**

短路：只存在于 && 和 || 中，当满足一定条件会让右边代码不执行\

| &&   | 左边为false就短路 |
| ---- | ----------------- |
| \|\| | 左边为true就短路  |



### 四.分支

①单分支运算

```js
  <script>
    let score = prompt('请输入你的高考分数:')
    if (score >= 700) {
      document.write('恭喜你!考入黑马程序员')
    }
    else {
      document.write('很遗憾!')
    }
  </script>
```



②双分支运算

```js
 <script>
    let year = prompt('请输入年份')
    if ((year % 4 == 0 && year % 100 !== 0) || year % 400 == 0) {
      document.write("这是闰年")
    }
    else { document.write('这是平年') }
  </script>
```



③多分支运算

```js
<script>
    let score = prompt('请输入你的成绩')
    if (score > 100 || score < 0) { document.write('你输入的值不符合规范') }
    else if (score >= 90) { document.write('A') }
    else if (score >= 80) { document.write('B') }
    else if (score >= 70) { document.write('C') }
    else if (score >= 60) { document.write('D') }
    else { document.write("不合格") }
  </script>
```



④三元运算符

```js
time=time<=10 ？document.write('0'+time) :time
```

# JavaScript第三天

### 一.while循环

**三要素:**初始值,,条件,初始变量的变化

```js
  let i = 0
      let count = prompt('请输入你想执行的次数')
      while (i < count) {
        console.log(`第${i + 1}次执行`)
        i++
      }
```



### 二.for循环

```js
 // 语法:for(初始值(1);条件(2);值的变化(4)){操作体(3)}
 //分号不可少,数字代表执行路径
 	
let sum = 0
      for (let i = 1; i <= 100; i++) {
        if (i % 2 == 0) {
          sum += i
        }
      }
      // 当循环完成之后，打印最终的结果
      console.log(sum)
```



**循环控制:**①break:中止当前循环--跳出循环

②continue:中止这一次循环操作，跳转到下一次循环操作



**嵌套循环**

```js
// 打印星星
      for (let i = 0; i < 10; i++) {
        
        for (let j = 0; j <= i; j++) {
          document.write('★')
        }
        document.write('<br>')
      }
```



### 三.数组

①概念:可以存储多个值的一种数据类型：Array

```js
//定义数组
let arr=[25,63,5,98,55,'小红']
```



②数组的元素的获取：通过索引下标获取和操作

console.log(arr[0]),即可输出数组的第0项



③数组操作:**增加**:arr.push(新元素)在后面加;arr.unshift(新元素)在前面加

​					**删除:**arr.pop(   )   arr.shift()    arr.splice   (起始位置,删除的个数)

​					**修改:**重新赋值,数组[下标] = 新值

​					**查:**arr[数组的下标]



**拓展:**①arr.length函数的数量,是一个数字



# JavaScript第四天

### 一.函数

```js
//设定函数    function 函数名 (形参,形参){函数体}
//调用函数    函数名(实参,实参)
//例子:
   let sum = 0
        function getnum(arr(形参)) {
            for (let i = 0; i < arr.length; i++) {
                sum += arr[i]
            }
            console.log(sum)
        }
       //两种赋值方式
        let newArr=[12, 36, 78, 65, 145, 45]
     
        getnum(newArr(实参))
        getnum([12, 69, 35, 78, 62, 35, 954])
		//实参的值会 按顺序  赋值  给形参,最后由函数体输出
```



**例子2**

```js
     function getmax(arr) {
            let max = arr[0]
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] > max) {
                    max = arr[i]
                }

            }
            return max
        }
        let abc = getmax([1, 9, 3, 7, 5, 10])
        console.log(abc)
```



### 二.函数的返回值

**①返回值的应用:**

当调用某个函数，函数会返回一个结果出来,这就是返回值,返回多个值用数组接收(return)

有返回值的函数,一个函数没有返回值,默认返回undefined

```js
 function getSum(arr) {
      //   短路运算：如果没有传递参数，保征arr至少是一个数组，规避后续代码的bug
      // arr = arr || []
      if (!arr) {
        // 没有传递参数，arr是undefined  >> false
        alert('你倒 是传个数组来啊')
        //   执行下面的reutrn,立刻中止当前函数
        return 0
      }
      let sum = 0
      for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
      }
      // 返回当前的计算结果
      return sum  //这个值(sum)会赋值给getsum()
      // 不要在return 后面写代码
    }
    // 有返回值的函数，调用函数就会获取函数的返回值，我们需要做的是定义一个变量接收返回值
    let result = getSum([1, 2, 3, 4]) //这里没有参数,不会传过去,直接终止执行
    alert(result)
```



**拓展:**①js 中通过判断得到false的值有  ''   "" 0  undefined null

​		②数组元素的遍历:for遍历 

​		③获取数组的长度:arr.length---长度从1开始算

# JavaScript第五天

### 一.遍历对象

```js
 <script>
        let arr = {
            name: '詹桑', sex: '男', weight: '60kg'

        }
// 定义一个变量k,使用for in输出遍历对象(变量一般用k)
//  格式 for(let 变量 in 对象)  {console.log(变量)输出属性名 console.log(对象名[变量])输出属性值}
   
        for (let k in obj) {
            console.log(k)
            console.log(obj[k])
        }
    </script>
```



### 二.内置对象

①JavaScript的对象分为三种:自定义对象,内置对象,浏览器对象

②内置对象就是JS自带的一些对象,比如:Math,Date,Array,String



### 三.匿名函数

```js
//匿名函数就是没有名字的函数------->function (){}
1.匿名函数不能单独存在
2.可以将匿名函数赋值给一个变量,并且通过变量名称进行调用,这就是函数表达式
let fn =function (){}------>调用 fn()

3.三种函数
全局函数function test(){} 不管你用不用,一开始就会进行解析,将函数解析好之后会存储到内存供你调用
非全局函数,真正使用的时候才会调用,比如匿名函数,可以大大减少内存
自调用函数,会直接执行 ;(function test(){}) () ---->一般前面要＋个";"分割符,避免跟上一行的连起来,出bug
```

