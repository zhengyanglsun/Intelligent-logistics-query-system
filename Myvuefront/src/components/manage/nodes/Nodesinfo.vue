<template>
  <div >
      <!-- 导航栏 -->
      <div>
        <h2 class="title">  
              物流节点管理
        </h2>  
        <ul>
          <li>
            <a >
                <router-link to="/">
                　　<span class="">返回主页</span>
                </router-link>   
            </a>
          </li>
          <li>
            <a >
                <router-link to="/manage/manage">
                　　<span class="">返回上页</span>
                </router-link>   
            </a>
          </li>
          <br>
          <br>
          <li>
            <a  >
                <router-link to="/manage/nodes/insert" @click.native="write_signal()">
                　　<span class="">新增节点</span>
                </router-link>   
            </a>
          </li>
        </ul>
      </div>
  <div>

  <table>
        <tr>
        <th width="90" height="50">id</th>
        <th width="120">Name</th>
        <th width="150">相关操作</th>
        </tr>
        <tr v-for="(s, index) in wuliu" :key="index">
          <td>{{ s.id }}</td>
          <td>{{ s.name }}</td>
          <td>
            <button class="button1" @click="write_signal()">
              <router-link style="color:white;text-decoration: none;" :to="'/manage/nodes/edit/' + s.id" active-class="active" font-size="20">
                修改
              </router-link>
            </button>
            <button class="button1" @click="del_nodes_info(s.id)" active-class="active">删除</button>
          </td>
        </tr>
    </table>
    </div>
  </div>
</template>
<script>

export default {
  name: "Nodesinfo",
  data() {
    return {
      msg: "欢迎来到物流信息管理系统",
      wuliu: Array(),
    };
  },

  methods: {
    write_signal: function()  {
      console.log("signal")
      this.$axios({
            method:"post",
            url:"http://localhost:3030/write_signal",
            data: {},
        }).then((res)=>{
          if(res.data == 'isWriting'){
            alert('当前数据正在被修改，无法对数据查询或修改')
          }
          if(res.data == 'isReading'){
            alert('当前数据正在被查询，无法对数据修改')
          }
        }).catch(function (error) {
          console.log(error);
        })
    },
    del_nodes_info(id) {
       this.$axios({
            method:"post",
            url:"http://localhost:3030/del_node", // 删除接口
            data: {"id":id,},
        }).then((res)=>{
            console.log("成功向后端发送post请求:");
            console.log(res.data);           
        })
          .catch(function (error) {
          // 处理错误情况
          console.log(error);
          //  this.msg1="error";  
        })
        this.$router.push({ path: "/manage/nodes/info" });
    },    
  },


  created: function() {
        // console.log("wuliulist:",this.stuList)
        // 从后端接受数据
        this.$axios.get('http://localhost:3030/query_nodes')
        .then((response) => {
            console.log("从后端接口获取数据：")
            console.log(response.data);
            // this.stu=response.data
            let len=response.data.length;
            let Productsinfo
            for(let i=0;i<len;i++){
              // console.log("data:",response.data[i])
              Productsinfo=response.data[i];
              this.wuliu.push(Productsinfo)
            }
        })
        console.log("wuliu:",this.wuliu)
       
  },


  
};
</script>

<style scoped>
.button1 {
  margin: 10px;
  text-align: center;
  background-color:transparent;
  /* border:none; */
  border-color:rgb(197, 255, 172);
  color:white;
  font-size:16px;
  width:70px;
}

/*--------------------------- 表格新样式------------------------ */
table{
  display:blocks;
  text-align: center;
  width: 80%;
  /* margin-left:160px; */
  margin:auto;
  border-collapse: collapse;
  border: 0;
}
.tbl-header{
  background-color: rgba(255,255,255,0.3);
 }
.tbl-content{
  height:200px;
  overflow-x:auto;
  margin-top: 0px;
  border: 1px solid rgba(255,255,255,0.3);
}
th{
  padding: 10px 5px;
  text-align: center;
  font-weight: 500;
  font-size: 20px;
  color: #fff;
  text-transform: uppercase;
}
td{
  padding: 0;
  height:15px;
  text-align: center;
  vertical-align:middle;
  font-weight: 300;
  font-size: 18px;
  color: #fff;
  border-bottom: solid 1px rgba(255,255,255,0.1);
}
@import url(https://fonts.googleapis.com/css?family=Roboto:400,500,300,700);
body{
  background: -webkit-linear-gradient(left, #25c481, #25b7c4);
  background: linear-gradient(to right, #25c481, #25b7c4);
  font-family: 'Roboto', sans-serif;
}
section{
  margin: 50px;
}

/* follow me template */
.made-with-love {
  margin-top: 40px;
  padding: 10px;
  clear: left;
  text-align: center;
  font-size: 10px;
  font-family: arial;
  color: #fff;
}
.made-with-love i {
  font-style: normal;
  color: #F50057;
  font-size: 14px;
  position: relative;
  top: 2px;
}
.made-with-love a {
  color: #fff;
  text-decoration: none;
}
.made-with-love a:hover {
  text-decoration: underline;
}


/* for custom scrollbar for webkit browser*/

::-webkit-scrollbar {
    width: 6px;
} 
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
} 
::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
}
/*----------------------------- 新样式------------------------- */

</style>
