<template>
<div>
    <!-- 导航栏 ---------------------------------------------->
    <div>
        <ul>
            <br>
            <br>
            <li>
            <a >
                <router-link to="/">
                　　<span class="">返回主页</span>
                </router-link>   
            </a>
            </li>
        </ul>
    </div>
    <!------------导航栏---------------------------->
    <div style="text-align: center">
        <h1 class="title" style="text-align:center;">SQL语句解释器</h1>
        <textarea class="input" name="input" id="" cols="30" rows="10"></textarea>
        <br>
        <button class="button1" @click="print()">词法，语法分析</button>
        <br>
        <br>
        <pre class="output1"></pre>
        <br>
        <pre class="output2"></pre>
        <br>
        <div id="box"></div>
    </div>
</div>
</template>


<script>
export default{
    name: "sql",
    data() {
        return {
        msg: "欢迎来到物流信息管理系统",
        bodyData: Array(),
        };
    },
    created: function() {
        
    },

    methods: {
        print() {
            this.bodyData = []
            let input = document.querySelector(".input");
            let run = document.querySelector("button");
            let output1 = document.querySelector(".output1");
            let output2 = document.querySelector(".output2");
            var box = document.getElementById('box');
            let table_name;
            let keys = [
                { name: "select", id: 1 },
                { name: "from", id: 2 },
                { name: "insert", id: 3 },
                { name: "into", id: 4 },
                { name: "values", id: 5 },
                { name: "update", id: 6 },
                { name: "set", id: 7 },
                { name: "where", id: 8 },
                { name: "create", id: 9 },
                { name: "table", id: 10 },
                { name: "delete", id: 22 },
                { name: "int", id: 18 },
                { name: "varchar", id: 19 }
            ];
            let bodyData = [];
            let hashs = [
                { name: "订单号", id: "id" },
                { name: "物品类型", id: "type" },
                { name: "Vip", id: "vip" },
                { name: "目的地", id: "destination" },
                { name: "到达时间", id: "arrival_time" },
                { name: "物流路径", id: "logistics_routes" },
                { name: "发货", id: "deliver" },
                { name: "起点", id: "source" },
                { name: "终点", id: "target" },
                { name: "时间消耗", id: "time" },
                { name: "价格消耗", id: "price" },
                { name: "综合消耗", id: "synthesis" },
                { name: "节点名", id: "name" },
            ]
            let t = 0; let syn = 0; let p = 0; let q = 0;
            let tokens = []; let res = ""; let Head = [];

            function init() {
                res = "";
                syn = 0;
                tokens.length = 0;
                q = 0;
                p = 0;
                Head.length = 0;
                table_name="";
                document.getElementById('box').innerHTML = "";
            }
            function hash_Head() {
                for (let i = 0; i < Head.length; i++) {
                    for (let j = 0; j < hashs.length; j++) {
                        if (Head[i] == hashs[j].id) {
                            Head[i] = hashs[j].name;
                            break;
                        }
                    }
                }
            }
            let insert_values = function () {
                if (tokens[t].syns == 14) {
                    t++;
                    if (tokens[t].syns == 16) {
                        while (tokens[t].syns == 16) {
                            t++;
                            if (tokens[t].syns == 20 || tokens[t].syns == 21) {
                                t++;
                                if (tokens[t].syns == 16) {
                                    t++;
                                    // console.log(tokens[t].token);
                                    if (tokens[t].syns == 15) {
                                        res = "词法，语法正确!\n";
                                    } else if (tokens[t].syns == 12) {
                                        t++;
                                        if (tokens[t].syns != 16) {
                                            res = ",后语法错误!\n";
                                            break;
                                        }
                                    } else {
                                        res = "'后语法错误!\n";
                                        break;
                                    }
                                } else {
                                    res = `${tokens[t - 1].token}` + "后语法错误!\n";
                                }
                            } else {
                                res = "'后语法错误!\n";
                            }
                        }
                    } else {
                        res = "(后语法错误!\n";
                    }
                } else {
                    res = "values后语法错误!\n";
                }
            }
            let create_word = function () {
                t++;
                if (tokens[t].syns == 19) {
                    t++;
                    if (tokens[t].syns == 14) {
                        t++;
                        if (tokens[t].syns == 21) {
                            t++;
                            if (tokens[t].syns == 15) {
                                t++;
                                if (tokens[t].syns == 12) {
                                    t++;
                                    if (tokens[t].syns == 15) {
                                        res = ",后面语法错误\n";
                                    }
                                } else if (tokens[t].syns == 15) {
                                    res = "词法，语法正确!\n";
                                } else {
                                    res = ")后面语法错误\n";
                                }
                            } else {
                                res = `${tokens[t].token}` + "后面语法错误\n";
                            }
                        } else {
                            res = "(后面语法错误\n";
                        }

                    } else {
                        res = "varchar后面语法错误\n";
                    }
                } else if (tokens[t].syns == 18) {
                    t++;
                    if (tokens[t].syns == 12) {
                        t++;
                        if (tokens[t].syns == 15) {
                            res = ",后面语法错误\n";
                        }
                    } else if (tokens[t].syns == 15) {
                        res = "词法，语法正确!\n";
                    } else {
                        res = "int后面语法错误!\n";
                    }
                } else {
                    res = `${tokens[t - 2].token}` + "后面语法错误\n";
                }
            }
            let select_where = function () {
                if (tokens[t].syns == 20) {
                    t++;
                    if (tokens[t].syns == 11) {
                        t++;
                        if (tokens[t].syns == 16) {
                            t++
                            if (tokens[t].syns == 21 || tokens[t].syns == 20) {
                                t++;
                                if (t < tokens.length && tokens[t].syns == 16) {
                                    res = "词法，语法正确!\n";
                                } else {
                                    res = `${tokens[t - 1].token}` + "后面语法出错!\n";
                                }
                            } else {
                                res = "语法出错!\n";
                            }
                        } else {
                            res = "=后面语法出错!\n";
                        }
                    } else {
                        res = `${tokens[t - 1].token}` + "后面语法出错!\n";
                    }
                } else {
                    res = "where后面语法出错!\n";
                }
            }
            function judge_table() {
                if (Head.length == 0) {
                    if (tokens[t].token == "nodes") {
                        Head = ["id", "name"];
                    } else if (tokens[t].token == "edges") {
                        Head = ["id", "source", "target", "time", "price", "synthesis"];
                    } else if (tokens[t].token == "products") {
                        Head = ["id", "type", "vip", "destination", "arrival_time", "logistics_routes", "deliver"];
                    } else {
                        res = "数据库中不存在该表\n";
                        return;
                    }
                }
            }
            let select_from = function (t) {
                //SELECT * FROM GOODSLIST
                if (tokens[t].syns == 20) {
                    judge_table();
                    t++;
                    if (t >= tokens.length) {
                        res = "词法，语法正确!\n";
                    } else if (tokens[t++].syns == 8) {
                        if (tokens[t++].syns == 20) {
                            if (tokens[t++].syns == 11) {
                                if (tokens[t++].syns == 16) {
                                    if (tokens[t].syns == 21 || tokens[t].syns == 20) {
                                        t++;
                                        if (t < tokens.length && tokens[t].syns == 16) {
                                            res = "词法，语法正确!\n"
                                        } else {
                                            res = `${tokens[t - 1].token}` + "后面语法出错!\n";
                                        }
                                    } else {
                                        res = "语法出错!\n";
                                    }
                                } else {
                                    res = "=后面语法出错!\n";
                                }
                            } else {
                                res = `${tokens[t - 2].token}` + "后面语法出错!\n";
                            }
                        } else {
                            res = "where后面语法出错!\n";
                        }
                    } else {
                        res = `${tokens[t - 2].token}` + "后面语法出错!\n";
                    }
                } else {
                    res = "From后面语法出错!\n";
                }
            }
    
            function createTable(headData, bodyData) {
                document.getElementById('box').innerHTML = "";
                let table = document.createElement("table");
                box.appendChild(table);
                table.border = "1px";
                table.width = "500px";
                table.cellSpacing = 0;
                //table.margin=auto;
                table.style.margin="auto";
                createHead(table, headData);
                createBody(table, bodyData);
               

            }
            // 创建表头
            function createHead(table, columnNames) {
                // thead -> table
                let thead = document.createElement("thead");
                table.appendChild(thead);
                // tr -> thead
                let tr = document.createElement("tr");
                thead.appendChild(tr);
                tr.style.height = "35px";
                tr.style.background = "transparent";t
                table.style.margin="auto";
                // th -> tr
                columnNames.forEach((column) => {
                    let th = document.createElement("th");
                    tr.appendChild(th);
                    th.textContent = column;
                });
            }
            // 创建内容
            function createBody(table, bodyData) {
                // tbody -> table
                let tbody = document.createElement("tbody");
                table.appendChild(tbody);

                // tr -> tbody
                bodyData.forEach((record) => {
                    let tr = document.createElement("tr");
                    tbody.appendChild(tr);

                    // td -> tr
                    Object.values(record).forEach((text) => {
                        let td = document.createElement("td");
                        tr.appendChild(td);
                        td.textContent = text;
                    });
                });
            }
            let s = input.value;
            s = s.toLowerCase();
            init();
            while (p < s.length) {
                let token = "";
                while (s[p] == " " || s[p] == '\n' || s[p] == '\t') p++;
                if (s[p] >= "a" && s[p] <= "z") {
                    token += s[p++];
                    while ((s[p] >= "0" && s[p] <= "9") || (s[p] >= "a" && s[p] <= "z") || s[p] == '_' || s[p] == '-') token += s[p++];
                    syn = 20;
                    for (let i = 0; i < keys.length; i++) {
                        if (token === keys[i].name) {
                            syn = keys[i].id;
                            break;
                        }
                    }
                } else if (s[p] >= '0' && s[p] <= '9') {
                    token += s[p++];
                    while (s[p] >= '0' && s[p] <= '9') token += s[p++];
                    syn = 21;
                } else switch (s[p]) {
                    case '=': token += s[p++], syn = 11;
                        break;
                    case ',': token += s[p++], syn = 12;
                        break;
                    case ';': token += s[p++], syn = 13;
                        break;
                    case '(': token += s[p++], syn = 14;
                        break;
                    case ')': token += s[p++], syn = 15;
                        break;
                    case '\'': token += s[p++], syn = 16;
                        break;
                    case '*': token += s[p++], syn = 17;
                        break;
                    default: syn = -1;
                }
                if (syn == -1) {
                    res = "词法错误!\n";
                    // console.log("Error!");
                    break;
                } else {
                    res += `[${syn}, ${token}]`;
                    res += '\n';
                    // console.log(`[${syn}, ${token}]`);
                    tokens[q++] = { "syns": syn, "token": token };
                }
            }
            output1.innerHTML = res;
            res = "";
            if (syn == -1) {
                res = "词法错误!\n";
            } else {
                t = 0;
                if (tokens[t].syns == 1) {
                    //SELECT * FROM GOODSLIST where id = '1001'
                    t++;
                    if (tokens[t].syns == 17) {
                        t++;
                        if (tokens[t++].syns == 2) {
                            select_from(t);
                        } else {
                            res = "*后面语法出错!\n";
                        }
                    } else if (tokens[t].syns == 20) {
                        while (tokens[t].syns === 20) {
                            Head.push(tokens[t].token);
                            t++;
                            if (tokens[t].syns === 2) {
                                t++;
                                select_from(t);
                                break;
                            } else if (tokens[t].syns === 12) {
                                t++;
                                if (tokens[t].syns !== 20) {
                                    res = `${tokens[t - 1].token}` + "后面出错!\n";
                                    break;
                                }
                            } else {
                                res = `${tokens[t - 1].token}` + "后面出错!\n";
                                break;
                            }
                        }
                    } else {
                        res = "select后面语法出错!\n";
                    }
                } else if (tokens[t].syns == 3) {
                    //INSERT INTO Persons (LastName, Address) VALUES ('Wilson', 'Champs-Elysees')
                    t++;
                    if (tokens[t].syns == 4) {
                        t++;
                        table_name = tokens[t].token;
                        if (tokens[t].syns == 20) {
                            judge_table();
                            t++;
                            if (tokens[t].syns == 14) {
                                t++;
                                if (tokens[t].syns == 20) {
                                    while (tokens[t].syns == 20) {
                                        t++;
                                        if (tokens[t].syns == 12) {
                                            t++;
                                            if (tokens[t].syns != 20) {
                                                res = `${tokens[t - 1].token}` + "后面语法错误!\n";
                                                break;
                                            }
                                        } else if (tokens[t].syns == 15) {
                                            t++;
                                            if (tokens[t].syns == 5) {
                                                t++;
                                                //console.log(t);
                                                insert_values();
                                            } else {
                                                res = ")后面语法错误!\n";
                                            }
                                            break;
                                        } else {
                                            res = `${tokens[t - 1].token}` + "后面语法错误!\n";
                                            break;
                                        }
                                    }
                                } else {
                                    res = "(后面语法错误!\n";
                                }
                            } else if (tokens[t].syns == 5) {
                                t++;
                                insert_values();
                            } else {
                                res = `${tokens[t - 1].token}` + "后面语法错误!\n";
                            }
                        } else {
                            res = "into后面语法错误!\n";
                        }
                    } else {
                        res = "insert后面语法错误!\n";
                    }

                } else if (tokens[t].syns == 22) {
                    //DELETE FROM Person WHERE LastName = 'Wilson'
                    t++;
                    if (tokens[t].syns == 2) {
                        t++;
                        table_name = tokens[t].token;
                        select_from(t);
                    } else {
                        res = "delete后面语法错误!\n";
                    }

                } else if (tokens[t].syns == 6) {
                    // UPDATE Person SET FirstName = 'Fred' WHERE LastName = 'Wilson'
                    t++;
                    if (tokens[t].syns == 20) {
                        table_name = tokens[t].token;
                        // console.log(tokens[t].token);
                        judge_table();
                        t++;
                        if (tokens[t].syns == 7) {
                            t++;
                            if (tokens[t].syns == 20) {
                                while (tokens[t].syns == 20) {
                                    select_where();
                                    if (res != "词法，语法正确!\n") {
                                        break;
                                    }
                                    t++;
                                    if (t >= tokens.length) {
                                        res = "词法，语法正确!\n";
                                        break;
                                    } else if (tokens[t].syns == 8) {
                                        t++;
                                        select_where();
                                        break;
                                    } else if (tokens[t].syns == 12) {
                                        t++;
                                        if (tokens[t].syns != 20) {
                                            res = ",后面语法错误!\n";
                                            break;
                                        }
                                    } else {
                                        res = `${tokens[t - 1].token}` + "后面语法错误!\n";
                                    }
                                }
                            } else {
                                if (res === "") {
                                    // console.log("hhhhh");
                                    res = "set后面语法错误!\n";
                                }
                            }
                        } else {
                            res = `${tokens[t - 1].token}` + "后面语法错误!\n";
                        }
                    } else {
                        res = "update后面语法错误!\n";
                    }
                } else if (tokens[t].syns == 9) {
                    t++;
                    if (tokens[t].syns == 10) {
                        t++;
                        if (tokens[t].syns == 20) {
                            table_name = tokens[t].token;
                            t++;
                            if (tokens[t].syns == 14) {
                                t++;
                                if (tokens[t].syns == 20) {
                                    while (tokens[t].syns == 20) {
                                        Head.push(tokens[t].token);
                                        // console.log(tokens[t].token);
                                        create_word();
                                        //console.log("res");
                                        // console.log(res);
                                        // console.log(tokens[t].token);
                                    }
                                }
                                if (res == "") {
                                    if (tokens[t].syns == 15) {
                                        res = "词法，语法正确!\n";
                                    } else {
                                        res = "(后面语法错误\n";
                                    }
                                }
                            } else {
                                res = `${tokens[t - 1].token}` + "后面语法错误\n";
                            }
                        } else {
                            res = "table后面语法错误\n";
                        }
                    } else {
                        res = "create后面语法错误\n";
                    }
                } else {
                    res = "操作符错误!\n";
                }
            }

            //数据库操作
            hash_Head();
            // console.log("Hello World!");
            // console.log(table_name);
            output2.innerHTML = res;
            if (res == "词法，语法正确!\n") {
                console.log(s);
                this.$axios({
                    method:"post",
                    url:"http://localhost:3030/sql", // sql接口
                    data: {"sql":s, "table_name":table_name},
                }).then((response)=>{
                    let len=response.data.length;
                    let Productsinfo
                    for(let i=0;i<len;i++){
                    // console.log("data:",response.data[i])
                    Productsinfo=response.data[i];
                    this.bodyData.push(Productsinfo)
                    }           
                }).catch(function (error) {
                    // 处理错误情况
                    console.log(error);
                    //  this.msg1="error";  
                }) 
                setTimeout(()=>{
                    //这里就写你要执行的语句即可，先让数据库的数据加载进去数组中你在从数组中取值就好了
                    createTable(Head, this.bodyData)
                },800)
            }
            
        }  
    },         
} 
</script>
<style scoped>
textarea {
    width: 30%;
    height: 100px;
    font-size: 20px;
    color: #fff;
    display: block;
    margin: 0 auto;
    /* background-color: #1fd1f9; */
    background: -webkit-linear-gradient(left, #25c481, #25b7c4);
    background: linear-gradient(to right, #25c481, #25b7c4);
    /* background-image: linear-gradient(315deg, #1fd1f9 0%, #b621fe 74%); */

}

table {
    width: 100%;
    table-layout: fixed;
    text-align: center;
}

.tbl-header {
    background-color: #1fd1f9;
    background-image: linear-gradient(315deg, #1fd1f9 0%, #b621fe 74%);

}

.tbl-content {
    height: 300px;
    overflow-x: auto;
    margin-top: 0px;
    background-color: #1fd1f9;
    background-image: linear-gradient(315deg, #1fd1f9 0%, #b621fe 74%);
}

th {
    padding: 20px 15px;
    text-align: left;
    font-weight: 500;
    font-size: 12px;
    text-transform: uppercase;
}

td {
    padding: 15px;
    text-align: left;
    vertical-align: middle;
    font-weight: 300;
    font-size: 12px;
    color: #fff;
    border-bottom: solid 1px rgba(255, 255, 255, 0.1);
}

body {
    background-color: #1fd1f9;
}

pre {
    width: 30%;
    color: #fff;
    display: block;
    margin: 0 auto;
    text-align: center;
    font-size: 20px;
    /* background-color: #1fd1f9; */
    /* background-image: linear-gradient(315deg, #1fd1f9 0%, #b621fe 74%); */
    background: -webkit-linear-gradient(left, #25c481, #25b7c4);
    background: linear-gradient(to right, #25c481, #25b7c4);    
}

.frame {
  width: 90%;
  margin: 40px auto;
  text-align: center;
}
button {
  margin: 20px;
  text-align: center;
}

.button1 {
  margin: 10px;
  text-align: center;
  background-color:transparent;
  /* border:none; */
  border-color:rgb(197, 255, 172);
  color:white;
  font-size:18px;
  width:150px;
  height:40px;
}
</style>
