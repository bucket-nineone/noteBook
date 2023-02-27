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

