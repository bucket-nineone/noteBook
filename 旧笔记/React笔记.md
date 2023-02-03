# React 第一天

## 一.虚拟DOM和真实DOM

```js
真实DOM元素包含的元素和方法太多,都加载的话效率太低

//为什么要用虚拟DOM?
虚拟DOM就是保存关键信息的JS对象,配合key更新DOm效率更好,可以做到局部更新
真实DOM数量过多,直接操作DOM成本太高了,使用虚拟DOM描述UI,性能会更好

//虚拟DOM实现原理
1.虚拟DOM本质上是JS对象,是对真实DOM的抽象
2.状态变更时,记录新数和旧数的差异
3.最后把差异更新到真正的DOM中
```



## 二.React介绍

```js
//React是一个用于构建用户界面的JS库(库是方法的集合,框架是有自己的语法规则和标签)

+ React 是一个用于构建用户界面（UI，对咱们前端来说，简单理解为：HTML 页面）的 JavaScript 库  
+ 如果从mvc的角度来看，React仅仅是视图层（V）的解决方案。也就是只负责视图的渲染，并非提供了完整了M和C的功能
+ react/react-dom/react-router/redux: 框架
+ React 起源于 Facebook 内部项目（News Feed，2011），后又用来架设 Instagram 的网站（2012），并于 2013 年 5 月开源[react介绍](https://baike.baidu.com/item/react/18077599?fr=aladdin)

+ React 是最流行的前端开发框架之一，其他：Vue、Angular 等等[框架对比](https://www.npmtrends.com/)
```



## 三.React特点

```js
//组件化开发
//声明式UI-----写出了的是什么,展示的就是什么
//学习一次,终生使用
```



## 四.函数式组件和类组件的区别

```js
//早期只有类组件可以声明状态,所以职责不一样
分为两种组件----容器组件和展示组件
容器组件---->负责业务逻辑,方便复用逻辑,不关心样式效果
展示组件---->只负责ui效果,不关心业务逻辑
//区别:让逻辑与表现分离

##早期类组件作为容器组件,函数组件作为展示组件
现在,函数组件可以两种都做

//推荐使用函数组件,为什么它性能更好?
1.因为函数组件可以直接调用,比如 handcan()即可,而类组件要实例化才行 const fn=new handcan()
2.类组件通过JSX转换为实例对象,性能耗费更多

//组件规则
1.组件名称首字母必须大写
2.必须返回一个html结构
3.如果不需要返回值就return null ,不能是undefined
4.React对大小写非常敏感,使用时大写字母开头
```



## 五.JSX语法

```js
### JSX简介 
`JSX`是`JavaScript XML`的简写，表示了在Javascript代码中写XML(HTML)格式的代码 ,是creatxxxx的语法糖 

优势：声明式语法更加直观，与HTML结构相同，降低学习成本，提高开发效率。

 **JSX是react的核心内容**

注意：*JSX 不是标准的 JS 语法，是 JS 的语法扩展。脚手架中内置的 [@babel/plugin-transform-react-jsx](@babel/plugin-transform-react-jsx) 包，用来解析该语法。*
```

# React 第二天

## 一.class的说明

```js
1.继承extends
//创建一个类
class Progammer {
  name = '程序员';
  writeCode() {
    console.log('写代码  ----->  ');
  }
}

// extends继承：相当于把父级的所有属性和方法，拷贝一份引用地址
// 好处：方便大量创建对象
class FrontEnd extends Progammer {
  // 原型对象上的方法，就是为了给后台共享方法
  sayHello() {
    console.log('this  ----->  ', this);
  }
  //this出问题的时候可以用这种
  writeCode = () => {};
}

//使用和调用
const fe = new FrontEnd();
fe.sayHello();
```



## 二.state

```js
1.state是React组件的状态,作用是声明数据,驱动视图
2.写法:state={}
3.state是独立作用域,不同组件之间不能相互调用
4. 访问变量，通过this.state.属性
5. this指向实例对象本身
```



## 三.箭头函数的演变

```js
//原来写法
()=>{ return alert(1) }

//简单写法----因为函数是从右向左执行的,所以可以把return省略,同时{}也可以省略
()=>alert(1)
```



## 四.React中的事件处理

```js
class App extends React.Component {
  // 1. 语法：使用on+事件名：驼峰式写法
  // 2. onClick = {函数} ， 不能是函数调用
  // 注意：
  //    1. onCLick = {} 必须有{}
  //    2. 绑定的一定要是函数，不能是调用(调用就是后面+了(),就成调用函数了)
  //    3. ❌onClick = "this.handleClick"
  render() {
    return (
      <div>
        <button
          // 2.1 少量代码
          onClick={() => alert('hello React')}
          // 2.2 多行代码
          onClick={this.handleClick}
       // 2.3 事件传值
          onClick={(e)=>this.handleClick(num1,num2,e)}---->传值,想传e要在前面+
        >点我</button>
      </div>
    );
  }

  handleClick(num1,num2,e) {----->接收参数
    alert('Hello React');
  }
}
```



### 四点五.不可变数据

```js
//修改state中是数组或者对象时要使用新值覆盖旧值的思想
最好使用解构运算符===> ...

 state = {
    list: [
      { id: 1, name: 'ooo' },
      { id: 2, name: 'iii' },
      { id: 3, name: 'jjj' },
    ],
  };

  hand = () => {
    let newlist = [...this.state.list, { id: 4, name: 'ssds' }];
    this.setState({ list: newlist });
  };

```



## 五.阻止跳转

```js
//React中获取事件对象和vue类型，形参代表事件对象
class App extends React.Component {
  render() {
    return (
      <div>
        <a href="www.baidu.com" onClick={(e) => e.preventDefault()}>
          点我</a>
        <a href="www.baidu.com" onClick={this.handleClick}>
          点我2</a>
      </div>
    );
  }

  handleClick(e) {  不传参数就是e
    e.preventDefault();------>表示阻止跳转
  }
}
```



六.this的指向

```js
class App extends React.Component {
  state = {
    count: 0,
  };

  // React自带结构体，this被源码处理过，this可以正常指向组件实例
  render() {
    return (
      <div>
        <button
          // 1. render方法中，this指向正确，使用箭头函数可以获得render中的this
          // 完整写法
          // onClick={() => {
          //   this.handleClickyyy();
          // }}
          // 👍推荐写法
          onClick={this.handleClickyyy}
        >
          点我打印count
        </button>

        <button onClick={this.handleClickxxx}>点我打印count</button>
      </div>
    );
  }

  
  //这种写法,要在事件中用箭头函数调用
  handleClickyyy() {
    console.log('this  ----->  ', this.state.count); 
  }

  // 非自带结构体，this指向undefined
  // 2. 使用实例方法，箭头函数会将this自动指向实例对象本身
  handleClickxxx = () => {
    console.log('this  ----->  ', this.state.count);
  };
}
```



## 七.setState

```js
class App extends React.Component {
  state = {
    count: 0,
    msg: '123',
  };
  render() {
    return (
      <div>
        我是APp
        <h1>{this.state.count}</h1>
        <button onClick={this.handleAdd}>点我加1</button>
      </div>
    );
  }

  handleAdd = () => {
    // ✅正确的写法
    this.setState({ count: this.state.count + 1 });
    // 不可变数据 - 不能直接直接对state的属性赋值
    // ❌错误的写法
    // this.state.count++;
    // this.state.count = this.state.count + 1;
    // this.setState({
    //   count: this.state.count++,
    // });
  };
}
```



## 八.受控组件

```js
//受控组件基本概念
+ React中将state中的数据与表单元素的value值绑定到了一起，`由state的值来控制表单元素的值`
+ 但是在react中，可变状态通常是保存在state中的，并且要求状态只能通过`setState`进行修改。

#3特点:声明state控制value和checked,onchange配合setState更新状态
    
//使用步骤
1. '在state中添加一个状态，作为表单元素的value值（控制表单元素的值）'
2. 给表单元素添加change事件，'设置state的值为表单元素的值（控制值的变化）'

## 常见的受控组件
+ 文本框、文本域、下拉框（操作value属性）
+ 复选框（操作checked属性）

##注意
reatc中的change事件等同于html中的input事件
react中的blur时间等同于html中的change事件
```



## 九.多表单元素的优化

```js
class App extends React.Component {
  state = {
    name: '',
    desc: '',
    city: '2',
    isSingle: false,
  };
//全部用handleChange处理事件
  handleChange = (e) => {
    //e.target打印的是一个标签,实际上是个对象,里面的属性都能用,比如name,type
      <input name="isSingle" type="checkbox">
    //e.target里面都有这些
    const { name, value, type, checked } = e.target;
    // 2. 💥使用对象的键名多态插值技术，处理键名=====>[name]是个变量
    this.setState({ [name]: type === 'checkbox' ? checked : value });
  };

  render() {
    // cs ：快捷键
    const { name, desc, city, isSingle } = this.state;
    return (
      <div>
        姓名：
        {/* 1. 设置name属性 */}
        {/* 💥 name的值，要和state的属性名保持一致 */}
        <input name="name" type="text" value={name} onChange={this.handleChange} />
        <br />
        描述：<textarea name="desc" value={desc} onChange={this.handleChange}></textarea>
        <br />
        城市：
        <select name="city" value={
        } onChange={this.handleChange}>
          <option value="1">北京</option>
          <option value="2">上海</option>
          <option value="3">广州</option>
          <option value="4">深圳</option>
        </select>
        <br />
        {/* 🔔 checkbox它的值，是由checked属性控制 */}
        是否单身：
        <input name="isSingle" type="checkbox" checked={isSingle} onChange={this.handleChange} />
      </div>
    );
  }
}
ReactDOM.render(<App></App>, document.getElementById('root'));
```



## 十.非受控组件

```js
//表单元素的value由DOM对象控制，不受state的控制
//表单元素，它的值由DOM控制，不使用state控制，称为非受控组件。
```



## 十一.Ref  

```js
class App extends React.Component {
  // 1. 创建ref,最大的价值,获取实例对象,调用实例对象的方法
  childRef = React.createRef();
  render() {
    return (
      <div>
        {/*  2. 绑定ref 给子组件*/}
        <Child ref={this.childRef}></Child>
        <button onClick={this.handleClick}>点我访问CHild的方法</button>
      </div>
    );
  }

  handleClick = () => {
    // 3. 通过ref对象.current 获取到组件实例或者DOM
    this.childRef.current.handleShowAlert();
    console.log('this.childRef.current.state.msg  ----->  ', this.childRef.current.state.msg);
  };
}

class Child extends React.Component {
  state = {
    msg: '123',
  };
  handleShowAlert() {
    alert('我是Child，我被触发了');
  }
  render() {
    return <div>Child组件</div>;
  }
}
```



# React 第三天

## 一.父传子

```js
class App extends React.Component {
 render() {
   return (
     <div>
       //跟vue的传值方法一样
       <Child name='李白' age='18'></Child>
       <Childmin name='李白' age='18'></Childmin>
     </div>
   )
 }
}
//函数组件,通过形参props接收数据
function Child(props){
    const { name,age } = props
   return <div>{name}----{age}</div>
}
//类组件,通过自带的props接收数据--->用this.props获得
class Childmin extends React.Component {
 render() {
    const { name,age } = this.props
   return (
     <div>
      <div>{name}----{age}</div>
     </div>
   )
 }
}
```



#### props传值的特点

> ```js
> prop可以给子组件传递任何形式的数据,包括对象,数组,函数,jsx
> props是只读的,无法改变,单向数据流
> 
> 
> class App extends React.Component {
>   state = {};
>   render() {
>     return (
>       <div>
> //把函数和jsx都传过去
>         <Child
>           fn={() => {
>             console.log(11111);
>           }}
>           jsx={<h1>我是jsx</h1>}
>         ></Child>
>       </div>
>     );
>   }
> }
> 
> function Child({ fn, jsx }) {
>   return (
>     <div>
>       <button onClick={fn}>点我调用fn</button>
>       <div>{jsx}</div>
>     </div>
>   );
> }
> ```



## 二.子传父

```js
利用回调函数，父组件提供回调，子组件调用，将要传递的数据作为回调函数的参数。

1. 父组件提供一个回调函数（用于接收数据）
2. 将该函数作为标签属性的值，传递给子组件
3. 子组件通过 props.语法找到函数，再 调用回调函数
4. 将子组件的数据作为参数传递给回调函数

//父组件
class App extends React.Component {
  state = {
    money: 0,
  };
//这函数要子组件传数据过来
  handchost=(num)=>{
    this.setState({ money: this.state.money + num });
  }
  
 render() {
   const {money}=this.state
   return (
     <div>
       <Husband money={money} handleMakeMoney={this.handleMakeMoney}></Husband>
       <Wife handchost={this.handchost}></Wife> -----与子组件绑定
     </div>
   )
 }
}

//子组件
class Wife extends Component {
  /* 花钱方法-----这个方法跟父组件无关,只是用来调用父组件传过来的数据 */
  handleCostMoney = () => {
    this.props.handchost(-8000) ----->父组件传过来的函数被子组件调用,同时把8000传给父组件
  };

  render() {
    return (
      <div style={{ padding: '10px', border: '10px solid #ccc' }}>
        <button onClick={this.handleCostMoney}>老婆开始花钱</button>---通过btn调用函数
      </div>
    );
  }
}
```



## 三.兄弟组件通讯

```js
//通过把状态提升到共同的父组件去,再通过子传父,父传子完成
```



## 四.context的使用

```js
//业务上几乎不用,类似于eventbus
缺点:导致嵌套非常复杂
优点:React自带,不用下包,体积小

//一般用于一键换肤和多语言

//第三方包的要求
1.体积小 2.react自带

//简单来说就是爷传孙
import React,{Component} from 'react';
//先创建
const {Provider,Consumer}=React.createContext()

export default class App extends Component {
 render() {
   return (
       //在父组件包裹要传的标签,通过value传值
       <Provider value={'hello Son'}>
             <div>父组件
       <Son></Son>
               </div>
       </Provider>
   )
 }
}
//子组件只作过渡处理,里面有孙组件
class Son extends Component{
    render() {
      return (
              <div>
              <h1>111</h1>
              <SonSon></SonSon>
              </div>
      )
    }
}

//用Consumer包裹孙组件,即可接收值,利用一个回调函数收,第一个参数就是value的值,可以返回一段jsx
class SonSon extends Component {
 render() {
   return (
       <Consumer>
         {(num)=>(//这里接收
             <div>
                 <h1>{num}</h1>
             </div>
         )}
     </Consumer>
   )
 }
}
```



# React 第四天

## 一.props指定默认值

```js
 Child.defaultProps = {
  title: 'xxxx',
};
```



## 二.props的children属性,模拟插槽

```js
children属性：表示该组件的子节点，只要组件有子节点，props就有该属性,指的是组件标签夹杂的内容
//children 属性与普通的props一样，值可以是任意值（文本、React元素、组件，甚至是函数）(就是标签之间的值)
 
 <Child >{(num)=><i>我是children{num}</i>}</Child>  ----->里面写的是函数
   ##Child组件标签间的"{xxxx}"   ,就是Children,可以是任何值,包括函数,jsx##
//子组件结构即可使用,
 const {children} =this.props
 <h1>{children(num)}</h1>------>可直接调用甚至传值
      
      
class App extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <Child>我就</Child>
        <ChildJU>{{ title: '静也是', content: '厂前民乐是' }}</ChildJU>
        <ChildZuo>
          {list => {
            return list.map(item => {
              return (
                <div key={item}>
                  <div>名字:{item.name}</div>
                  <div>年纪:{item.age}</div>
                </div>
              );
            });
          }}
        </ChildZuo>
      </div>
    );
  }
}

//普通插槽--一般有默认值
function Child({ children }) {
  const defaultmsg = '默认消息';
  return <div>{children ? children : defaultmsg}</div>;
}
//具名插槽-----输入数据自动生成已写好的结构
function ChildJU({ children }) {
  return (
    <div>
      <div>{children.title}</div>
      <hr />
      <div>{children.content}</div>
    </div>
  );
}
//作用域插槽,得到数据自己渲染结构
function ChildZuo({ children }) {
  const [list, setCount] = useState([
    { name: 'zx', age: 18 },
    { name: 'z00', age: 19 },
    { name: 'z01', age: 20 },
  ]);
  return <div>{children(list)}</div>;
}
```



## 三.props规则

```js
//porps接收的值,跟vue一样,有校验规则
import PropTypes from 'prop-types';

class App extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <Child
        //3种传值方式
          title="123"
          name={{ name: '里', age: 13 }}
          el={<div></div>}
        ></Child>
      </div>
    );
  }
}

function Child(props) {
  return <div>子组件</div>;
}

Child.propTypes = {
  //普通的限制,后面添加isRequired表示必传
  title: PropTypes.string.isRequired,
  //特殊结构规则,比如对象
  name: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
  }),
  //还可以是 jsx,react组件
  el: PropTypes.element,
};
```



## 四.类静态属性static

```js
class Person {
  // 原型方法
  sayhai(){
    console.log('hello  ----->  ', 'hello');
  }
  //实例方法
  sayhai1=()=>{
    console.log('hai  ----->  ', 'hai');
  }
  //静态属性方法---->不会出现在原型和实例上,只会通过点语法调用
  //静态属性指通过构造函数(类名)的方法直接访问,不需要实例
  static name:'zx'
  }
}

  //static相当于直接为他在后面添加了这个属性
  //Person.name='zx'

//console.log(Person.name)-----点语法访问
//const zx =new Person()----->实例访问

##一般作用
声明porps规则的时候可以把规则写在里面
class Child extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return <div>子组件</div>;
  }
}
```



## 五.react生命周期

### 1.挂载阶段

| 钩子 函数         | 触发时机                  | 作用                         |
| ----------------- | ------------------------- | ---------------------------- |
| constructor       | 创建组件时，最先执行      | 1. 初始化state  2. 创建Ref等 |
| render            | 每次组件渲染都会触发      | 渲染UI                       |
| componentDidMount | 组件挂载（完成DOM渲染）后 | 1. 发送网络请求   2.DOM操作  |

```js
// 周期---->挂载时时,更新时,卸载时
export default class App extends Component {
   constructor(){
     //表示继承父级所有的属性和方法
     super()
     console.log('创建了  ----->  ', '创建了');
     //声明状态和创建ref----基本不用了,都在渲染那里声明
    //  this.state={}
    //  this.inref=React.createRef()
   }
  
   //表示要渲染的内容
  render() {
    return (
      <div>App</div>
    )
  }
  
  //1.3对标vue中的mounted,表示挂载真实DOM之后
  //作用1.发请求 2.最先获取DOM
  componentDidMount() { 
    console.log('挂载了  ----->  ', '挂载了');
   }
}
```



### 2.更新阶段

> + 执行时机：1. setState()  2. 组件接收到新的props(改变)、 
> + 说明：以上三者任意一种变化，组件就会重新渲染

| 钩子函数           | 触发时机             | 作用                                                         |
| ------------------ | -------------------- | ------------------------------------------------------------ |
| render             | 每次组件渲染都会触发 | 渲染UI（与 挂载阶段 是同一个render）（**注意： 不能调用setState()** ） |
| componentDidUpdate | 数据更新-组件更新    | DOM操作，可以获取到更新后的DOM内容，**不要调用setState**     |

```js
  componentDidUpdate(){
        //获取更新后的数据,通常用来做缓存
        //对标vue中的updated更新后
        console.log('com触发了  ----->  ', 'com触发了');
    }

 render() { //获取更新后的值,从新获取页面 }

// 注意:
// 1.setState不能在更新钩子函数中调用(render)
// 2.React中的更新,指的是数据更新,而不是DOM更新,而vue是页面更新(DOM)
```



### 3.卸载阶段

```js
一般用于关闭定时器和监听器
```

| 钩子函数             | 触发时机                 | 作用                               |
| -------------------- | ------------------------ | ---------------------------------- |
| componentWillUnmount | 组件卸载（从页面中消失） | 执行清理工作（比如：清理定时器等） |



# React 第五天

## 一.组件更新机制

```js
1.只要我更新(被setState或props触发),我的子组件都会触发更新,而兄弟节点则不会
2.父组件重新渲染的时候,会让字组件也更新(重新渲染),兄弟组件不影响

##setState更新是异步的,输出的还是原来的值
 handclick = () => {
    this.setState({ count: this.state.count + 1 });
     假如count=0,运行这个函数页面的count就会=1,但下面的输出还是0,因为更新是异步的
    console.log('--------------', this.state.count);
  };
```

- 知识拓展----vue和react更新机制的不同

  vue是dom更新,只要template里面没有使用这个数据,数据改变就不会更新dom

  而react是数据更新,只要调了setState数据就更新,会导致dom全部重新渲染

  因此vue的更新效率是比react高的





## 二.setState的3种写法

```js
//第一种平时用的,如果修改的是同一个值会覆盖
this.setState({ num: this.state.num + 1 });

//第二种写法---->setState里面可以写回调函数------推荐(不会被覆盖)
    //setState((旧的状态)=>{})--->preState.xxx表示 xxx的旧值
    //setState((preState)=>{{return {count:preState.count+1} }})
    //这种写法是异步更新,但不会被覆盖也不会多次执行,避免了频繁操作DOM

this.setState(
 (preState) => { return {count: preState.count + 1} }
);
this.setState((preState) => { return {count: preState.count + 2} });


//第三种写法---第二个参数是数据更新后的回调函数,这样就可以写同步了
    //setState({键:改变的值},()=>{回调函数里可以直接用更新的值})--->会无限嵌套
 this.setState({count:this.state.count+1},()=>{
      document.title=this.state.count 
    })
```



## 三.性能优化

```js
//1.减轻state的设计,非驱动界面更新数据,不要把方法设置在state中
  ##比如 定时器id,ref,可以放在this 上--->比如this.trmId=xxxx

//2.避免不必要的重新渲染-----隐藏的钩子函数->shouldComponentUpdate--render之前执行
    shouldComponentUpdate(nextProps){ 
    // nextProps指的是更新后的props
    //只要判断前后值有无变化即可控制更新
     if(nextProps.count !==this.props.count){
       return true
     }
        //false表示不更新
        return false
    }


  //PureComponent---react自带的优化组件,来避免无效更新
  //PureComponent内置了钩子函数shouldComponentUpdate,会自己比较props
  class Footer extends React.PureComponent {
    render() {
        console.log('我是foot  ----->  ', '我是foot');
      return (
        <div>
          {this.props.count}
        </div>
      )
    }
   }

  //注意,不要PureComponent
  //1.class是早期写法,现在用函数式组件较多
  //2.内部会比较耗费性能,真正要再使用
```



## 四.react的浅比较(PureComponent)

![](D:\黑马\资料笔记\img\图片14.png)

```js
//基本类型--栈
栈里面有独立的内存空间,b怎么变都不影响a
const a =1 
const b=a  
对于值类型来说：比较两个值是否相同（直接赋值即可，没有坑）

//引入类型--堆
数据量大,保存的是指针,真正的数据在堆里
const list1=[]
const list2=list1

list2.push('2')----添加的数据
//但console.log(list1===list2)为true,因为指向了同一个指针
问题1.console.log([]===[])为false,因为不是一个指针

//PureComponent就是只比较内存地址
如果用list.push(xxx)就会是同一个内存地址,所以要用setStete创建一个新的内存地址

对于引用类型来说：只比较对象的引用（地址）是否相同
```



# React 第六天

## 一.路由配置

```js
//安装5.3的----npm i react-router-dom@5.3

-----//核心组件\\------
`react-router-dom`这个包提供了三个核心的组件
1.推荐用BrowserRouter或者HashRouter,通过as重命名为Router----这样就可以很好的切换history和hash
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
2.Router整个项目中只会用一次,相当于vue中的实例化路由
3.Router包住所有的代码

-----//其他组件\\------
1.NavLink也可以做跳转---会点击时加一个内部的样式(高亮)--也可以用activeClassName自定义高亮类名
2.exact表示精准匹配.在Route里面写
3.模糊匹配,URL中的路径,包含to或者path,并以to属性的路径开头
// friend/12--->模糊匹配
4.route组件
//规则:route相当于vue中的规则对象和挂载点二合一
//两种匹配任意路径 / 和不写path
5.Switch组件
//匹配到第一个匹配的组件，停止向下匹配

//-----例子
export default class App extends Component {
  render() {
    return (
      <div>
          <Router>
              <NavLink to="/home" activeClassName='xxx-xx-active'>点我跳到Home</NavLink>
              <NavLink to="/find" activeClassName='xxx-xx-active' >点我跳到Find</NavLink>
              <NavLink to="/friend" activeClassName='xxx-xx-active'>点我跳Friend</NavLink>
              {/* exact在有path的时候才生效 */}
              {/* Route默认是从上向下匹配,不会停 */}
              {/* + 通常，👍 我们会把`Route`包裹在一个`Switch`组件中。
                + 在`Switch`组件中，匹配到第一个匹配的组件，停止向下匹配。
                + `<Route>`不写`path`，配合`<Switch>` 实现404页面的提示 */}
            <Switch>  
               {/* 重定向--->匹配到 / */}
              {/* 一般重定向要配合exact使用,因为重定向只是 /---->/home ,但没有component,所以跳不过去,只会渲染一个null,所以要加一个exact配合使用 */}
                 <Redirect from="/" to='/home' exact ></Redirect>

             {/* 不写path就只会显示下面这个,因为已经显示了,不会向下执行 */}
              {/* <Route component={Home}></Route> */}
              <Route path="/home/" component={Home} exact></Route>
              {/* 想要组件显示,要么精准匹配,要么模糊匹配 */}
              <Route path="/find/:xxx" component={Find}></Route>
              {/* <Route path="/find" component={Find}></Route>
              <Route path="/find" component={Find}></Route> */}

              {/* friend作为嵌套路由,不能使用exact */}
              <Route path="/friend" component={Friend}></Route>

              {/* 404页面 */}
              {/* 1.不写path,一般用来设置404规则,写在最后 */}
              <Route component={NotFound}></Route>
              </Switch>
            
          </Router>
      </div>
    )
  }
}
```



### ##两种常用的路由##

```js
+ 两种常用 Router：`HashRouter` 和 `BrowserRouter`  
+ HashRouter：使用 URL 的哈希值实现（http://localhost:3000/#/first）
  - 原理：监听 window 的 `hashchange` 事件来实现的
+ （推荐）BrowserRouter：使用 H5 的 history API 实现（http://localhost:3000/first）
  - 原理：监听 window 的 `popstate` 事件来实现的
```



## 二.嵌套路由

```js
{/* friend作为嵌套路由,不能使用exact */}
   <Route path="/friend" component={Friend}></Route>

//   注意:只有Route设置过规则的组件,才有props.history
  function Friend() {
    return <div>
    <h1>我是Friend组件</h1>
    <button onClick={handclick}>按钮</button>
           {/* 直接在子组件里面写,子组件不需要Route包住和exact */}
           {/* 路径要+上父路径---父子组件可以同名 */}
            <Link to='/friend'>点我跳1</Link>
            <Link to='/friend/friend2'>点我跳2</Link>
            <Link to='/friend/friend3'>点我跳3</Link>

            <Switch>
                <Route path="/friend" component={Friend1}></Route>
                <Route path="/friend/friend2" component={Friend2}></Route>
                <Route path="/friend/friend3" component={Friend3}></Route>
            </Switch>
    </div>
  }
```



## 三.编程式导航

```js
//点击登录按钮，登录成功后，通过代码跳转到后台首页，如何实现？
+  场景：点击登录按钮，登录成功后，通过代码跳转到后台首页，如何实现？
+  编程式导航：通过 JS 代码来实现页面跳转
+  history 是 React 路由提供的，用于获取浏览器历史记录的相关信息。通过props.history获取。
+  push(path)：跳转到某个页面，参数 path 表示要跳转的路径
+  go(n)： 前进或后退到某个页面，参数 n 表示前进或后退页面数量（比如：-1 表示后退到上一页）

class Login extends Component {
    handleLogin = () => {
        // 跳转的路径
        this.props.history.push('/home')
         //表示后退或前进几个页面,正是前进
        props.history.go(-2)
    }
    render() {...省略其他代码}
}

注意：

1. 💥只有被<Route component={组件名}> 设置过路径的组件，props上才有history。
2. 💥`HashRoute` 与`BroswerRoute` 两种模式下都具有history
```



## 四.动态路由与路由参数获取

```js
<Route path="/users/:id" component={Users} />
//不能用exact
render(){
    console.log(this.props.match.params.id)
}
```



# React 第七天

## 一.了解Render Props的组件设计模式

```js
 {/* 实现了组件利用多次使用渲染不同的结构 */}
{/* 本质上是父传子,并把结构函数传过去,并用子组件的值渲染结构 */}


<Textpro render={(list)=>list.map((item) => <h2 key={item}>{item}</h2>)}/>
<Textpro render={(list) => list.map((item) => <h1 key={item}>{item}</h1>)} /> 

class Textpro extends React.Component {
  state = {
    list: [1, 2, 3],
  };
 render() {
   const {list}=this.state
   const {render}=this.props  //render是父组件传过来的
  //  console.log('render  ----->  ', render);
  return <div>{render(list)}</div>;
 }
}
```



## 二.使用route组件的render写法,实现路由权限鉴定 

```

```



# React 第八天

## 一.为什么要设计hooks

```js
1.class组件中的this指向问题,很多人不懂
2.组件复用逻辑
3.希望逻辑与页面分开
```



## 二.hooks的优势

```js
由于原来 React 中存在的问题，促使 React 需要一个更好的自带机制来实现组件状态逻辑复用。

1. Hooks 只能在函数组件中使用，避免了 class 组件的问题
2. 复用组件状态逻辑，而无需更改组件层次结构
3. 根据功能而不是基于生命周期方法强制进行代码分割
4. 抛开 React 赋予的概念来说，Hooks 就是一些普通的函数
5. 具有更好的 TS  类型推导
6. tree- - shaking  友 好，打包时去掉未引用的代码
7. 更好的压 缩
8.hooks可以封装逻辑,用于各种结构,比如小程序,web,app,多次使用
```



## 三.useState Hook

### 概述

问题：Hook 是什么? 一个 Hook 就是一个特殊的函数，让你在函数组件中获取状态等 React 特性
使用模式：函数组件 + Hooks
特点：从名称上看，Hook 都以 use 开头

```js
import { useState } from 'react'
//useState可以多次调用,可以渲染任意列席,接受新值覆盖旧值
const Count = () => {
  // 返回值是一个数组
  const [count, setCount] = useState(0)---->括号里面写数据
      setCount()--->括号里面写新数据或者完成事件
  return (
    <div>
      <h1>useState Hook -> {count}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  )
}
```



## 四.useState更新过程

函数组件使用 **useState** hook 后的执行过程，以及状态值的变化： 

- 组件第一次渲染：
  1. 从头开始执行该组件中的代码逻辑
  2. 调用 `useState(0)` 将传入的参数作为状态初始值，即：0
  3. 渲染组件，此时，获取到的状态 count 值为： 0

- 组件第二次渲染：
  1. 点击按钮，调用 `setCount(count + 1)` 修改状态，因为状态发生改变，所以，该组件会重新渲染
  2. 组件重新渲染时，会再次执行该组件中的代码逻辑----通过闭包缓存值
  3. 再次调用 `useState(0)`，此时 **React 内部会拿到最新的状态值而非初始值**，比如，该案例中最新的状态值为 1
  4. 再次渲染组件，此时，获取到的状态 count 值为：1

注意：**useState 的初始值(参数)只会在组件第一次渲染时生效**。 

也就是说，以后的每次渲染，useState 获取到都是最新的状态值。React 组件会记住每次最新的状态值!



## 五.hooks 的使用规则

注意：**React Hooks 只能直接出现在 函数组件 中，不能嵌套在 if/for/其他普通函数中**！

```js
1.if/for不行的原因:useState是一个函数调用,React内部要靠调用顺序分配值,一旦有函数不执行,值就会乱

2.1非普通函数------>只有这两个可以用useState
    1.大写开头的函数即组件函数
    2.use开头的驼峰函数,是属于hooks
```



## 六.useEffect Hook 

### side effect - 副作用

使用场景：当你想要在函数组件中，**处理副作用（side effect）时**，就要使用 **useEffect** Hook 了
作用：**处理函数组件中的副作用（side effect）**,react就是没有副作用的js库,只想通过状态渲染结构

> **没有副作用就是:固定输入,固定输出**
>
> 输入2+3,必得5

```js
 // useEffect
 // 作用：给函数式组件提供提供生命周期
  // 语法：useEffect(回调函数)
  //  回调函数会在挂载后，更新后等生命周期自动执行
//   使用场景：当你想要在函数组件中，处理副作用（side effect）时，就要使用 useEffect Hook 了,// 等价于componentDidMount，代表挂载后，只会执行一次

//第一种,第二个参数是[],场景,发请求,监听事件,开启定时器
  useEffect(() => {
    console.log('我被触发了  -----> 1111 ');
    document.title = count;
  },[]);

  // 2. 第二个参数：[依赖项]
  // 等价于componentDidMount和componentDidUpdate两个钩子函数二合一
  // 类似Vue中的watch，开启了深度监听,场景:缓存
  useEffect(() => {
    console.log('我被触发了  ----->  ');
    document.title = count;
  },[msg,count]);-----监听多个依赖项

//第三种是不写第二个参数,不推荐,会造成页面卡顿

//还有一个卸载时,回调函数里面return一个回调函数
useEffect(()=>{return ()=>{} },[])
```



## 七.useEffect发请求

> useEffect只能接收一个同步函数，不能接收异步函数作为回调

```js
useEffect(() => {
    // 3. 使用request发请求
     const loadData = async () => {
    const result = await request({ url: '/v1_0/channels' });
    console.log('result  ----->  ', result);
  };
  }, []);

  // ❌错误的写法, useEffect只能接收一个同步函数，不能接收异步函数作为回调
useEffect(async () => {  //里面不能直接写async await,要声明一个函数再用
 const result = await request({ url: '/v1_0/channels' });
console.log('result  ----->  ', result);
}, []);
```



# React 第九天

## 钩子函数补充：

1. **useHistory**
   1. 作用：获取history对象
   2. 优点：
      1. 任意的函数组件中，都可以拿到history。不需要通过Route组件的源码添加
      2. 有代码提示
   3. 区别：
      1. props.history 🔔类组件中使用
         1. :必须是Route组件设置过规则的
         2. 函数式组件和类组件都可以使用
      2. utils/history： 🔔 非组件中使用
         1. 没有什么限制，使用范围最广
      3. **useHistory 👍函数组件中使用**
         1. 只能在函数式组件中使用
2. **useParams**
   1. 作用：快速获取动态路由参数
3. useLocation
   1. 作用：快速获取location对象
4. useRouteMatchs
   1. 作用：获取match对象





## Antd的自定义表单控件：

参考文档：  https://ant.design/components/form-cn/#components-form-demo-customized-form-controls

1. 让控件的value，接收FormItme的控制
2. 让控件的onChange接收FormItem的控制
3. 剩余只写了name,age,后面的...res即可

```js
 export default function Channel(props) {
     1. Channel的props形参上定义了onChange 和 value
     2. value和onChange透传给Select组件
     3. 使用透传props，原封不动的将onChange和value 、id都扔给Select的props
    return (
      <Select style={{ width: 200 }} {...props}>
      </Select>
    );
  }
```



## useRef和useState的区别和使用场景

```js
useRef的作用:创建ref对象,它也是一个钩子函数
场景:1.获取DOM 2.获取组件实例 3.保存数据,如timeId(定时器)

useState作用:声明状态驱动视图
场景:渲染页面数据

区别:
//需要渲染到页面上的数据,使用useState保存
//不需要渲染到页面上的数据,使用useRef保存
```



## 特别提醒--剩余对象

```js
 //...resProps表示没解构的props组成的对象,...resParams表示函数剩余的参数
      const {path,component:Component,...resProps}=this.props
```



# React第十天---redux

## 一.基本使用

```js
安装:------>npm install redux
```

为了让**代码各部分职责清晰、明确**，Redux 代码被分为三个核心概念：action/reducer/store

- action -> reducer -> store
- **action**（动作）：描述要做的事情----本质：具有type字段的JS对象
- **reducer**（函数）：更新状态-----本质:纯函数,作用：计算状态的函数
- **store**（仓库）：整合 action 和 reducer
- 💥💥 唯一能够修改state的方法----dispatch



## 二.使用案例--原生

```js
//导入函数createStore
import {createStore } from 'redux'    // createStore作用:创建store仓库
//1.语法:createStore(reducer函数(state=初始值){ return state })，
// 2.redercuer函数，接受一个state作为初始值(默认值)，🔔🔔并且要返回state

// 注意：
// state是我们在Redux保存的数据变量,可以是任意值
// state形参的默认值，就是将来state的初始值
const store=createStore(function(state={count:0},action){    第一个形参是state,第二个是action
  --------了解state,有缓存(闭包)效果,一开始是默认值
          第一次改变值,但取得的是上一次保存的值,即默认值,第二次取是第一次改变时的值
  // 2. 在reducer函数中，计算新的值，并返回新值,必须要返回一个值作为state
  // 💥reudcer函数负责计算，类似vuex中mutations
  // 💥reudcer函数通过第二个参数，拿到action对象---dispatch()里面的就是action
  // 💥reducer要遵循不可变数据，通过新值覆盖旧值
  //一般使用switch---case语法,少数用if语法                                                    
   switch(type){
       csae'add':    //type的值
       return state
   }
    return state
})


--//reducer 必须是一个纯函数(固定输入固定输出)
- 原则：（一定要遵守！！！）
  - 不得改写参数
  - 不能调用 Date.now()或者 Math.random()等不纯的方法，因为每次会得到不一样的结果
  - 不能使用全局变量
- 纯函数主要的含义就是它不可以修改影响输入值
- 没有副作用，副作用指的是例如函数中一些异步调用或者会影响函数作用域之外的变量一类的操作


// 1. 使用dispatch发起一个修改值的动作
//   最简单的action------------------{ type： 'increment' } 
// 💥 Redux中修改state，必须通过dispatch调用
// 💥 dispatch必须接收一个action， action是一个必须具有type属性的对象

store.dispatch({type:'add'})    
store.dispatch({type:'del'})

//subscribe方法里面有回调函数,用于监听state值的变化,只要变了就执行
//语法：const 关闭监听的函数= store.subscribe(() => { 回调函数内，可以访问改变后的数据})

//同时subscribe有返回值,也是一个函数,直接调用即可停止监听
//开启监听要在 "修改值动作" 之前,否则无法监听之前的修改动作
const unFn=store.subscribe(()=>{
    // 这里可以获取到更新后的值
    console.log('store  ----->  ', store.getState().count);
})

//调用即可停止
unFn()

//通过store.getState() 获取state
console.log('store.getState()  ----->  ', store.getState());
```



## 三.使用案例------简易写法React-redux

```
安装依赖包 npm i react-redux
```

### **例子:**

**入口文件内的使用**

```js
//使用react-redux时要用Provider包裹<App>
import { Provider } from 'react-redux'
import store from './store'  ---记得引入store
//并且绑定store的值
<Provider store={store}><App /></Provider>
```



**store文件的搭建**

```js
//路径store/index.js
import {createStore } from 'redux'-----------引入
const initialState = {}------state的值提取出来

//构建reducer函数
function xxxxreducer(state = initialState, { type, payload }) {//结构action的数据type,payload
    switch (type) {
        case'updatCkecked':
        return xxxxx
        default:
            return state
    }
}

//创建store仓库
const store=createStore(xxxxreducer)-----写入reducer函数

//导出(将会在入口文件引入,之后可以在其他组件随时取用
export default store
```



**React-redux的两大钩子函数**

- #### **useSelector**------->用于获取状态值state--------const list=useSelector((state) => {return state.list })

- ### **useDispatch**-------->用于调用action --------const dispatch=useDispatch()

```js
//state里面有list值,获取list的值只会return这个值给创建的值就行
//useSelector既驱动视图,也管理数据
const list=useSelector((state) => {return state.list })
//创建之后可以用dispatch直接调用action
const dispatch=useDispatch()

//组件中调用action函数的用法
//delList方法在store中写好并导出
export const delList=(payload)=>{
    return {
        type:'delList',   action函数必有type,type作为识别的值
        payload
    }
 }

//通过dispatch调用action函数
onClick={()=>dispatch(delList(item.id))}

//具体事件在case--return里面做,大部分事件是修改值
case'updatCkecked':
        return xxxxx
```



# React第十一天---中间件

- 下包 npm i redux-logger----日志
- npm i redux-thunk----中间件
- npm i npm i redux-devtools-extension ------调试工具

> 1.入口函数----创建store------>  store/index.js
>
> ```js
> const store=createStore(
>   rootReducer,
>   // 2. 配置开发工具
>   // 工具> 应用 > 中间件
>   // composeWithDevTools(applyMiddleware(thunk, logger))
>   composeWithDevTools(applyMiddleware(thunk,logger))
>   )
> 
> export default store
> ```

> 2.合并中间件 ------store/reducer/index.js
>
> ```js
> import {combineReducers} from 'redux'
> import Todoreducer from './todo'
> 
> const rootReducer =combineReducers({
>     todo:Todoreducer,
> })
> 
> export default rootReducer;
> ```

> 3.常量管理action------store/action/actionType.js
>
> ```js
> // 3. 使用常量维护type的值，避免写错字type的字符串
> export const TODO_UPDATCKECKED = 'todo/updatCkecked';
> export const TODO_DELLIST = 'todo/delList';
> ```

> 4.action和reducer分各功能模块管理
>
> 创建---store/reducer/xxx.js     创建--store/action/xxx.js
>
> ```js
> //type的值用二级写法,用常量维护
> 'todo/updatCkecked';'todo/delList';
> ```
>
> 







# 项目方法全部

## token消失

- 报错方式是401---用户未认证

- 在响应拦截器可以得到数据

  ```js
  
  function (error) {
     //判断token缺失
      if(error.response.status===401){
     message.warning(error.response.data.message)
     //封装后的history可以直接引入使用
      history.push('/login')
      }   
      return Promise.reject(error);
    }
  ```

  

## 构建history组件

- 创建until/history.js组件

- 通过react-router-dom源码查找,里面有一个history的包

- 里面有BrowserHistory,history等等,BrowserHistory又等于router+history

- 所以可以把history分开来用,先导出createBrowserHistory方法

- ```js
  //导出createBrowserHistory方法
  import {createBrowserHistory} from 'history'
  //构建history
  const history=createBrowserHistory()
  //导出
  export default history
  
  //入口文件中导入创建的history组件
  import history from './utils/history'
  //把history绑定给Router就行
   <Router history={history}>
  ```

  

## 路由搭建

- 下包react-router-dom@5.3

```js
import { Router, Route, Switch } from 'react-router-dom';

//引入组件,这里用了懒加载
const Login = React.lazy(() => import('pages/Login'));
const Layout = React.lazy(() => import('pages/Layout'));

//通过Link组件 to='跳转路径'
//Router包住全部
//React.Suspense懒加载
//Switch包住组件
//Route被包住 path='路径' ,component={目标组件}
//还可以配置重定向,404和鉴权路由
<Router history={history}>
      <React.Suspense fallback={<div>...加载中</div>}>
       <Switch>
          <Route path="/login" component={Login}></Route>
           <AuthRoute path='/' component={Layout}></AuthRoute>
       </Switch>
       </React.Suspense>
</Router>
```



## 封装鉴权路由守卫

- 创建components/AuthRoute.js文件,配置

```js
//登录组件不用拦截,这里只要拦截layout组件
<Route path="/login" component={Login}></Route>

//鉴权路由类似导航守卫
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { hasToken } from 'utils/strorage'

export default class AuthRoute extends Component {
  render() {
      //从props接收传过来的值,...resParams表示函数剩余的参数
      //component:Component保证了组件是个大写
      const {path,component:Component,...resProps}=this.props
    return (
        {/* 使用route组件的render写法,实现路由权限鉴定 */}
        <Route path={path}
         render={(props)=>{  //记得把props+进去,否则没有方法调用
            // 如果有token才渲染
           if(hasToken()){
            return <Component {...props}/>   ##把pros方法都解构给组件
           }
             //没有token直接从定向到登录组件
           return <Redirect  to='/login'/>
         }}
         ></Route>
    )
  }
}

//使用组件
<AuthRoute path='/' component={Layout}></AuthRoute>   ---值都是传过去的,用于鉴权某个组件
```



## 上传组件

```js
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const props = {
    //accept自定义弹出的上传窗口,显示哪些文件类型
  accept:['.jpeg','.jpg','.png'],
    //文件类型
  name: 'file',
   //目标地址
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: `Bearer ${getToken()}`   +上token
  },
    //上传时的状态
  onChange(info) {
     // info.fileList-----是文件列表
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  },
};


//上传组件的样子
ReactDOM.render(
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>,
  mountNode,
);
```



## 中文化

```js
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import 'moment/locale/zh-cn';-----这是日期的中文化
 
 <ConfigProvider locale={zhCN}>
    <App />
</ConfigProvider>,
```





## React懒加载

- 作用:避免一次性加载所有的路由页面，而造成的首页白屏
- 本质:异步加载不同的路由

```js
// 语法:
1. 使用React.lazy去导入页面组件-----React.lazy(() => import('页面组件路径'))
2. React.Suspense组件包住Switch组件
3. React.Suspense设置fallback属性-----------fallback接收一个JSX，表示过渡动画

//项目中的--Login和Layout组件
const Login = React.lazy(() => import('pages/Login'));
const Layout = React.lazy(() => import('pages/Layout'));

//React.Suspense包住switch等路由组件
 <React.Suspense fallback={<div>...加载中</div>}>-----fallback接收jsx,可以写画面
 </React.Suspense>
```



## 配置绝对路径

- 创建jsconfig.json文件,与src同级

- ```js
  {
      "compilerOptions": {
        "baseUrl": "src"
      },
      "include": ["src"]
    }
  ```

- 重启项目