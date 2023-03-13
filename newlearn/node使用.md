### 服务器和接口

```js
const fs =require('fs')

fs.readFile(加上Sync就是同步) ('相对路径/绝对路径','utf-8',(err,res)=>{
    异步才有回调函数
})
fs.appendFile('相对路径/绝对路径','添加内容',callback())
fs.writeFile('相对路径/绝对路径','写入内容',callback())



const path=require('path') ---路径
path.join(a,b)-----拼接路径
path.extname(xxxx)---获取后缀  如 .js

const http=require('http') --创建服务器


//创建服务器
const app=http.createServer((req,res)=>{
    req.url----接口部分地址
    req.method----请求方式 (get/post/put/delete)
  
    //查询实现--get
    let query=new URLSearchParams(要解析的参数)
    query.get(参数名)
    
    //post实现
    let result=''
    req.on('data',(chunk)=>{
        每接收段参数都触发一次,格式是buffer
        result+=chunk
    })
    
    req.on('end',()=>{
        只执行一次,当post参数接收完成时触发
    })
    

    res.setHeader('"content-type"','类型')----设置返回类型
     res.statusCode=404 -----设置状态码
     res.end()----返回值,必须有,可以为空

})

app.listen('端口号',()=>{ 回调函数})
```



### npm使用

```js
初始化  npm init --yes
查看全局包 npm list -g --depth 0
```



全局包权限问题

![](D:\gitStore\noteBook\newlearn\img\Snipaste_2023-03-01_00-15-17.png)



### nodemon使用 -----替换node命令

```
作用---->nodemon替换node命令,实时监听代码的变化执行
全局下载 npm i -g nodemon 
```



### 切换地址 nrm

```
全局安装  npm i nrm -g
nrm ls 可以查看所有源   正常情况下使用的源前面会有个*
nrm use xxx(源的名称)  即可切换
```



### 开发依赖生产依赖

```js
//依赖包分为开发依赖包和生产依赖包
区别:
1、下载后的存放位置不同
开发依赖存到package.json文件中 devDependencies对象中
生产依赖存放到 package.json文件中 dependencies对象 中

2、下载命令后缀不一样
开发依赖:npm i 包名 --save-dev(简写-D)
生产依赖:npm i 包名 --save(简写-S，也可以省略)

开发依赖，只在开发环境中有用   ---比如less只需要开发依赖,因为生产支持css
生产依赖，开发环境或者生产环境都有到  ---比如日期插件都要用到

//注意 npm5及以上版本能把安装包自动保存到Dependencies中,npm5以下才要手动添加 --save
```



### express框架使用

```js
先安装好node--->npm init --yes
安装  npm i express

const express = require('express')
const fs = require('fs')
const app = express()

app.get('/add', (req, res) => {
  //req.query url带参数会自动解析
  let query = req.query
  console.log(query)
  res.send({ query })
})

app.use(express.urlencoded())  //x-www-form-urlencoded中间件
app.use(express.json())    //json中间件

app.post('/edit', (req, res) => {
  //获取请求体参数,但要配合内置中间件
  res.set('Access-Control-Allow-Origin', '*') //处理跨域
  fs.readFile('./data.json', 'utf-8', (err, data) => {
    if (err) {
      res.send('读取失败')
      return
    }
    let result = JSON.parse(data)
    result.push(req.body)
    fs.writeFile('./data.json', JSON.stringify(result), err => {
      if (err) {
        res.send('写入失败')
        return
      }
      res.send('ok')
    })
  })
})

app.get('/del/:name/:age', (req, res) => {
  //路径后面的/:name 表示路由的动态参数
  //req.parmas获取动态参数,为对象
  //必须一一对应
  res.send({ data: req.params })
})

app.listen('8090', () => {
  console.log('服务器启动了')
})

```



### 静态资源托管

```js
//同目录下
app.use('路径',express.static('public'))
```



### 上传

```js
//安装中间件 npm i multer
const express = require('express')
const multer = require('multer')

//设置各个路径
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads')
  },
  filename: function (req, file, callback) {
    console.log(file)
    callback(null, Date.now() + '.png')
  },
})

const upload = multer({ storage })

//直击设置路径
const upload = multer({ dest: 'uploads' }) --保存的位置


const app = express()

app.post('/api/profile', upload.single('avatar'), function (req, res, next) {
  // req.file 是 `avatar` 文件的信息
  // req.body 将具有文本域数据，如果存在的话
  res.send({ msg: '上传成功' })
})

app.listen('8390', () => {
  console.log('服务器启动了')
})

```



### 路由中间件,用于路由分类

**index.js**

```js
const express = require('express')

const app = express()

//引入路由
const userRouter = require('./userRouter')
//设置路由后缀
app.use('/api/user', userRouter)

app.listen('8790', () => {
  console.log('服务器启动了')
})
```



**userRouter**---编写用户路由

```js
const express = require('express')
const Router = express.Router()

const app = express()

//单独路由
Router.get('/info', (req, res) => {
  let query = req.query
  res.send({ query })
  // res.send('ok')
})

app.use(Router)

module.exports = Router
```



### 自定义中间件

```js
//可以在你要做的事之前使用
app.use((req,res,next)=>{
    let token='12323'
        if(token){
          next()
   }else{
          res.send({msg:'请先登录'})
    }
 })


//写法二  加一个路径,只有这个接口路径可以用这个中间件
app.use("/list", (req, res, next) => {
    let token = ""
    if (token) {
        next()
    }
    else { res.send("接口二的失败") }
})

//接上面的写法二,但同时这是中间件写法3,后面的回调函数是中间件
app.get("/list", (req, res) => {
    res.send("接口2")
})

//写法四 同一个中间件,req,res是通用的 中间1,中间件2
app.get("test",(req,res,next)=>{
     console.log("处理第一个中间件");
     next()
},(req,res,next)=>{
    console.log("处理第二个中间件");
    //写到send就不需要next了
    res.send("ok")
})
```



### 错误中间件

用于统一捕获处理过程中的异常,错误中间件写在最后面,listen之前.多了一个err参数

```js
app.use("/",(err,req,res,next)=>{
     err.stack
    res.status(500).send('xxxx')
})
```



### sql语句

```sql
select id,userName from userinfo where age=12

--排序
select * from userinfo  order by age desc
select * from userinfo  order by age asc
select cname from userinfo ORDER BY '后羿' desc

--指定数量
select * from userinfo linmt 0,1 (开始索引,条数)

--统计
select count(id) from userinfo

--插入多条
insert into userinfo (userName,sex,age) values('你好','女','13'),('你好','男','13')

--更新
update userinfo set userName='祝铭',sex='男' where id=3
update userinfo set age=age+1

--删除
delete from userinfo where id=3 

--逻辑 or 成立一个就行 和and 要都成立
delete from userinfo where sex='女' and age>16
delete from userinfo where sex='女' or age>16
```



### 封装mysql

```js
function querySql(sql, callback) {
  const mysql = require('mysql')

  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'zmhsql',
  })

  connection.connect()

  connection.query(sql, callback)

  connection.end()
}

module.exports = querySql
```

