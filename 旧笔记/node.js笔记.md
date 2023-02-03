



# node.js第一天

node.js是一个能运行js的环境 ,可以理解为

Node.js是javascript的后端运行环境

浏览器是js前端运行环境

```
语法:在终端中输入 node .\文件   例子:node .\day01.js
```

**命令**

| node 空格 某个js文件         // 调用 node 程序，运行某个js文件 |      |
| ------------------------------------------------------------ | ---- |
| clear  或者  cls            // 清空界面                      |      |
| ls/list/dir                      // 查看列表(list)           |      |
| cd 目录名                   // 进入到目录中去                |      |
| cd ..                      // 返回上一级目录                 |      |
| cd \									   // 直接回到根目录                     Ctrl+C                     // 停止 Node 程序 |      |
| 输入部分文件名后按下 Tab 键  // 补全文件名 或 目录名， 多次tab会进行切换 |      |
| ↑ ↓ 上下箭头                // 切换历史输入                  |      |



**引入node模块的方法**

```
语法:  const 变量名(自定义)=require("模块名")
```

核心语法fs



### **读取文件的写法:readFile方法**

```js
//异步写法
//有两个参数(err, data)

//作用于文本
const reb = require("fs")
//utf-8可以保留原来的显示形式
reb.readFile("./w文本信息.txt", "utf-8", function (err, data) {
    console.log(err, data);
})

//作用于图片,不用＋utf-8
reb.readFile("./image/0034uNXCgx07AVaYdcsw[00_00_09][20200213-205810].png",function(err,data){
    console.log(err,data);
})


//同步写法
const fs = require("fs")
let fs = fs.readFileSync("./w文本信息.txt", "utf-8")
console.log(res);
```



### **异步读取成功失败判断**

```js
reb.readFile("./w文本信息.txt", "utf-8", function (err, data) {
//成功的话err值为null,即false,所以判断是是true即为读取失败
    if(err){
        console.log("失败了",err);
    }
    console.log(err, data);
})
```



### **同步要通过 try catch语法读取报错信息**

```js
const fs = require("fs")
try {
    let res = fs.readFileSync('./文本信息.txt')
    console.log(res);
} 
//发生错误,下面就会发送错误信息
catch (error) {
    console.log("报错了:", error);
}
```



### 覆盖文件的写法writeFile

```js
//异步写入文件方法
const fs=require('fs')
//fs.writeFile('文件路径',"写入的内容",回调函数)
//写入的内容会覆盖原文件
//文件路径不存在,会自动创建新路径,只能创建文件,不能创建文件夹
fs.writeFile("./w文本信息.txt","666",function(err){
    if(err){
        console.log("错误",err);
        return
    }
    console.log("写入成功");
})

//同步写入
try {
    const res = fs.writeFileSync("./w文本信息.txt", "千山鸟飞绝")
    console.log(res);
} catch (error) {
    console.log("错误", error)
}
```



### **追加进文件的方法**appendFile

```js
//异步方式
const fs=require("fs")
//  "\n"表示换行
fs.appendFile("./w文本信息.txt","\n 打死你",function(){
    if(err){
        console.log("错误",err)
        return;
    }
    console.log("写入成功");
})

//同步方式
try {
    const res = fs.appendFileSync("./w文本信息.txt", "千山鸟飞绝")
    console.log(res);
} catch (error) {
    console.log("错误", error)
}

```

**提醒:一般小文件用同步,大文件用异步;同步没有回调函数,异步有回调函数**



终端中如何写node代码？

 \* 答：在终端中输入node命令，然后回车即可，之后就可以在终端中写js代码了

 \* 如何关闭终端中的写代码功能呢？

 \* 答：可以连续按两次 ctrl + c



### file实践

```js
const fs = require('fs')

let res = fs.readFileSync("./data1.json", "utf-8")
//res是个json字符串,需要转化为普通字符串
let arr = JSON.parse(res)
arr.push({ name: '后裔', skinname: '精灵王' })

//JSON.stringify(arr)再把复杂数据类型arr转化为JSON字符串
fs.writeFile("./data1.json", JSON.stringify(arr), (err) => {
    if (err) {
        console.log("10失败", err);
    }
    console.log("12成功");
})

fs.readFile("./data1.json", "utf-8", (err, data) => {
    if (err) {
        console.log("17失败", err);
        return
    }
    console.log("20成功", data);
    let arr = JSON.parse(data)
    arr.push({ name: '程咬金', skinname: '功夫厨神' })

    fs.writeFile("./data1.json", JSON.stringify(arr), (err) => {
        if (err) {
            console.log("10失败", err);
        }
        console.log("30成功");
    })
})


//复制图片
let res=fs.readFileSync("./image/3.png")

fs.writeFile("./image/4.png", res, (err) => {
    if (err) {
        console.log("1失败",err);
        return
    }
    console.log("1成功");
})
```



### path和__dirname的使用

```js
 // 注意：__dirname他的值是相对于代码的所在目录获取的绝对路径(值不变),可以用path拼接上文件路径
 const path=require('path')
 //我们常用的path中的方法，path.join("路径一","路径二")
 console.log(21,__dirname);
 let res = fs.readFileSync(path.join(__dirname,"./data/01.txt"))
 console.log(18,res);
```



**总结同步和异步**

```
同步方法一般声明变量,同时+Sync,没有回调函数

异步方式不用声明变量,有回调函数,函数有err这个参数,同时read函数有两个参数,分别是err和data
```



# node.js第二天

### 使用HTTP模块创建服务器

```js
//1.取引入http模块
const http = require("http")

//2.创建服务器
// let server=http.creatserver(回调函数function(req,res){} 有两个参数)
//当地址运行时,会执行creatserver的回调函数
const server = http.createServer(function (req, res) {
    //req(request)请求报文
    //res(response)响应报文
    console.log(req.url)  //获取路径req.url,即原来地址的后面部分

    res.end("ok")
})

//监听服务器运行并开启端口号
// server.listen("端口号",回调函数)
server.listen("8001", () => {
    console.log("http://127.0.0.1:8001");
    //端口号自己取,值为0~6w多
})
```

报错:address alreday in use::8001   指8001端口已被占用

解决方式:①把占用端口的程序关掉②把自己的端口改掉



### HTTP设置响应头

```js
const http = require("http")

let server = http.createServer(function (req, res) {
    
    //设置响应头,即数据返回类型和格式
    //res.setHeader("写死","数据类型;数据格式")保证数据格式
    res.setHeader("content-type", "text/html;charset=utf-8")
    if (req.url == "/admin/user/info") {
        //设置对象
        let obj = {
            nickname: "李白",
            userPic: "http://127.0.0.1:80001/123.png"
        }
        //end方法中只能填字符串或buffer对象,所以要转类型
        res.end(JSON.stringify(obj))
    }
    else{  
        //设置失败请求状态码
        res.statusCode = 404
        //不论失败与否,都要加end,否则数据不会返回
        res.end("{msg:'失败',code:'404'}")}
})

server.listen("8001", () => {
    console.log("http://127.0.0.1:8001/admin/user/info");
})
```



### 查询IP地址

```
ipconfig /all
```



### 通过服务器访问html页面

```js
//引入模块
const http = require("http")
const fs = require("fs")

const sever = http.createServer(function (req, res) {
    
    //访问不同文件,类型要变,比如图片就是image/png,文字是text/html,不要中文
    res.setHeader("content-type", "text/html;charst=utf-8")
   
    if (req.url == "/index.html") {
        let reb = fs.readFileSync("./html文件/index.html")
        res.end(reb)
    }
    else if (req.url == "/index.css") {
        let reb = fs.readFileSync("./html文件/index.css")
        res.end(reb)
    }
    else { res.end("{msg:'读取文件失败',code:'404'}") }

    res.end("ok")
})

sever.listen("8005", () => {
    console.log("成功访问:http://127.0.0.1:8005")
})
```



### 封装node.js请求

```
path.extname()可以拿到文件的后缀名   
```

```js
const http = require("http")
const fs = require("fs")
const path = require("path")

//设置一个后缀名数组,让对应的后缀名的值为相应的类型
let extType = {
    ".html": "text/html;charset=utf8",
    ".css": "text/css;charset=utf8",
    ".js": "application/javascript",
    ".jpg": "image/jpg"
}

const sever = http.createServer(function (req, res) {
    //读取地址为写死地址+req.url(原来地址后半部分)
    let baseurl = "./public" + req.url
    //req.url即为所需文件的地址,path.extname(req.url)能拿到其后缀名,再通过extType对象赋值
    res.setHeader("content-type", extType[path.extname(req.url)])
    let reb = fs.readFileSync(baseurl)
    res.end(reb)
})
sever.listen("8007", () => {
    console.log("成功访问:http://127.0.0.1:8007");
})

// res.statusCode = 404
// res.end("{msg:'读取失败',code:'404'}")
```



### HTTP设置接口get实例

```tex
req.method可以查询当前接口是post还是get,查到的值是大写!
```

```js
const http = require("http")

const sever = http.createServer(function (req, res) {
    //通过req.method判断是否是get请求
    if (req.method == "GET" && req.url == "/api/getBookList") {
        let arr = [
            { name: "三国演义", author: "罗贯中" },
            { name: "西游记", author: "吴承恩" }
        ]
        res.setHeader("content-type", "application/json;charset=utf8")
        res.end(JSON.stringify(arr))
    } else {
        res.setHeader("content-type", "text/html;charset=utf8")
        res.end("{msg:'失败',code:'400'}")
    }

})

sever.listen("8008", () => {
    console.log("成功进入:http://127.0.0.1:8008");
})
```



### HTTP设置get接口实例,有参数

```
 URLSearchParams：()是一个构造函数(需要new)，用来将查询字符串转换为对象
 例子:let query= URLSearchParams：(xxx)
```

```js
 // 需求：实现get请求，请求地址是/api/getBookList，请求参数是bookname，搜索书籍接口
const http = require("http");
const app = http.createServer((req, res) => {
    //  获取查询参数
    // req.url包含了查询参数
    //分割req.url,返回一个数组arrUrl,arrUrl[0]为req.url,arrUrl[1]为参数
    let arrUrl = req.url.split("?");
    if (req.method == "GET" && arrUrl[0] === "/api/getBookList") {
        // 请求地址和方式正确，返回数据给前端
        let arr = [
            {
                name: "红楼梦",
                author: "曹雪芹"
            }, {
                name: "三国演义",
                author: "罗贯中"
            }
        ]
        // 把arrUrl[1]这个查询字符串转化为对象
         //得到的query为{"bookname"=>"红楼梦"},类似于键值对
        let query = new URLSearchParams(arrUrl[1]);
        //get是URLSearchParams里面的一种方法,通过URLSearchParams转换的值可以使用
        //query.get("bookname")可以拿到query对象bookname键的值"红楼梦"
        //即str="红楼梦"
        let str = query.get("bookname");
        //判断是否与arr里的值一致,一致的话返回
        let newArr = arr.filter(item => {
            return item.name == str;
        })
        //最后输出newArr
        res.setHeader("content-type", "application/json;charset=utf8")
        res.end(JSON.stringify(newArr))
    } else {
        res.statusCode = 404;
        res.setHeader("content-type", "text/html;charset=utf8");
        res.end("{msg: '访问地址获取方式错误',code: 404}")
    }

})

app.listen("3000", () => {
    console.log("服务器启动成功：http://localhost:3000");
})
```



### 旧知识

```
切割:let arr= req.url.split("?")   
以?为分界线,分割req.url,返回一个数组[req.url,参数],所以req.url=arr[0]
```



# node.js第三天

### post请求:接收请求数据

```js
const http = require("http")
const fs = require("fs")

let sever = http.createServer((req, res) => {
    res.setHeader("content-type", "text/html;charset=utf8")
    //先声明一个空值作为结果接收参数
    let result = ""
    //使用req的data语法,传入参数chunk作为中间值,添加给结果
    req.on("data", (chunk) => {
        result += chunk
    })
   
    //使用req的end语法,得到结果result,再处理resul
    req.on("end", () => {
        console.log("数据接收完成了：", result);
        //使用URLScarchParams把result转换成对象
        let qurey = new URLSearchParams(result)
        //通过URLSearchParams的get语法得到需要的值
        let obj = {
            name: qurey.get("name"),
            skinname: qurey.get("skinname")
        }
       
        //取得json里的空数组
        let reb = fs.readFileSync("./data.json")
        
        let arr = JSON.parse(reb)
        arr.push(obj)

        fs.writeFile("./data.json", JSON.stringify(arr), (err) => {
            if (err) {
                console.log("写入失败", err);
                return
            }
            console.log("写入成功");

        })
    })
    res.end("POST接口")
})

sever.listen("8000", () => {
    console.log("成功接收:http://127.0.0.1:8000");
})
```



### 创建自定义模块

能使用require导入的js文件就是模块,理论上写得每一个js文件都可以称为一个模块

```js
//导入
const tool=require("路径")

//导出
//编写模块完成后 要用 nodes.js\的module.exports来导出
function add(a,b){return a+b}
//module.exports={键:值},引入模块的js通过键使用
module.exports={add:add}
```



### npm的使用

npm是第三方模块包的下载工具和管理工具,作用:用于下载第三方模块包

**使用流程**

①创建文件夹,里面不能有中文和特殊字符(初始化后可改为中文)

②执行npm init --yes,初始化的\得到package.json文件,该文件用于记录

同时还多了node_modules(记录第三方包的源码)文件,package-lock(记录了下载的名字版本等信息,可删除)文件

③下载语法在网站上查找,一般用npm install语法下载,js文件可以引用

④通过require使用第三方包



**区分本地包和全局包**

```tex
1. 本地安装（或者叫局部安装)：
   包安装在当前项目的根目录下（与package.json同级）的node_modules中
    命令：npm install 包名

2. 全局安装:
   包被安装到了全局的node_modules中
   命令：npm install -g 包名 或者  npm install 包名 -g

3. 查看全局的node_modules路径：
   npm root -g // 查看全局包的安装目录
   npm list -g --depth 0 //查看全局安装过的包
   
   
   一个经验法则：
- 要用到该包的命令执行任务的就需要全局安装
- 要通过require引入使用的就需要本地安装

```



**安装的全局包**

```
nodemon,可以帮我们自动重启node命令     查版本号:nodemon -v
nrm,别人开发的第三包都在外国服务器上,速度慢,帮我们切换到淘宝    
查版本号nrm-V      查源地址nrm ls    切换到淘宝 nrm use taobao
```



**第三方包的卸载**

```
本地包卸载：
进入到你想要卸载的包所在的文件夹，到package.json这一层即可
打开cmd小黑窗
在小黑窗中执行 npm uninstall 包名   简写： npm un 包名
npm un 包名1  包名2

全局包卸载:
任意地方打开小黑窗
npm uninstall 包名 -g 或者 npm un 包名 -g
```



### 发布,更新npm

```
场景：将本地开发的名为calc65的包发布到npmjs网站上
前置操作：请先去npmjs.com上注册一个用户，并通过邮箱验证
操作步骤：
项目初始化: 创建文件夹 calc65，小黑窗中输入：npm init --yes 
      注意：文件夹名称不能是中文或带有特殊字符，
              通过 npm view calc65 检查一下npmjs上如果已经有calc65这个包了，则换一个名字
在calc65中创建一个calc.js文件并定义加法函数并导出(module.exports={add})
切换当前npm源到npmjs上:  nrm use npm  
连接npm： npm adduser （输入npmjs.com上注册时的用户名，密码，邮箱）
把包上传到npm：  npm publish 
上传成功验证：在小黑窗能看到 +calc65@1.0.0 表示成功
通过 npm install calc65测试下载
```



# node.js第四天

### express框架的使用

```js
初始化npm init -y
安装框架 npm install express
创建js文件

//引入框架
const express = require("express")
//创建服务器
const sever = express()
//设置回调,相应数据给前端
sever.get('/', (req, res) => {
    res.send("你好")
})
//监听端口
sever.listen("8080")
```



### get定义接口,查询参数

```js
const express = require('express')

const app = express()
//定义getHero接口
//可以传动态参数"/getHero/:name/:age"
app.get("/getHero", (req, res) => {
    //req.query可以查询参数 ?heroname=妲己 
    console.log(req.query);
    //send可以传字符串,对象,数字
    res.send({
        sttus: "ok",
        //可以设置为动态参数req.params
        //data:req.params
    //动态参数例子:http://127.0.0.1:8080/getHero/鲁班/18
        data: req.query
    })
})

app.listen("8080", () => {
    console.log("开启成功:http://127.0.0.1:8080/getHero");
})
```



### 请求跨域

```
为什么会跨域?
就是因为浏览器规定了一个同源策略.这个策略规定了不同源的地址是不能相互访问的.

这个同源指的是什么呢?
1.同协议
2.同域名(ip)
3.同端口号
只要相互访问的两个地址其中一个条件不符合,就会出现跨域问题

如何解决跨域问题?
res.set("Access-Control-Allow-Orgin","*")
"*"表示一个通配符,说明可以被任意地址访问,同时也可以写入地址,那这个地址就可以访问,例"http://127.0.0.1/5500"
```





### post定义接口,添加中间键,接收数据

```js
const express = require("express")

const app = express()
//通过.use()方法使用
//定义urlencoded中间键,接收x-www-form-urlencodeed数据
app.use(express.urlencoded())
//定义json中间键,接收json数据
app.use(express.json())

app.post("/", (req, res) => {
    //req.body可接收请求的参数并处理
    console.log(req.body);
    res.send({
        data: req.body
    })
})

app.listen("8080", () => {
    console.log("成功接收:http://127.0.0.1:8080");
})
```



### 静态托管

```js
const express = require("express")

const app = express()

//app.use("/自定义接口",express.static("目录"))
app.use("/static",express.static("public"))
app.use("/test",express.static("test"))
app.use("/static",express.static("public"))

app.listen("3000", () => {
    console.log("http://127.0.0.1:3000");
})

//访问方式http://127.0.0.1:3000+接口,即可访问不同的项目
```



### res方法

```
res.send() : 作用类似于http模块中的res.end() 
      举例：res.send('要响应的数据') 它会自动增加content-type响应头，支持直接js对象参数作为响应数据
      res.send({name:"张三"})

res.json(): 直接将一个js对象或者数据以json字符串返回：res.json({name:"张三"})
res.status(): 设置响应状态码： res.status(404)

res.set() : 设置响应头
    res.set('content-type','text/html;charset=utf8')
    res.set('Access-Control-Allow-Origin', "*");
```



### req方法

```
req.url : 获取请求url
req.method：获取请求方法
req.query:  获取url传入的查询字符串参数
     请求的url如果带有参数则会自动解析到query中，例如：/getHero?heroname=妲己

req.params: 获取url传入的路由参数

req.body：获取post请求体中的参数
    需要配合内置中间件完成 app.use(express.urlencoded())  和 app.use(express.json())
```





### 使用multer实现服务器文件上传

```js
const express = require('express')
const multer = require('multer')
//dest: 'uploads/'   定义文件上传的位置在uploads这个文件夹里,事先要创建好
const upload = multer({ dest: 'uploads/' })

const app = express()

//定义上传文件的参数为 cover
app.post("/upload", upload.single('cover'), function (req, res, next) {
    //解决跨域问题
    res.set('Access-Control-Allow-Origin', "*");
    res.send({
        status: 200,
        msg: "上传成功"
    })
})

app.listen("8009", () => {
    console.log("http://127.0.0.1:8009/upload");
})
```



### 设置文件上传格式

```js
//只要在文件上传服务器+上这段中间件
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')   //文件路径
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())  //文件名字
    }
})

const upload = multer({ storage: storage })   //一样的
```



### 路由器中间件

router与index.js同级,调用的路由器中间件在router里面

![](D:\黑马\资料笔记\img\图片8.png)

```js
//主体index.js

const express = require("express")
//开启服务器
const app = express()

//引入设置好的路由器中间件
const cateRouter = require("./router/cateRouter")
//调用路由器中间件  app.use ("公共部分路径","路由器中间件)
app.use("/admin/category", cateRouter)

//监听
app.listen("8080", () => {
    console.log("成功开启:http://127.0.0.1:8080");
})

```

```js
//路径接口设置
const express = require("express")

//调用express中的Router方法
const Router = express.Router()

//通过Router设置接口调用方式和接口
Router.get("/list", (req, res) => {
    res.send({
        msg: "成功",
        code: "200",
        //get调用要返回数据
        data: { name: "李白", age: 18 }
    })
})

Router.post("/add", (req, res) => {
    res.send({
        msg: "新增成功",
        code: "200"
    })
})

//导出
module.exports=Router
```



### 路由中间件

接口数量较多时，代码不好管理。

以大事件的代码为例，我们定义了**管理员角色**的接口和**普通游客**的接口，这些接口如果全写在一个入口文件中： 如下只是显示了4个接口，如果是40个接口，就会很难读了，也不好维护的。



①创建路由中间件文件夹

②创建主函数.以后引入路由中间件

③创建各接口文件夹,并在里面创建路由中间件

**这里使用路由中间件**

```js
//中间件总体使用的主函数
const express=require("express")
//启动服务器
const app=express()
//引入定义好的路由中间件require("路径")
const userRouter=require("./user/userRouter")

//使用中间件app.use("定义的公共路径",引入的中间件)
app.use("/admin/user",userRouter)

app.listen("8002")
```



**定义好路由中间件**

```js
const express = require("express")
//引入路由中间件,是express方法
const Router = express.Router()

//定义路由中间件   Router.post/get("不同的接口名称","回调函数")
Router.post("/login", (req, res) => {
    res.send({
        staus: 200,
        msg: "登录成功"
    })
})

Router.get("/info", (req, res) => {
    res.send({
        status: 200,
        msg: { username: "小明", age: 18 }
    })
})

//导出中间件
module.exports=Router
```







# node.js第五天

### 中间件

为了实现某个目标进行得中间过程

```tex
express中间件是一个特殊的url地址处理函数，一个 express 应用，就是由许许多多的中间件来完成的
作用
- 执行任何代码。
- 修改请求和响应对象。
- 终结请求-响应循环（结束请求）。
- 调用堆栈中的下一个中间件 

分类
应用级中间件
内置中间件  express的中间件
路由级中间件
错误处理中间件
第三方中间件 其他程序员开发的插件multer
```



### 自定义中间件

```js
//中间件本身就是一个函数,他在app.use(中间件函数)中使用
//next()只有显示调用了next()才会进入下一个中间件或者路由处理函数执行,否则就到此为止

//自定义中间件语法
app.use((req,res,next)=>{
    req:请求报文
    res:响应报文
    next:如果下一个中间件或者路由的时候,需要调用
})

//例子:
const express=require("express")

const app=express()

//自定义中间件,看有没有token
app.use((req,res,next)=>{
    let token="123456"
    if(token){
        //执行下一个路由
        next()
    }
    else{res.send("失败")}
})

app.get("/tese",(req,res)=>{
    res.send("ok")
})

app.listen("8001",()=>{
    console.log("成功");
})


```

### 中间件写法

```js
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

//写法四 同一个中间件,req,res是通用的
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

```
app.use("/",(err,req,res,next)=>{
     err:表示请求过程中的错误信息
})
```

