<template>
  <div>
    <h2 class="title">
        物流节点增加表
    </h2>

    <p>
      <button class="button1" @click="back_signal()">
        <router-link style="text-decoration:none;color:white" to="/manage/nodes/info" active-class="active">
          返回上页
        </router-link>
      </button>
    </p>
    <table>
      <tr>
        <th>编号</th>
        <td>
          <input type="text" v-model="id" />
        </td>
      </tr>
      <tr>
        <th>名字</th>
        <input type="text" v-model="name" />
      </tr>
    </table>
    <p>
      <button class="button1" @click="btn_add_stuinfo">添加并保存</button>
    </p>
  </div>
</template>

<script>

export default {
  name: "Nodesinsert",
  data() {
    return {
      msg: "欢迎来到物流信息管理系统",
      id: "",
      name: "",
    };
  },


  methods: {
    back_signal: function()  {
      console.log("signal")
      this.$axios({
            method:"post",
            url:"http://localhost:3030/back_signal",
            data: {},
        }).then((res)=>{
            console.log("成功向后端发送post请求:");
            console.log(res.data);
        }).catch(function (error) {
          console.log(error);
        })
    },

    btn_add_stuinfo: function () {
      let oStu = {
        //前端输入5个数据,需要发送给后端
        id: String(this.id),
        name: String(this.name),
      };
      console.log("id:",this.id)
      // 判断输入的学生成绩信息是否符合要求
      if(oStu.id == "" || oStu.name == "")
      {
          alert("输入框不能为空，请重新输入");
      }
      else{
            if(oStu.id.length >= 1 )
            {
                // 发送请求给后端

                this.$axios({
                  method:"post",
                  url:"http://localhost:3030/insert_node",
                  data:oStu,
                }).then((res)=>{
                    console.log("成功向后端发送post请求:");
                    console.log(res.data);
                })
                  .catch(function (error) {
                  // 处理错误情况
                  console.log(error);
                  //  this.msg1="error";
                })
                // //转到主页
                this.$router.push({ path: "/manage/nodes/info" });
            }
            if(oStu.id.length < 1){
              alert("订单号应该大于1位数字,请重新输入");
            }
            
      } 
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3,
h4 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input {
  width: 128px;
}
p {
  font-style: normal;
}
p.p-right {
  font-style: italic;
  text-align: right;
}
div.divCen {
  margin: 2px auto;
  width: auto;
}
table {
  width: 60%;
  margin: auto;
  border-collapse: collapse;
  border: 0;
  text-align: center;
}
th {
  background: -webkit-linear-gradient(left, #25c481, #25b7c4);
  background: linear-gradient(to right, #25c481, #25b7c4);
  color: #ffffff;
}
th,
td {
  font-size: 1em;
  text-align: center;
  padding: 4px;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #c1e9fe;
  border-width: 1px 0 1px 0;
}
tr {
  border: 1px solid #c1e9fe;
}
tr:nth-child(odd) {
  background: -webkit-linear-gradient(left, #25c481, #25b7c4);
  background: linear-gradient(to right, #25c481, #25b7c4);
}
tr:nth-child(even) {
  background: -webkit-linear-gradient(left, #25c481, #25b7c4);
  background: linear-gradient(to right, #25c481, #25b7c4);
}
</style>