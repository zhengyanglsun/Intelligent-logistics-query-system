var express = require("express");
var app = express();
const BodyParser = require('body-parser')
const sqlPromise = require("mysql2/promise");


// <--------------------------------------------dijkstra算法-------------------------------------------->
async function dijkstra(type, destination) {
    let pool = sqlPromise.createPool({
        host: "localhost",
        user: "root",
        password: "123456",
        database: "wuliu"
    });
    let nodes = [];
    let edges = [];
    let nodes_json = await pool.query("select * from nodes");
    let edges_json = await pool.query("select * from edges");
    for (let i = 0; i < nodes_json[0].length; i++) {
        nodes[i] = {
            id: nodes_json[0][i].id,
            name: nodes_json[0][i].name,
        }
    }
    for (let i = 0; i < edges_json[0].length; i++) {
        edges[i] = {
            source: edges_json[0][i].source,
            target: edges_json[0][i].target,
            time: edges_json[0][i].time,
            price: edges_json[0][i].price,
            synthesis: edges_json[0][i].synthesis,
        }
    }
    // await pool.end();




    // 构建时间属性的邻接矩阵，如果没有边的话是无穷
    let timeMatrix = new Array(100)
    for (let i = 1; i <= nodes.length; i++) {
        timeMatrix[i] = new Array(100)
        for (let j = 1; j <= nodes.length; j++) {
            timeMatrix[i][j] = 65535
        }
    }
    for (let i = 0; i < edges.length; i++) {
        timeMatrix[edges[i].source][edges[i].target] = edges[i].time
    }
    // 构建价格属性的邻接矩阵
    let priceMatrix = new Array(100)
    for (let i = 1; i <= nodes.length; i++) {
        priceMatrix[i] = new Array(100)
        for (let j = 1; j <= nodes.length; j++) {
            priceMatrix[i][j] = 65535
        }
    }
    for (let i = 0; i < edges.length; i++) {
        priceMatrix[edges[i].source][edges[i].target] = edges[i].price
    }


    // 构建综合属性的邻接矩阵
    let synthesisMatrix = new Array(100)
    for (let i = 1; i <= nodes.length; i++) {
        synthesisMatrix[i] = new Array(100)
        for (let j = 1; j <= nodes.length; j++) {
            synthesisMatrix[i][j] = 65535
        }
    }
    for (let i = 0; i < edges.length; i++) {
        synthesisMatrix[edges[i].source][edges[i].target] = edges[i].synthesis
    }

    // 如果type = 1，则使用时间矩阵，如果type = 2，则使用价格矩阵，如果type = 3，则使用综合矩阵
    let matrix = new Array(nodes.length)
    if (type == 1) {
        matrix = timeMatrix
    }
    else if (type == 2) {
        matrix = priceMatrix
    }
    else if (type == 3) {
        matrix = synthesisMatrix
    }


    // 初始化一个距离数组
    let distance = new Array(nodes.length + 10)
    for (let i = 1; i <= nodes.length; i++) {
        distance[i] = 65535
    }

    // 另起始数组，成都为0
    distance[1] = 0

    // 初始化一个路径数组
    let path = new Array(nodes.length + 10)
    for (let i = 1; i <= nodes.length; i++) {
        path[i] = -1
    }

    // 初始化一个已经访问过的节点数组
    let visited = new Array(nodes.length + 10)
    for (let i = 1; i <= nodes.length; i++) {
        visited[i] = false
    }

    // 从0到n开始枚举
    for (let i = 0; i < nodes.length; i++) {
        // 寻找最小距离的节点
        let min = 65535
        let minIndex = -1
        for (let j = 1; j <= nodes.length; j++) {
            if (visited[j] == false && (minIndex == -1 || distance[j] < min)) {
                min = distance[j]
                minIndex = j
            }
        }
        // 将最小距离的节点加入已经访问过的节点数组
        visited[minIndex] = true
        // 对最小距离的节点进行更新
        for (let k = 1; k <= nodes.length; k++) {
            if (distance[minIndex] + matrix[minIndex][k] < distance[k]) {
                distance[k] = distance[minIndex] + matrix[minIndex][k]
                path[k] = minIndex
            }
        }
    }
    // 输出最短路径
    let result = []
    let index = -1
    // index為目的地 destination对应的编号
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].name === destination) {
            index = nodes[i].id
        }
    }
    while (index != -1) {
        result.push(index)
        index = path[index]
    }
    result.reverse()
    //输出最短路径中每个节点在nodes中的name
    let resultName = []
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
            if (nodes[j].id == result[i]) {
                resultName.push(nodes[j].name)
            }
        }
    }
    //将resultName转换为形如a->b->c的字符串
    let resultString = ''
    for (let i = 0; i < resultName.length; i++) {
        resultString += resultName[i]
        if (i != resultName.length - 1) {
            resultString += "->"
        }
    }
    console.log(resultString)
    await pool.end();
    return resultString
}
module.exports = dijkstra;
// dijkstra(1, '郑州')