# sql语法

```
-- 两个中划线表示 sql中的注释符
--  查询语句
--  语法：SELECT 字段1,字段2 FROM 表名

-- 从student表中查询所有人的id和username

SELECT id, username FROM student;

-- 从student表中查询所有字段 数据，*表示查询到所有字段名
SELECT * FROM student;

-- 语句的关键词不区分大小写
select * from student;


-- 带查询条件的查询语句 where

-- 查询所有男同学
SELECT * FROM student WHERE sex='男';

-- 查询年龄小于30岁的男同学
SELECT * FROM student WHERE sex='男' and age<30;

-- 对查询结果进行排序  order by
-- asc: 表示升序，desc：表示降序
SELECT * FROM student ORDER BY age asc;


SELECT * FROM student ORDER BY age desc;

SELECT * FROM student WHERE sex='男' ORDER BY age desc;

-- 查询指定数量数据  limit

-- 从0开始查询1条同学的数据
-- 语法：select 字段1，字段2 from 表名 limit 开始查询的索引,查询的数量
-- 注意：这里的“索引”和js的数组中的索引是一样的，都从0开始

-- 从0索引开始查找4条学生数据
SELECT * FROM student LIMIT 0,4;

-- 从1索引开始查找1条学生数据
SELECT * FROM student limit 1,1;

-- 降序查询所有学生 从0索引开始查找1条学生数据
SELECT * FROM student ORDER BY age desc Limit 0,1;

-- 实现一个分页功能，page 页码 perpage=5 查找的数量
-- 前端传1的时候，后端需要从0索引开始找

-- 查找的索引值 =  (page-1) * perpage
-- SELECT * FROM student limit 查找的索引值,perpage;


-- 统计表中的数据数量 count
-- 语法：select count(表主键) from 表名

-- 根据id查找所有学生的数量
SELECT COUNT(id) FROM student;
-- 根据所有字段查找所有学生的数量
SELECT COUNT(*) FROM student;
-- 根据id查找所有男同学的数量
SELECT COUNT(id) FROM student WHERE sex='男'


-- 插入数据
-- 语法： insert into 表名(字段1，字段2，...字段n) values(字段1的值，字段2的值，...字段n的值)
insert into student(username,sex,age) values("赵四","女",38)

--删除语句
--语法: delete from 表名 where id="1"; 

--更新语句
--update 表名 set skin_name="精灵王" where id="1";

```



# mysql模块

```js
//mysql的使用,先下载mysql,   语法:npm i mysql
//1.引入mysql
const mysql=require("mysql")

//2.创建连接对象
const conn =mysql.createConnection({
    host:"localhost",//主机地址
    user:"root", //数据库用户名
    password:"123456", //数据库密码(一定要字符串)
    database:"hero"  //数据库名字
})

//3.连接数据库服务器
conn.connect()

//4.可以操作数据库了(执行sql语句)
//查询数据
conn.query("select*from skin", (err, result) => {
    console.log(result);
})

//插入数据
conn.query("insert into skin(cname,skin_name)value('张三','法外狂徒') ", (err, result) => {
    console.log(result);
})

//报错信息err.sqlMessage

//更新数据
conn.query("update skin set cname='鲁班' where id='2'", (err, result) => {
    console.log(result);
})

//删除数据
conn.query("delete from skin where id='3'", (err, result) => {
    console.log(result);
})

//5.关闭连接
conn.end()
```



### 封装mysql语法

```js
function query(sql, callback) {
    const mysql = require("mysql")

    const conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "123456",
        database: "hero",
    })

    conn.connect()

    conn.query(sql, callback);

    conn.end()
}

//导出
module.exports = query

//使用
//先导入
const query=require("./02-封装mysql.js")

query("select*from skin",(err,result)=>{
    console.log(result);
})
```

