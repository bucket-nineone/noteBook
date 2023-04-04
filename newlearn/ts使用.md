### 类型保护

```ts
//类型别名
type marr = number | string

//指定数组
let arr: (number | string)[] = [123, 23, '23']
let arr1: marr[] = [2, '3']


//函数类型可以没有返回值
type undefinds = () => void

// 函数类型加上类型保护----->分开指定
let add: Function = (a: number, b: number): number => {
  return a + b
}

// 函数同时指定
type addFn = (a: number, b: number, c?: number) => number
let add2: addFn = (a, b, c) => {
  console.log(a, b, c)

  return a + b
}



// 对象类型
type objs = { name: string; num: number }
let obj: objs = { name: '1', num: 1 }

//对象同时指定函数
type person = {
  sayHai: (msg:string) => void
  sayhellow(): number
}

const zs: person = {
  sayHai: (msg) => {},
  sayhellow() {
    return 1
  },
}

zs.sayHai('1')  ----->这时才会检测,ts检测的是方法的调用
```



### TS的类型

#### **interface**

```ts
//接口类型  作用:描述对象结构的数据类型
//规范写法:使用大写 I 开头,后接大写单词
interface IPre {
  name: string
}
//可以多次写,会自动合并
interface IPre {
  age: string
}

interface Ison extends IPre {
  run: () => void
}

const ls: IPre = {
  name: '收到',
}

//type和interface的区别
//1.type可以表示任意类型,interface只能描述对象
//2.同名的interface会合并
//3.interterface可以几次
```



#### **元组**

```ts
//元组是特殊的数组----指名长度和类型
type point = [string, number]
let points: point = ['1',2]
```



#### **字面量类型**

```ts
/*字面量类型:直接用值作为类型  ---->'123'
场景:常和联合类型配合,表示一组可选的取值范围
*/

type actionType =
  | { type: 'todo/add' }
  | { type: 'todo/del' }
  | { type: 'todo/edit' }

function dispatch(action: actionType) {
  console.log(action)
}

dispatch({type:'todo/add'})
```



#### **枚举类型**

```ts
//表示一组可选的取值范围,类似字面量加联合
//语法 enum xxx {键名:键值}
//特点:既可当做对象使用,也可以当做注解使用

//文字枚举
enum enumMj {
  ueer = 'uese',
}

function getenum(status: enumMj) {
  console.log(status)
}

//数字枚举
enum numMj {
  ueer,   ---->不设置值得话这个值从0开始递增
  ueeer,
}

function getnumMj(stat: numMj) {
  console.log(stat)
}
```



### 类型断言

```ts
//ts推断不准确的时候,以自己设置为主
xxx as ssss
//设置divnode的类型为a标签
const divnode=document.getElementById('link') as HTMLAreaElement

divnode.href
```



### **typeof操作符**

```ts
//直接提取kkk的类型
let kkk = { a: { b: { c: [] } } }
type Presonkkk = typeof kkk

let ibj10: Presonkkk = {}
let obj10:typeof kkk={}
```



### TS高级类型

#### **泛型**

```ts
/*
泛型可以理解为一个类型的占位符,使用的时候需要通过尖括号<>声明

泛型声明语法:<泛型>(型参:泛型):泛型
泛型占位名称可自定义,T比较常见
*/
使用 "="表示不传的话默认为这个类型,比如number,unkonw
const fn3 = <T=unkonw>(value: T): T => {
  return value
}

fn3(1).toFixed()

//泛型接口
//interface 接口名称<泛型名称>{}

interface Res<T> {
  [k:number]:any
  name: string
  data: T
}

//泛型对象普通结构
const obj: Res<string[]> = {
  name: 's',
  data: ['2'],
}


//泛型对象结构
type Todo = {
  id: number
  content: string
  done: boolean
}

const obj: Res<Todo[]> = {
  name: 's',
  data: [{ id: 1, content: '1', done: true }],
}
```



#### **泛型约束**--extends

- 情景:当你获取的数值一定要有某个属性(length)

```ts
//泛型约束---进一步约束泛型extends
//表示 该泛型 约束 必须要有 length属性并且为数字
type obj { length: number }


const getLength = <T extends obj >(params: T) => {
  return params.length
}
const res1 = getLength([123, 1])
```



#### 多个泛型

```ts
const fn = <T, K>(a: T, b: K) => {
  console.log(a, b)
}
fn(1, '2')
```



#### keyof提取键名

```ts
//typeof 获取js变量对应的ts类型
//keyof   获取ts类型的对象键名

let obj={name:'李白',age:18}

type Objkey=keyof typeof obj
//type Objkey='name'|'age'
```



#### 泛型工具类型

- 泛型工具类型:TS 内置了一些常用的工具类型，来简化 TS 中的一些常见操作
- 说明:它们都是基于泛型实现的(泛型适用于多种类型，更加通用)，并且是内置的，可以直接在代码中使用。 这些工具类型有很多，主要学习以下几个:

1. `Partial<Type>`属性转可选

2. `Readonly<Type>`属性转只读

3. `Pick<Type, Keys>`选取属性

   ```ts
   //挑出来形成新的类型
   type person = {
     name: string
     age: number
   }
   
   
   type person1=Pick<person, 'name'>
   const obj2:person1  = {
     name: '1',
   }
   ```

   

4. `Omit<Type>`删除属性

   ```ts
   //剔除出来形成新的类型
   type person = {
     name: string
     age: number
   }
   
   type person1=Omit<person, 'name'>
   const obj2:person1  = {
     age: '1',
   }
   ```



### 索引签名类型

- 作用,定义键名称类型,应对无法确定对象中的键的名称的情况

```ts
interface jian {
  [k: number]: string
  length: number
}
let jiaobj: jian = {
  0: 'hj',
  1: '23',
  length: 2,
}
```



### 映射类型

- 映射类型:**基于旧类型创建新类型(对象类型**)，减少重复、提升开发效率。
  比如，类型 PropKeys 有 x/y/z，另一个类型 Type1 中也有 x/y/z，并且 Type1 中 x/y/z 的类型相同:

```ts
type PropKeys = 'x' | 'y' | 'z'
type Type1 = { x: number; y: number; z: number }
```

- 这样书写没错，但 x/y/z 重复书写了两次。像这种情况，就可以使用映射类型来进行简化。

```ts
type PropKeys = 'x' | 'y' | 'z'
type Type2 = { [Key in PropKeys]: number }
```

- 解释:
  1. 映射类型是基于索引签名类型的，所以，该语法类似于索引签名类型，也使用了 []。
  2. `Key in PropKeys` 表示 Key 可以是 PropKeys 联合类型中的任意一个，类似于 forin(let k in obj)。
  3. 使用映射类型创建的新对象类型 Type2 和类型 Type1 结构完全相同。
  4. 注意:**映射类型只能在类型别名中使用，不能在接口中使用**。

### 根据对象创建

映射类型除了根据联合类型创建新类型外，还可以根据对象类型来创建:

```ts
type Props = { a: number; b: string; c: boolean }
type Type3 = { [key in keyof Props]: number }
```

- 解释:
  1. 首先，先执行 `keyof Props` 获取到对象类型 Props 中所有键的联合类型即，'a' | 'b' | 'c'。
  2. 然后，`Key in ...` 就表示 Key 可以是 Props 中所有的键名称中的任意一个。



### TypeScript声明文件

TS中有两种文件,分别是用于执行的.ts和只写类型的 .d.ts文件

![](D:\gitStore\noteBook\newlearn\img\Snipaste_2023-03-15_16-05-34.png)