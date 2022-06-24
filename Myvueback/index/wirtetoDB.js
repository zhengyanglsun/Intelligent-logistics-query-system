var express = require("express");
var mysql = require("mysql");
var app = express();
let time, price, synthesis

//填写自己MySQL数据库的账号和密码、表名
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "wuliu",
});

// let edges = [
//     { source: 1, target: 2, time: Math.floor(Math.random() * 51), price: Math.floor(Math.random() * 51), synthesis: 0 },
//     { source: 1, target: 3, time: Math.floor(Math.random() * 51), price: Math.floor(Math.random() * 51), synthesis: 0 },
//     { source: 1, target: 4, time: Math.floor(Math.random() * 51), price: Math.floor(Math.random() * 51), synthesis: 0 },
//     { source: 1, target: 5, time: Math.floor(Math.random() * 51), price: Math.floor(Math.random() * 51), synthesis: 0 },
//     { source: 2, target: 6, time: Math.floor(Math.random() * 51), price: Math.floor(Math.random() * 51), synthesis: 0 },
//     { source: 2, target: 7, time: Math.floor(Math.random() * 51), price: Math.floor(Math.random() * 51), synthesis: 0 },
//     { source: 3, target: 8, time: Math.floor(Math.random() * 51), price: Math.floor(Math.random() * 51), synthesis: 0 },
//     { source: 3, target: 9, time: Math.floor(Math.random() * 51), price: Math.floor(Math.random() * 51), synthesis: 0 },
//     { source: 4, target: 10, time: Math.floor(Math.random() * 51), price: Math.floor(Math.random() * 51), synthesis: 0 },
//     { source: 4, target: 11, time: Math.floor(Math.random() * 51), price: Math.floor(Math.random() * 51), synthesis: 0 },
//     { source: 5, target: 12, time: Math.floor(Math.random() * 51), price: Math.floor(Math.random() * 51), synthesis: 0 },
//     { source: 5, target: 6, time: Math.floor(Math.random() * 51), price: Math.floor(Math.random() * 51), synthesis: 0 },
//     { source: 6, target: 7, time: Math.floor(Math.random() * 51), price: Math.floor(Math.random() * 51), synthesis: 0 },
//     { source: 7, target: 8, time: Math.floor(Math.random() * 51), price: Math.floor(Math.random() * 51), synthesis: 0 },
//     { source: 8, target: 9, time: Math.floor(Math.random() * 51), price: Math.floor(Math.random() * 51), synthesis: 0 },
//     { source: 9, target: 10, time: Math.floor(Math.random() * 51), price: Math.floor(Math.random() * 51), synthesis: 0 },
// ]

// for (let i = 0; i < edges.length; i++) {
//     edges[i].synthesis = edges[i].time * 0.5 + edges[i].price * 0.5
// }

//将edges数据写入到wuliu数据库的edges表中
function writeEdges() {
    connection.query("SELECT * FROM edges", function (err, result) {
        if (err) {
            console.log(err);
        } else {
            if (result.length == 0) {
                for (let i = 0; i < edges.length; i++) {
                    connection.query("INSERT INTO edges (id, source, target, time, price, synthesis) VALUES (?, ?, ?, ?, ?, ?)", [i + 1, edges[i].source, edges[i].target, edges[i].time, edges[i].price, edges[i].synthesis], function (err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("写入edges表成功");
                        }
                    });
                }
            } else {
                console.log("edges表已存在数据");
            }
        }
    });
}


// 从wuliu数据库的nodes表中读取数据, 读取到的数据写入到nodes数组中
// let nodes = []
// function readNodes() {
//     connection.query("SELECT * FROM nodes", function (err, result) {
//         if (err) {
//             console.log(err);
//         } else {
//             if (result.length == 0) {
//                 console.log("nodes表中没有数据");
//             } else {
//                 for (let i = 0; i < result.length; i++) {
//                     nodes.push({
//                         id: result[i].id,
//                         name: result[i].name,
//                     });
//                 }
//                 console.log("读取nodes表成功");
//             }
//         }
//     });
// }

// 从wuliu数据库的edges表中读取数据, 读取到的数据写入到edges数组中
// let edges = []
function readEdges() {
    connection.query("SELECT * FROM edges", function (err, result) {
        if (err) {
            console.log(err);
        } else {
            if (result.length == 0) {
                console.log("edges表中没有数据");
            } else {
                for (let i = 0; i < result.length; i++) {
                    edges.push({
                        id: result[i].id,
                        source: result[i].source,
                        target: result[i].target,
                        time: result[i].time,
                        price: result[i].price,
                        synthesis: result[i].synthesis,
                    });
                }
                console.log("读取edges表成功");
            }
        }
    });
}



// 执行写入数据库操作
// writeEdges();
// readNodes();
// readEdges();
// // 打印边信息
// console.log(edges)
// console.log(nodes)


// 将wuliu数据库中的nodes表中的数据读
let nodes = [];
function readNodes() {
    let nodes_temp = [];
    connection.query("SELECT * FROM nodes", function (err, result) {
        if (err) {
            console.log(err);
        } else {
            if (result.length == 0) {
                console.log("nodes表中没有数据");
            }
            else {
                for (let i = 0; i < result.length; i++) {
                    nodes_temp.push({
                        id: result[i].id,
                        name: result[i].name,
                    });
                    // console.log(nodes_temp);
                }
            }
        }
    });
    // console.log(nodes_temp);
    return nodes_temp;
}

nodes = readNodes();
// console.log(nodes);


writeEdges()