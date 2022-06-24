<template>
  <div>
    <h2 class="title">  
            物品信息更改表
    </h2>  
    <p>
      <button class="button1" @click="back_signal()">
        <router-link style="text-decoration:none;color:white" to="/manage/products/info" active-class="active">
          返回上页
        </router-link>
      </button>
    </p>

    <table>
      <tr>
        <th>订单号</th>
        <td>
          <input type="text" v-model="id" readonly />
        </td>
      </tr>
      <tr>
        <th>物品类型(1,2,3,4)</th>
        <input type="text" v-model="type" />
      </tr>
      <tr>
        <th>Vip(0或1)</th>
        <input type="text" v-model="vip" />
      </tr>
      <tr>
        <th>目的地</th>
        <input type="text" v-model="destination" />
      </tr>
      <tr>
        <th>到达时间(12位)</th>
        <input type="text" v-model="arrival_time" />
      </tr>
      <tr>
        <th>是否发货</th>
        <input type="text" v-model="deliver" />
      </tr>
    </table>
    <p>
      <button class="button1" @click="btn_edit_productsinfo">保存更改</button>
    </p>
  </div>
</template>

<script> 
export default {
  name: "Productsedit",
  data() {
    return {
      msg: "欢迎来到物流信息管理系统",
      id: "",
        type:"",
        vip:"",
        destination:"",
        arrival_time:"",
        logistics_routes:"",
        deliver:"",
    };
  },
  created: function () {
    //从后端获取id为this.$route.params.id的物流节点信息。
    this.id = String(this.$route.params.id);
    this.$axios.get('http://localhost:3030/query_product',{
        params: {
          id:this.id
        }
    }).then((response) => {
        console.log("从后端接口获取数据：")
        console.log(response.data);
        let productsinfo=JSON.stringify(response.data[0]);
        sessionStorage.setItem(this.id,productsinfo)
        console.log(productsinfo,":productinfo")
    }) 
    let productsinfo = JSON.parse(sessionStorage.getItem(this.id));
    this.id = productsinfo.id;
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

    btn_edit_productsinfo: function () {
      let products = {
        id: this.id,
        type: this.type,
        vip: this.vip,
        destination: this.destination,
        arrival_time: this.arrival_time,
        deliver: this.deliver
      };

      // 判断输入的物品信息是否符合要求
      if(this.type==""||this.vip==""||this.destination==""||this.arrival_time==""){
        alert("输入框不能为空，请重新输入");
      }
      else{
          if(this.id.length>1){
            //把修改后的数据发送给后端
            this.$axios({
              method:"post",
              url:"http://localhost:3030/edit_product",
              data:products,
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
            this.$router.push({ path: "/manage/products/info" });
        }
        // 如果类型不在1到4中，则提示用户
        if(products.type!=1&&products.type!=2&&products.type!=3&&products.type!=4){
          alert("物品类型应该为1到4之间,请重新输入");
        }
        // 如果vip不是0和1，则提示用户
        if(products.vip!=0&&products.vip!=1){
          alert("Vip应该为0或1,请重新输入");
        }
        if(products.arrival_time.length!=12){
          alert("到达时间应该为12位数字,请重新输入");
        } 
        if(products.deliver!=0&&products.deliver!=1){
          alert("是否发货应为0或1")
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
  /* background-color: #93daff; */
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
  /* background-color: #dbf2fe; */
  background: -webkit-linear-gradient(left, #25c481, #25b7c4);
  background: linear-gradient(to right, #25c481, #25b7c4);
}
tr:nth-child(even) {
  /* background-color: #fdfdfd; */
  background: -webkit-linear-gradient(left, #25c481, #25b7c4);
  background: linear-gradient(to right, #25c481, #25b7c4);
}
</style>
