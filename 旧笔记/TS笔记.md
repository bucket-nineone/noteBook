# **TypeScript 介绍**

## TS简介

- **`TypeScript` 简称：TS，是 JavaScript 的超集**，简单来说就是：JS 有的 TS 都有
- 背景：JS 的类型系统存在“先天缺陷”，JS 代码中绝大部分错误都是类型错误（Uncaught TypeError） 
- 这些经常出现的错误，导致了在使用 JS 进行项目开发时，增加了找 Bug、改 Bug 的时间，严重影响开发效率
- **简单来说就是TS给JS添加类型约束,让JS不出错,提升开发效率**



## TS与JS区别

1. 从编程语言的动静来区分，**TypeScript 属于静态类型的编程语言**，**JavaScript 属于动态类型的编程语言**
   - 静态类型：**编译**期做类型检查
   - 动态类型：**执行**期做类型检查
2. 代码编译和代码执行的顺序：1 编译 2 执行

3. 对于 JS 来说：需要等到代码真正去执行（runtime）的时候才能发现错误（晚）
4. 对于 TS 来说：在代码编译的时候（代码执行前）就可以发现错误（早）



## 两个工具包

```js
//npm i -g typescript-----提供tsc 文件名.ts命令,把ts编译为js
//npm i -g ts-node@8.5.4---提供ts-node 文件名.ts命令,在node中运行ts代码
```





# **TypeScript 常用类型**

> ```js
> 原始类型:JS中本来就有的string,number....------->语法:'let age: number = 18'
> ```
>
> ```js
> 数组类型:语法: 类型[]表示数组里面只能是这个类型
> ------>let list1: (number | string)[] = [123, 456, '李白'];
> ```
>
> ```js
> 函数类型
> /**
>  * 作用：给参数和返回值，加上类型保护。使用更加便捷和安全
>  * 语法：
>  *  1. 分开指定
>  *    function xxx(形参1： 类型， 形参2： 类型): 返回值类型{ ... }
>  *  2. 同时指定
>  *    type Xxx = (形参1： 类型， 形参2： 类型) => 返回值类型
>  *    💥 只能用在表达式中
>  *
>  *  特殊：返回值类型
>  *  TS中，没有返回值，返回值类型是void
>  *  JS中，没有返回值，返回值类型是undefined
>  *
>  *  可选参数：
>  *    1.参数名紧跟?
>  *    2.可选参数，要放在必须参数之后
>  */
> 
> '分开指定写法' ------>后面是返回值类型,没有可以写void或者不写
> function add(a: number, b: number): number {
>   //number返回值类型
>   return a + b;
> }
> 
> '同时指定写法,只能写在函数表达式身上'
> type AddFn = (a?: number, b: number) => number;
> //加了?就是可选参数
> const add2: AddFn = (a, b) => {
>   return a + b;
> };
> ```
>
> ```js
> 对象类型:就用类型别名,即type语法
> //TS-----对象类型--普通对象
> type MyData = {
>   name: string;
>   age?: number; //?表示可选
>   gender: string;
> };
> 
> const formDate: MyData = {
>   name: '李白',
>   age: 18,
>   gender: '男',
> };
> 
> //写方法
> type Person = {
>   sayHello: (msg: string) => void;
> };
> 
> const zs: Person = {
>   sayHello: (msg) => [console.log(msg)],
> };
> ```
>
> ```js
> interface接口:
> // 作用：只能用来描述对象结构的数据类型
> // 👍 规范写法：使用大写I开头，后面跟大写开头的名称----
> 
> // 特点：
> //  1. 🔔同名接口，会自动合并-----
> //  2. 可以先使用后定义
> //  3. 可以定义方法、可选属性。类似对象类型的写法
> 
> interface IPerson {
>   name: string;
>   age: number;
> }
> 
> //与类型别名type的区别
> 1.type可以描述任意结构,interface只能描述对象
> 2.type不可以继承,interface可以继承并合并
> 3.有type用type
> ```
>
> ```js
> // 元组:特殊的数组
> // 1.指明长度,指明每个元素的类型
> // 2.使用场景:使用更精准的类型
> type Pointt = [number, number, string];
> 
> const list: Pointt = [12, 12, '12'];
> ```
>
> ```js
> /*
>   学习目标：字面量类型
>   字面量类型：值作为类型
>   场景： 常和联合类型配合，表示一组可选的取值范围
> */
> 
> //只能是这两个的其中一个
> let str3: 'hello React' | 'hello 71'   要不 = 'hello 71';,要不='hello React'
> 
> //字面量还可以写任意类型,比如对象
> type ActionType =
>   | { type: 'todo/del' }
>   | { type: 'todo/add' }
> function dispatch(action: ActionType) {
>   console.log('action  ----->  ', action);
> }
> //形参只能是ActionType类型中的两个
> dispatch({ type: 'todo/del' });
> ```
>
> ```js
> 枚举类型:文字枚举和数字枚举
> 1. 使用场景:表示一组可选的取值返回,类似:字面量+联合类型
> 2. 语法: enum xxx {键名='值'}
> 3. 特点:既可以当类型使用,又可以当数值使用
> 
> //文字枚举
> //枚举的名称要开头大写,键名要语义化
> enum Status {
>   UnPass = 'unpass',
>   Pass = 'pass',
>   Draft = 'Draft',
> }
> 
> //数字枚举---可以省略,从第一项开始递增,第一项默认为0,所以会从0,1,2.....递增
> //如果不想从0开始,设置第一项为10,即为10,11,12
> enum Status {
> UnPass = 10,
>  Pass,
>  Draft,
> }
>   
> function publishArticle(status: Status) {
>   console.log('status  ----->  ', status);
>   return status;
> }
>     
> //作为类型,约束了res只能调用Status.语法里面有的
> let res: Status = publishArticle(Status.Draft);
> //作为值也可以输出
> publishArticle(Status.Pass);
> ```
>
> ```js
> 类型断言:----->as语法
> // TS推断的不准确，不够精准
> const aNode = document.getElementById('link') as HTMLAnchorElement;
> ```
>
> ```js
> typeof操作符的使用
> 作用：提取类型, 复用类型
> const obj={a:{b:{c{name:'123'}}}}
> 
> //提取obj的类型并复用
> const obj2: typeof obj = {};
> ```

# **TypeScript 高级类型---泛型**

## 泛型----捕获数据的类型

- **泛型是可以在保证类型安全前提下，让函数等与多种类型一起工作，从而实现复用**，常用于：函数、TS 接口、Type 类型别名、class 中

```js
//T就是返回的类型,通过类型推论可以看出来,这里捕获了形参value的类型
function fn<T>(value: T): T { return value }
```



## 泛型函数调用

```js
/*
  学习目标：泛型函数调用
  步骤：
     1. 简写和完成写法,推荐简写
     2. 当类型推断不准确时可以用完整写法
     3. 不知道类型是 什么,可以用fn<any>
*/

//定义一个泛型函数,用来捕获类型
function fn<T>(aa: T): T {
  return aa;
}
//定义一种类型
type FormType = {
  title: string;
  age: number;
  images?: string[];
};

//通过该类型写了一个对象
const res:FormType = {
  title: 'sdsd',
  age: 12,
};

//这里调用了fn泛型函数检查对象的类型,得到了对象类型为FormType
let msg1 = fn(res);


/*
  学习目标：创建泛型函数的第二种写法
*/

type FnType = <T>(aa: T) => T;

const fn1: FnType = (aa) => {
  return aa;
};
//在调用泛型函数时，可以省略 `<类型>` 来简化泛型函数的调用
let msg2 = fn1('123');
```



## 泛型----指定更详细的参数类型

```js
/*
  学习目标：指定更加详细的参数类型
  总结：T代表的是捕获的类型，🔔它可以和任意类型进行组合使用                                                                                                                  
   :T[] 表示T组成的数组
   :{name: T}表示， name的值类型为T的对象
   :[T, T]  表示的是T组成的元组
*/


// 需求1 接收一个数组，返回值类型是：元素的类型
type FindFirstFnType = <T>(list: T[]) => T[];
//该类型规定形参要传入一个数组
const getFirst: FindFirstFnType = (list) => {
  return list;
};
//得出msg1的类型为(string|number)[]
const msg1 = getFirst([1, 2, '3']);


// 需求2： 传入对象，具有name键，捕获name值的类型作为返回值类型
type FindNameFnType = <T>(aa: { name: T }) => T;
const getName: FindNameFnType = (obj) => {
  return obj.name;
};
//规定传入键为name的对象,捕获键值的类型,只要把T放到name那里即可
const name1 = getName({ name: '123' });
const name2 = getName({ name: 123 });
```



## 泛型-指定详细的返回值类型

```js
//按下面的输出,传入啥类型就捕获啥类型,就是把T写到返回值里面
type FindSetName = <T>(value: T) => { name: T };
const setNameFn: FindSetName = (value) => {
  return { name: value };
};

const obj1 = setNameFn('123'); // {name: string}
const obj2 = setNameFn(123); // {name: number}
const obj3 = setNameFn(true); // {name: boolean}
const obj4 = setNameFn({ age: 123 }); // {name: {age: number} }
```

