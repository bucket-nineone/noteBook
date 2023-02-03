# JS高级第一天

### `typeof`关键字 

tepeof 操作符返回的是一个字符串,表示当前对象的类型

```
//  console.log(typeof obj)    假如obj是一个字符串,输出值为string
```



+ `typeof 基本类型`返回的是字符串值
  + 字符串 》》 string
  + bool 》》boolean
  + 数值 》》number
+ `typeof 对象` 返回的是object


+ `typeof 函数` 返回的是function
+ `typeof null` 返回的object
+ typeof undefined:返回undefined
+ typeof 数组：返回object



拓展:  return  arr.join('&')    给arr对象之间添加&符号再输出

```
let arr=[对象,对象]
输出为     对象j&对象     
```



### 逻辑中断

&&：从左到右的顺序进行判断，如果发现某个操作数的逻辑判断是false，那么就不用继续判断了。

||：从左到右的顺序进行判断，如果发现某个操作数的逻辑是true，那么就不用继续判断了。



### switch-case分支结构

**1.语法*

```js
 <script>
        let span = document.querySelector('span')
        document.querySelector('select').addEventListener('change', function () {
            let v = this.value
            switch (v) {         //v是一个变量, case是v编变来的值,
                case '1':        //值一定是字符串
                    span.innerHTML = '星期1'
                    break         //break防止穿透
                case '2':
                    span.innerHTML = '星期2'
                    break
                case '3':
                    span.innerHTML = '星期3'
                    break
              
                default: span.innerHTML = '被选'   //default意思是以上都不是
            }
        })

            //穿透效果
          switch (v)
            case '1':
            case '2':   //不带break,值为1和2都执行这个操作
               操作} 

       //default语句可以写在任何地方，也可以省略，但是一般写在最后，这是一种代码规范
```



### while循环结构

1.语法 

```
while(条件 true/false){
    循环体/需要重复执行的代码;
}
小明考到60分才停止,一直循环

do{
    循环体;   小明考试分数
}while( 条件 );   当=60,上面循环体停止


```



### 三种常用于数组得到循环结构!!!!!

**forEach;单纯的循环操作,语法foeEach(function(value,index){处理})**

```js
 		let arr=[15,26,96,3,689,7]
			arr.forEach(function(v,i)   //v指的是数组值,i指的的下标   
				{console.log(v)})
```



**改造数据用map:遍历整个数组,执行传入的回调函数,并将回调函数的返回值存到新数组中**

**(内部自带一个空数组,执行回调函数,回调函数的返回值都加入到内部数组中,形成新数组}*)

![](D:\黑马\资料笔记\img\图片4.png)

```js
 let data = [12, 399, 36, 7, 6, 77, 54, 65]
 //定义一个值为sbb,会成为map内部的新数组
 //data数组使用map函数   data.map(function(v,i){执行的操作  return 值  })
        sbb = data.map(function (v, i) {
            return { id: i + 1, datas: data[i] }
        })
       //所有return值都为新数组sbb的对象,并加入sbb
       //输出sbb
        console.log(sbb);

		结果:
			Array(8)
            0: {id: 1, datas: 12}
            1: {id: 2, datas: 399}
            2: {id: 3, datas: 36}
            3: {id: 4, datas: 7}
            4: {id: 5, datas: 6}
            5: {id: 6, datas: 77}
            6: {id: 7, datas: 54}
            7: {id: 8, datas: 65}

```



### 删除(重点)

```js
<body>
    <ul></ul>
    <script>
        //一个数组，要求获取其中的所有偶数,要求使用filter来实现
        // let arr = [12, 3, 4345, 123, 6, 547, 6, 8, 678]
        // arr = arr.filter(function (v) {
        //     return v % 2 == 0
        // })

        // console.log(arr);
        let html = ''
        let arr = ['你好', '你不好', '你很好', '你是个好人']

        //改造函数,可以用原函数覆盖
        arr = arr.map(function (v, i) {
            return { id: i + 1, name: arr[i] }
        })

        console.log(arr);
       
       //遍历改造后的数组
        for (let i = 0; i < arr.length; i++) {
            //给删除按钮添加id
            html += `<li>${arr[i].name}------<span class="del" id="${arr[i].id}">删除</span></li>`
        }
        document.querySelector('ul').innerHTML = html

        let dels = document.querySelectorAll('.del')
        //使用forEach循环数组
        dels.forEach(function (v) {
            v.addEventListener('click', function (e) {
                console.log(e.target.id);
                //使用filter函数删除子元素
                arr = arr.filter(function (v) {
                    console.log(v);
                    //看看子元素的id是否相等,返回不相等的值
                    return v.id != e.target.id
                })
                console.log(arr);

            })
        })
    </script>
</body>
```



### 三种创建对象的方式

**new会开辟一个新空间,创造对象.把对象的值都放进去**

```js
<script>
       //方式一:直接创建
        let obj3 = { sex: '男', city: '东莞' }
        console.log(obj3);
        
        //方式二:new Object()创建
        let obj4 = new Object()
        obj4.color = '红色'
        console.log(obj4);



        //方式三:简单工厂的函数创建,给他传参,工厂函数没有用new
        function creatFactory(name, age) {
            let obj = new Object()
            obj.name = name
            obj.age = age
            return obj
        }

        let obj1 = creatFactory('jack', 24)
        let obj2 = creatFactory('tom', 15)
        console.log(obj1);
        console.log(obj2);

    </script>
```



### 事件排序

```js
 <script>
        //定义一个数组,让他从小到大排序
        let arr = [12, 56, 8, 6, 26,]
       //第一次循环,i=0,i=1......
        for (let i = 0; i < arr.length; i++) {
       //第二次循环:i=0,j=0;i=0,j=1...
       //         i=1,j=0;i=1,j=1;i=1,j=2....
                  
            for (let j = 0; j < arr.length; j++) {
                console.log(`i=${i},j=${j}`);
                //交换位置.定义一个中间值temp
                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                }
            }
            console.log(arr);
        }
    </script>
```





# JS高级第二天

### 作用域及作用域链

作用域：变量起作用的区域，也就是说：变量定义后，可以在哪个范围内使用该变量。

```javascript
var num = 11;//全局变量
function fn(){
  var num1 = 22;//局部变量
  console.log(num);  // 全局变量在任何地方都能访问到
  console.log(num1);  
}
console.log(num);
```



作用域链：只要是函数，就会形成一个作用域，如果这个函数被嵌套在其他函数中，那么外部函数也有自己的作用域，这个一直往上到全局环境，就形成了一个作用域链。

(自己有就用自己的,否则一直往上找)

#### 作用域链练习

```js
        //改造之前
       var num1 = 10;
        var num2 = 20;
        function fn(num1) {
            num1 = 100;
            num2 = 200;
            num3 = 300;
            console.log(num1);
            console.log(num2);
            console.log(num3);
            var num3;
        }
        fn();
        console.log(num1);
        console.log(num2);
        console.log(num3);
        
        //改造之后

        var num1    //先把定义的变量和定义的函数提上来
        var num2
        function fn(num1) {      //定义的函数
            var num3;    //函数内部也是,把变量提上来
            num1 = 100;
            num2 = 200;
            num3 = 300;
            console.log(num1);
            console.log(num2);
            console.log(num3);
        }
       //变量的赋值和函数的执行都按顺序排在下面
        num1 = 10
        num2 = 20
        fn();
        console.log(num1);
        console.log(num2);
        console.log(num3);
```





### 构造函数的三种方式

构造函数的主要作用:创建对象,并为对象的属性赋值

构造函数的名称一般以大写字符开头

构造函数要用new调用,否则就是一个普通函数

构造函数用通过this赋值,默认会将创建的对象返回

#### 常规的方式

```js
//大写字母开头
function Person(name,age){
    this.name=name   //this赋值
    this.age=age
}
let per=new Person('jack',20) //new调用
//new干了什么?开辟了空间,空间中创建了对象,为对象的属性赋值,
//将构造函数中的this指向新创建的对象(per),并将this的值返回(per)
//可以忽略 return
console.log(per)
```

#### 函数表达式

```js
//相当于将函数定义为一个变量
const fn = function() {
  console.log("这是函数表达式");  
}
fn();//函数表达式必须先声明，再调用
```



#### 构造函数Function

> 所有函数都可以通过Function构造函数来创建
>
> 函数也可以看成对象

```tex
new Function([前面是参数列表，]最后一个参数是函数体)
```



```js
var fn1 = new Function("a1", "a2", "alert(a1+a2)");
fn1(1,2);
```

## 

### 原型 prototype -重点

(所有对象和函数都有原型)函数构建之后,系统都会给他开辟一个空间,即原型:prototype,  原型也是一个对象

既然prototype是一个对象,那就可以给他添加新成员

```js
<script>
        function Student(name, age) {   
         //声明一个构造函数,自带的原型prototype,该构造函数创建的对象都可以用它的原型方法
            this.name = name
            this.age = age
        }

     //给构造函数Student的 原型  添加新成员
       Student.prototype.sayHai = function () {
            console.log('123');
        }
        Student.prototype.sayhh = 'hello'
        
        // 使用new关键字创造对象()
        //构造函数创建的的对象可以调用它原型的方法
        let stu = new Student('jack', 20)
        let stu1=new Student('jack,,18)
        console.log(stu);
       // 通过构造对象调用
        stu.sayHai()  


```



**构造函数的对象所能访问的原型是 创建这个对象时构造函数所指向的原型**

**原型只有一个,以后尽量使用点语法创建成员**

```js
    function Student(name, age) {
            this.name = name
            this.age = age
        }
    //使用点语法创建
        Student.prototype.sayHai = function () {
            console.log(123);
        }
        let per = new Student()
        per.sayHai()
    //用了对象创建,会开辟一个新空间
        Student.prototype = { code: function () { console.log('我可以写123'); } }
        let per2 = new Student()
     //per2没错,但per就会报错,因为构造函数指向了创造code的原型,而不是sayhai的原型
        per2.code()
        per.code()
```

![]()



### 构造的书创建的对象访问----原型  proto

用对象访问原型

```js
语法:    对象._ proto _ -----> per._proto_
```

 例如:per为构造函数new的对象,使用per._ proto _ 即可得到Person的原型

### constructor语法

**constructor是连接原型是构造函数的关系语法,但原型不能直接写,所以用new对象过渡**

```js
//语法   对象.原型.constructor,  它===构造函数
即per._ proto _.constructor即访问到构造函数
```



### 逻辑例子

```js
     //写一个map函数,以后所有数组都能访问
    //mymap是一个函数    callback是一个函数
    //相当于 callback 要执行下面mymap函数的参数
Array.prototype.mymap = function (callback) {
            let temp = []
            for (let i = 0; i < this.length; i++) {
                temp.push(callback(this[i]))  
      //所以先执行callback(this[i]),执行的是下面的步骤,参数是arr[i]
      //之后再执行function (callback)
            }
            return temp
        }

        let arr = [1, 2, 3]
      //调用mymap函数,参数为function (v) {return v + 10 }
        arr = arr.mymap(function (v) {
            return v + 10
        })
        console.log(arr);
```



### call应用

**call方法可以调用一个函数，并且可以指定这个函数的`this`指向**

```js
const RichWumon = {
    name: "富婆",
    say: function () {
        console.log(this.name, " 我要重金求子");
    }
}
  
const obj = {
    name: "屌丝"
}

//say是Richwumonde的方法,this指向他,只能他来调用
RichWumon.say();			// 富婆
//用call语法后,obj也能调用
RichWumon.say.call(obj);	// 屌丝

obj.say()
```







# JS高级第三天

### 箭头函数

箭头函数也是函数,说明他可以接收参数,一般是匿名函数

语法(参数)=>{循环体}

 let getSum = (a, b) => { return a + b }

 console.log(getSum(5, 6));

```js
       //箭头函数与普通函数主要区别在于作用域,从而造成函数中this指向不一样
        //箭头函数中的this,不管你怎么调用,都指向一个固定对象
        //箭头函数中的this指向 创建这个箭头函数所在对象 的 上下文:
        //上下文:当前对象所在的环境

       let obj={name:'jack',
       //在函数里面添加一个箭头函数再操作就可以永远指向父元素了
         say:function(){
            return ()=>{
              console.log(this)
            }
      }}
     //要用fn来执行
      let fn = obj.say()
      fn()

      //obj.say()()
```



### es6 class-重点

JavaScript 语言中，生成实例对象的传统方法是通过构造函数,es6的class 的出现 基本上可以替代了es5的构造函数和原型,使之代码结构上更加简洁。

```js
<script>
        class Person {
            //使用constructor定义变量
            constructor(name, age) {
                this.name = name
                this.age = age
            }
            //函数直接写
            sayHai() {
                console.log(this.name);
            }
        }

        let per = new Person('jack', 20)
        per.sayHai()
    </script>
```



### ES6-class实现继承

**class里面实现继承-重点**

```js
    <script>
        //目的:让Student构造函数继承Person构造函数的原型
        class Person {
            constructor(name, age) {
                this.name = name
                this.age = age
            }
            sayHai() {
                console.log(this.name, this.age);
            }
        }
      //上面已构造好了Preson函数
     //继承语法:  class 需继承函数 extends 继承函数{}
        class Student extends Person {
           
          //继承的函数也要先构造
            constructor(num, name, age) {
          //构造里面用super继承父元素的值
                super(name, age)
                this.num = num
            }
        }
        let stu = new Student(1, 'jack', 20)
        stu.sayHai()
    </script>
```



### 原型prototype实现继承(旧方法,不常用)





# JS高级第四天