<template>
  <div>
    <h2 class="title">
        物流路径更改表
    </h2>

    <p>
      <button class="button1" @click="back_signal()">
        <router-link style="text-decoration:none;color:white" to="/manage/edges/info" active-class="active">
          返回上页
        </router-link>
      </button>    
    </p>
    <table>
      <tr>
        <th>编号</th>
        <td>
          <input type="text" v-model="id" readonly />
        </td>
      </tr>
      <tr>
        <th>起始地编号</th>
        <input type="text" v-model="source" />
      </tr>
      <tr>
        <th>到达地编号</th>
        <input type="text" v-model="target" />
      </tr>
      <tr>
        <th>时间成本(0-50)</th>
         <input type="text" v-model="time" />
      </tr>
      <tr>
        <th>价值成本(0-50)</th>
         <input type="text" v-model="price" />
      </tr>
        
    </table>
    <p>
      <button class="button1" @click="btn_edit_edgesinfo">保存更改</button>
    </p>
  </div>
</template>

<script> 
export default {
  name: "Edgesedit",
  data() {
    return {
      msg: "欢迎来到物流信息管理系统",
      id: "",
      name: "",
        source:"",
        target:"",
        time:"",
        price:"",
        synthesis:"",

    };
  },
  created: function () {
    //从后端获取id为this.$route.params.id的物流路径信息。
    this.id = String(this.$route.params.id);
    this.$axios.get('http://localhost:3030/query_edge',{
        params: {
          id:this.id
        }
    }).then((response) => {
        console.log("从后端接口获取数据：")
        console.log(response.data);
        let edgesinfo=JSON.stringify(response.data[0]);
        sessionStorage.setItem(this.id,edgesinfo)
        console.log(edgesinfo,":stuinfo")
    }) 
    let edgesinfo = JSON.parse(sessionStorage.getItem(this.id));
      this.name = edgesinfo.name;
    // let stuinfo = JSON.parse(localStorage.getItem("stu" + this.id));

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

    btn_edit_edgesinfo: function () {
      let oStu = {
        id: this.id,
        source: this.source,
        target: this.target,
        time: this.time,
        price: this.price,
      };

      // 判断输入的物流路径信息是否符合要求
     if(this.source==""||this.target==""||this.time==""||this.price=="")
      {
          alert("输入框不能为空，请重新输入");
      }
      else{
            if(oStu.id.length >= 1 )
            {
                // 发送请求给后端

                //把修改后的数据发送给后端
                this.$axios({
                  method:"post",
                  url:"http://localhost:3030/edit_edge",
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
                //回到上一页
                this.$router.push({ path: "/manage/edges/info" });
            }
            if(oStu.id.length < 1){
              alert("订单号应该大于1位数字,请重新输入");
            }
            if(oStu.price > 50 || oStu.price < 0){
                alert("价值成本应该在0-50之间,请重新输入");
            }
            if(oStu.time > 50 || oStu.time < 0){
                alert("时间成本应该在0-50之间,请重新输入");
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
