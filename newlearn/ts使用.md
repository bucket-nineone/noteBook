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

**interface**

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



**元组**

```ts
//元组是特殊的数组----指名长度和类型
type point = [string, number]
let points: point = ['1',2]
```



**字面量类型**

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

