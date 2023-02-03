# VUE3基础第一天

## 一.vue3的优势

```js
1.更好的逻辑复用与代码组织
2.更好的类型推导,适配ts
3.数据响应式原理重新实现(es6proxy替代了es5Object.defineProperty)
```



## 二.vite

```
webpack的入口是一个js文件,先根据入口js文件,构建打包项目,再运行服务器
vite的入口文件是一个html文件,先启动服务器再运行,通过http请求源码

安装 npm create vite
安装 .vscode文件夹的插件
插件需要 禁用vetur(让vue2高亮),安装volar插件
```



## 三.简单配置vue3项目

App.vue

```js
<template>
  <div>1111</div>
</template>
```

main.ts

```js
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```



## 四.组合式api----compositionAPI

```js
VUE2是optionsAPI,优点是易于学习和使用,每个代码有明确位置
缺点是:像是的逻辑,不容易复用,在大项目中尤为明显,不好维护

组合式Api是基于逻辑功能组织代码的,一个功能api相关放到一起
即使项目大了也能快速定位到相关功能的api,大大提升了代码可读性和可维护性
//注意:vue3也可以写optionsApi
```



## 五.setup,defineComponent,ref,reactive函数的使用

```js
//后来一般都使用ref,不用reactive
<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>{{ obj }}</h2>
    <h3>{{ ress }}</h3>
    <button @click="change">点击我</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
// 使用ts就要引入defineComponent方法,并且包裹住数据
export default defineComponent({
  //  composition api的使用, 需要配置一个setup 函数
  // 1. setup 函数是一个新的组件选项, 作为组件中 compositionAPI 的起点
  // 2. 从生命周期角度来看, setup 会在 beforeCreate 钩子函数之前执行
  // 3. **setup 中不能使用 this, this 指向 undefined**
  // 4. 在模版中需要使用的数据和函数，需要在 `setup` return返回。
  setup() {
    //   定义数据,无需data
    let msg = '1213';
    //定义复杂的相应式数据-----reactive函数--底层(Proxy)
    const obj = reactive({
      reg: 'aaa',
      age: 18,
    });
    //定义简单的相应式数据---ref函数----复杂的数据也行
    // 作用: 对传入的数据（一般简单数据类型），包裹一层对象,  转换成响应式
    let ress = ref('sdsd');
    //定义函数,无需methods
    const change = () => {
      obj.age = obj.age + 1;
      //ref的value就可以用于修改数据
      ress.value = '82738';
    };
    return { msg, change, obj, ress };
  },
});
</script>
```



## 六.setup的语法糖---script setup

> ```js
> 1. 使用 `ts` 项目不需要再 `defineComponent` 包裹了。
> 2. 无需再 `return` 了， `template` 可直接使用，顶层的绑定会自动暴露给模板。
> 
> <script setup lang="ts">
> import { ref } from 'vue';
> const count = ref(0);
> </script>
> ```



## 七.vue3中的生命周期

|       **setup----常用**        |                   setup                   |
| :----------------------------: | :---------------------------------------: |
| onBeforeMount---组件挂载前执行 | onMount---是个回调函数,组件挂载完毕后执行 |
|         onBeforeUpdate         |            **onUpdate---常用**            |
|  onBeforeUnmount-----常用****  |                 onUnmount                 |



## 八.计算属性

```js
// 不带set的计算属性
const nextAge = computed(() => {
  return age.value + 1
})

// 带set的计算属性
const nextAge2 = computed({
  get() { //age.value变化时从新计算nextAge2
    return age.value + 2
  },
  set(val: number) { //nextAge2变化时重新计算age.value
    age.value = val - 2
  },
})
```



## 九.watch侦听器

```js
//watch(监听的数据,回调函数(包括新,旧数据),额外的配置)---侦听器,一共3个参数
watch([msg, count], (val, oldval) => {
  console.log('改变后的值', val);
});

//监听复杂数据---比如对象,要开启深度监听
watch(obj,(val) => {console.log(val);},
  {
    deep: true, //开启深度监听
    immediate: true, //立即监听并执行回调函数
  }
);

//只监听对象的某个值
watch(
  () => obj.value.age,   //第一个参数要用回调函数取出值
  (val) => {
    console.log('只监听age', val);
  }
);
```



## 十.组件通讯---父传子

> ### **子组件接收**

```js
<script setup lang="ts">
//设置类型
type Props = {
  car: String;
  money: Number;
};
// 子组件通过 `defineProps` 进行接收
const props =defineProps<Props>();
//用props接收返回值,在script中使用
</script>
```



> ### **父组件传值**

```js
<template>
  <div>
    <h1>我是父组件</h1>
   //引入后,直接用就行,传值跟vue2一样
    <Son :money="money" :car="car"></Son>
  </div>
</template>

<script setup lang="ts">
import Son from './components/Son.vue';
import { ref } from 'vue';
const car = ref('宝马');
const money = ref(1000);
</script>
```



## 十一.组件通讯---子传父

> ### **父组件**

```js
<template>
  <div>
    //@xiu--接收子组件的事件
    <Son @xiu="handAdd"></Son>
  </div>
</template>

<script setup lang="ts">
const money = ref(1000);
//触发事件并接收子组件传过来的num
const handAdd = (num: number) => {
  money.value = money.value + num;
};
</script>
```

> ### **子组件**

```js
<script setup lang="ts">
//通过defineEmits设定要做的事,emit接收
const emit = defineEmits(['xiu']);
const handClick = () => {
  //点击后触发给父传值,并在第二个形参写值
  emit('xiu', 1000);
};
</script>
```



## 十二.组件通讯---依赖注入

```js
//父组件注入---提供数据
provide('money', money);
provide('car', car);

//孙组件接收--获取数据
<script setup lang="ts">
import { inject, Ref } from 'vue';
//inject接收值,并且要写明类型,通过money推导
const money = inject<Ref<number>>('money');
const car = inject<Ref<string>>('car');
const handClick = () => {
//money的类型为Ref<number>或者undfinde
  if (money) {
    money.value += 100;
  }
};
</script>
```



# VUE3基础第二天

## 一.补充 - toRefs 函数

```js
//直接结构会失去响应式
const { name, age } =user.value
//要用toRefs 函数包着,使用的时候要用value
const { name, age } = toRefs(user.value)
console.log(name.value)
```



## 二.路由vue-router

main.ts

```js
import router from './router/index';

createApp(App).use(router).mount('#app');
```

router/index.ts---导出路由

```js
import {
  createRouter,
  createWebHashHistory,
} from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/home', component: () => import('../views/Home.vue') },
    { path: '/login', component: () => import('../views/Login.vue') },
  ],
});

export default router;
```

挂载点

```js
// 👍在 TS 项目开发中，可以导入路由组件类型 RouterLink 和 RouterView 增强类型检查
// 不导入的话 router-link 和 router-view 为 any (相当于JS开发)
import { RouterLink, RouterView } from 'vue-router'

  <router-view />
```



## 三.使用route和router跳转

```js
<script setup lang="ts">
//使用useRoute, useRouter 获取信息和跳转
import { useRoute, useRouter } from 'vue-router';
//获取信息---路由信息
const route = useRoute();
console.log('route  ----->  ', route);
console.log('本路径', route.path);
console.log('完整路由信息', route.fullPath);

//跳转----路由器
const router = useRouter();
const loginbtn = () => {
  //跳转方式
  router.push('/login');
};
</script>

<template>
  <div>
    <h1>Home</h1>
    <button @click="loginbtn">点我跳转</button>
    <button @click="router.push('/login')">点我跳转</button> ----直接跳转
  </div>
</template>
```



## 四.vue3的全局状态管理----Pinia

> ```js
> 安转---npm i pinia
> ```

store/counter.ts

```js
//导入defineStore
import { defineStore } from 'pinia';
//通过defineStore创建useCountStore-----defineStore(唯一标识符,三大核心概念)
const useCountStore = defineStore('counter', {
  state: () => {
    return {
      count: 10,
    };
  },
  getters: {  //getter需要添加类型断言
    double(): number {
      return this.count * 2;
    },
  },
  actions: {
    //同步函数添加
    add() {
      this.count++;
    },
    //异步函数添加
    addAsync() {
      setTimeout(() => {
        this.count++;
      }, 2000);
    },
  },
});
//导出
export default useCountStore;
```

mian.ts

```js
import { createPinia } from 'pinia';
const pinia = createPinia();
createApp(App).use(pinia)..mount('#app');
```

实际使用

```js
<script setup lang="ts">
//引入store
import useCountStore from './store/counter';
//获取这个返回值,之后用点语法即可使用
const counter = useCountStore();
</script>

<template>
  <div>
    <h1>sdsd</h1>
    <h1>{{ counter }}</h1>
    <h1>我的值:{{ counter.count }}</h1>
    <h1>我的2值:{{ counter.double }}</h1>
    <button @click="counter.add">同步添加</button>
    <button @click="counter.addAsync">异步添加</button>
    <router-view />
  </div>
</template>
```



## 五.storeToRefs 的使用--优化pinia

```js
import { storeToRefs } from 'pinia';
//用storeToRefs包住才可以解构
const { count } = storeToRefs(counter);
```



## 六.模块化管理Pinia

```js
import useUserStore from './modules/user';
import useCounterStore from './modules/counter';

// 统一导出 useStore 方法
export default function useStore() {
  return {
    user: useUserStore(),
    counter: useCounterStore(),
  };
}

//组件中使用
import useStore from './store/index.ts';
import { storeToRefs } from 'pinia';
const { counter } = useStore();   //---解构出数据
const { count, double } = storeToRefs(counter);  //方法的话被解构,还是用点语法
```



## 七.数据持久化

```js
两种方法---watch和$subscribe
//$subscribe的回调函数直接订阅todo的list,再存储
const { todos } = useStore()
todo.$subscribe(() => {
  localStorage.setItem('todos', JSON.stringify(todos.list))
})

//wacth监听list的变化,再存储
watch(
   list,
 () => {
    localStorage.setItem('ToDo', JSON.stringify(list.value));
   },
  { deep: true }
 );
```

