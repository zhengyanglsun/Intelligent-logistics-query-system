var express = require("express");
var app = express();
var dijkstra = require("./dijkstra")
const mysql = require("mysql2");
const BodyParser = require('body-parser')               //配置body-parser中间件
const cors = require("cors");                           //解决跨域问题

app.use("/public", express.static("public"));
app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json())
app.use(cors());

//填写自己MySQL数据库的账号和密码、表名
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "wuliu",
});

var editid = '';
connection.connect();


// <--------------------------------------------信号量设置与操作-------------------------------------------->
let isReading = false;
let isWriting = false;

app.post("/write_signal", function(req, res) {
    console.log('write_signal被调用')
    if((!isReading)&&(!isWriting)){
        isWriting = true
        console.log("isWriting: ", isWriting)
    }
    else{
        if(isReading){
            console.log('接口被占用，无法写(isReading)')
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(
                'isReading'
            );
        }
        if(isWriting){
            console.log('接口被占用，无法写(isWriting)')
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(
                'isWriting'
            );
        }
    }
});

app.post("/read_signal", function(req, res) {
    if(!isWriting){
        isReading = true
        console.log("isReading", isReading)
    }else{
        //无法查询页面
        console.log('接口被占用，无法读')
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
            'isWriting'
        );
    }
});

app.post("/back_signal_read", function(req, res) {
    isReading = false
    console.log("isReading", isReading)
});

app.post("/back_signal", function(req, res) {
    isWriting = false
    console.log("isWriting: ", isWriting)
});


// <--------------------------------------------数据库SELECT操作-------------------------------------------->
// query_products_manage接口：查询整张表的物品信息数据(manage页面中，不设置信号量)
app.get("/query_products_manage", function (req, res) {
    console.log("query_products_manage接口");
    connection.query("SELECT * FROM products", function (error, results, fields) {
        if (error) throw error;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
    });
});

// query_products接口：查询整张表的物品信息数据(wuliuquery页面中，需设置信号量)
app.get("/query_products", function (req, res) {
    console.log("query_products接口");
    if(!isWriting){
        connection.query("SELECT * FROM products", function (error, results, fields) {
            if (error) throw error;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        });
    }
    else{
        // console.log("接口被占用")
    }
});

//query_product接口:查询特定id物品信息，便于展示到前端并修改.
app.get("/query_product", function (req, res) {
    console.log("query_product接口");
    editid = req.query.id
    connection.query(`SELECT * FROM products where id=${editid}`, function (error, results, fields) {
        if (error) throw error;
        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        }
    });
})

// query_nodes接口：查询物流节点信息数据
app.get("/query_nodes", function (req, res) {
    console.log("query_nodes接口");
    if(!isWriting){
        connection.query("SELECT * FROM nodes", function (error, results, fields) {
            if (error) throw error;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        });
    }
    else{
        console.log("接口被占用")
    }
});

// query_node接口：查询特定id物流节点信息，便于展示到前端并修改.
app.get("/query_node", function (req, res) {
    console.log("query_node接口");
    editid = req.query.id
    connection.query(`SELECT * FROM nodes where id=${editid}`, function (error, results, fields) {
        if (error) throw error;
        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        }
    });
})

// query_edges接口：查询物流路径信息数据
app.get("/query_edges", function (req, res) {
    console.log("query_edges接口");
    if(!isWriting){
        connection.query("SELECT * FROM edges", function (error, results, fields) {
            if (error) throw error;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        });
    }
    else{
        console.log("接口被占用")
    }
});

// query_edge接口：查询特定id物流路径信息，便于展示到前端并修改.
app.get("/query_edge", function (req, res) {
    console.log("query_edge接口");
    editid = req.query.id
    connection.query(`SELECT * FROM edges where id=${editid}`, function (error, results, fields) {
        if (error) throw error;
        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        }
    });
})


// <--------------------------------------------数据库DELETE操作-------------------------------------------->
// del_product接口：删除物品信息(通过id)
app.post("/del_product", function (req, res) {
    // var del_id = req.body.id
    connection.query(`DELETE  FROM products where id = ${req.body.id}`,
        function (error, results, fields) {
            if (error) console.log(error);
            else {
                console.log("编号为 ", req.body.id, "的节点信息删除成功。")
                // console.log("The result is: ", results);
            }
        });
    console.log("主页 POST 请求,收到前端信息，删除的节点编号为：");
 
});

//del_node接口：删除物流节点信息(通过id)
app.post("/del_node", function (req, res) {
    // var del_id = req.body.id
    connection.query(`DELETE  FROM nodes where id = ${req.body.id}`,
        function (error, results, fields) {
            if (error) console.log(error);
            else {
                console.log("编号为 ", req.body.id, "的节点信息删除成功。")
                // console.log("The result is: ", results);
            }
        });
    console.log("主页 POST 请求,收到前端信息，删除的节点编号为：");
    console.log(req.body.id)
});

// del_edge接口：删除物流路径节点信息(通过id)
app.post("/del_edge", function (req, res) {
    // var del_id = req.body.id
    connection.query(`DELETE  FROM edges where id = ${req.body.id}`,
        function (error, results, fields) {
            if (error) console.log(error);
            else {
                console.log("编号为 ", req.body.id, "的节点信息删除成功。")
                // console.log("The result is: ", results);
            }
        });
    console.log("主页 POST 请求,收到前端信息，删除的节点编号为：");
    console.log(req.body.id)
});


// <--------------------------------------------数据库UPADATE操作-------------------------------------------->
// edit_product接口：修改物品信息(通过id)
app.post("/edit_product", function (req, res) {
    isWriting = false
    if((!isReading)&&(!isWriting)){
        let editid = req.body.id
        let edit_obj = req.body
        edit_obj.deliver = 0

        //根据类型利用迪杰斯特拉算法计算最短路径，如果类型为1用edges里的时间计算，如果类型为2用edges里的价格计算，如果类型为3用edges里的synthesis计算
        if (edit_obj.type != 4) {
            dijkstra(edit_obj.type, edit_obj.destination).then(res => {
                edit_obj.logistics_routes = res
                //将数据插入数据库
                let sql = `UPDATE products SET ? where id = ${editid}`;
                connection.query(sql, edit_obj, (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(result);
                    }
                })
            }).catch(err => {
                console.log(err)
            })
        }
        //如果类型为4，则物流路径为直达
        else {
            edit_obj.logistics_routes = '成都->' + edit_obj.destination
            //将数据插入数据库
            let sql = `UPDATE products SET ? where id = ${editid}`;
            connection.query(sql, edit_obj, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result);
                }
            })
        }
    }else{
        //无法打开insert和edit页面
        console.log('无法写入')
    }
});

//deliverproduct接口：通过id在数据库中修改物品发货信息
app.post('/deliverproduct', function (req, res) {
    let editid = req.body.id
    let edit_obj = req.body
    edit_obj.deliver = 1
    console.log("主页 POST 请求,收到前端要发货的物品的id:");
    console.log(editid)
    let sql = `UPDATE products SET ? where id = ${editid}`;
    //在这里说明是一个参数，通过下边的edit_obj代替
    connection.query(sql, edit_obj, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result);
            res.send(`update ${editid} success......`)
        }
    })
});

// edit_node接口：修改物流节点信息(通过id)
app.post("/edit_node", function (req, res) {
    isWriting = false
    if((!isReading)&&(!isWriting)){
        console.log("req.body:", req.body)
        let editid = req.body.id
        let edit_obj = req.body
        console.log("主页 POST 请求,收到前端要修改的物流节点的id：");
        console.log(editid)

        let sql = `UPDATE nodes SET ? where id = ${editid}`;
        //在这里说明是一个参数，通过下边的edit_obj代替
        connection.query(sql, edit_obj, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log(result);
                res.send(`update ${editid} success......`)
            }
        })
    }else{
        //无法打开insert和edit页面
        console.log('无法写入')
    }
});

//edit_edge接口：修改物流路径信息(通过id)
app.post("/edit_edge", function (req, res) {
    isWriting = false
    if((!isReading)&&(!isWriting)){
        console.log("req.body:", req.body)
        let editid = req.body.id
        let edit_obj = req.body
        console.log("主页 POST 请求,收到前端要修改的物流节点的id：");
        console.log(editid)

        let sql = `UPDATE edges SET ? where id = ${editid}`;
        //在这里说明是一个参数，通过下边的edit_obj代替
        connection.query(sql, edit_obj, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log(result);
                res.send(`update ${editid} success......`)
            }
        })
    }else{
        //无法打开insert和edit页面
        console.log('无法写入')
    }
});


// <--------------------------------------------数据库INSERT操作-------------------------------------------->
// insert_product接口：新建物品信息
app.post("/insert_product", function (req, res) {
    isWriting = false
    if((!isReading)&&(!isWriting)){
        var insert_obj = req.body
        console.log("主页 POST 请求,收到前端表单提交的数据：");
        console.log(insert_obj)
        // 默认没有发货
        insert_obj.deliver = 0


        //根据类型利用迪杰斯特拉算法计算最短路径，如果类型为1用edges里的时间计算，如果类型为2用edges里的价格计算，如果类型为3用edges里的synthesis计算
        if (insert_obj.type != 4) {
            dijkstra(insert_obj.type, insert_obj.destination).then(res => {
                insert_obj.logistics_routes = res
                //将数据插入数据库
                connection.query('INSERT INTO products SET ?', insert_obj, (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(result);
                    }
                })
            }).catch(err => {
                console.log(err)
            })
        }

        //如果类型为4，则物流路径为直达
        else {
            insert_obj.logistics_routes = '成都->' + insert_obj.destination
            //将数据插入数据库
            connection.query('INSERT INTO products SET ?', insert_obj, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result);
                }
            }
            )
        }
    }else{
        //无法打开insert和edit页面
        console.log('无法写入')
    }
    
});

// insert_node接口：新建物流节点信息
app.post("/insert_node", function (req, res) {
    isWriting = false
    if((!isReading)&&(!isWriting)){
        var insert_obj = req.body
        console.log("主页 POST 请求,收到前端表单提交的数据：");
        console.log(insert_obj)

        //将数据插入数据库
        connection.query('INSERT INTO nodes SET ?', insert_obj, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log(result);
                res.send('添加成功')
            }
        })
    }else{
        //无法打开insert和edit页面
        console.log('无法写入')
    }
});

// insert_edge接口：新建物流边信息
app.post("/insert_edge", function (req, res) {
    isWriting = false
    if((!isReading)&&(!isWriting)){
        var insert_obj = req.body
        console.log("主页 POST 请求,收到前端表单提交的数据：");
        console.log(insert_obj)

        //计算综合价值
        insert_obj.synthesis = insert_obj.time * 0.5 + insert_obj.price * 0.5

        //将数据插入数据库
        connection.query('INSERT INTO edges SET ?', insert_obj, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log(result);
                res.send('添加成功')
            }
        })
    }else{
        //无法打开insert和edit页面
        console.log('无法写入')
    }
});


// <-------------------------------------------sql解析器页面Wuliusql数据库操作------------------------------------------->
// sql接口:将解析sql后的结果展示到前端
app.post("/sql", function (req, res) {
    // console.log("主页 GET 请求,前端请求数据库数据：");
    // console.log(req)
    let table_name = req.body.table_name
    let sql = req.body.sql
    let start_sql = sql.slice(0,6)   
    if(start_sql.toLowerCase() == "select"){
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            // console.log("The result is: ", results);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        });
    }
    else if(start_sql.toLowerCase() == "insert" || start_sql.toLowerCase() == "update" || start_sql.toLowerCase() == "delete"){
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
        });
        connection.query("SELECT * FROM "+table_name, function (error, results, fields) {
            if (error) throw error;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        });
    }
    else{
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
        });
    }
    
});


var server = app.listen(3030, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});

