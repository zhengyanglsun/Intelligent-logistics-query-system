<template>
  <div>
  <!-- 导航栏 -->
    <div>
      <h2 class="title">  
            物流路径管理
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
          <a >
              <router-link to="/manage/edges/insert" @click.native="write_signal()">
              　　<span class="">增加路径</span>
              </router-link>   
          </a>
        </li>
      </ul>
    </div>

  <table>
        <tr>
        <th height="40" width="100">id</th>
        <th width="100">起始地点</th>
        <th width="100">目的地点</th>
        <th width="150">时间消耗</th>
        <th width="150">价格消耗</th>
        <th width="150">综合消耗</th>
        <th width="200">相关操作</th>
        </tr>
        <tr v-for="(s, index) in edges" :key="index">
          <td>{{ s.id }}</td>
          <td>{{ s.source }}</td>
          <td>{{ s.target }}</td>
          <td>{{ s.time }}</td>
          <td>{{ s.price }}</td>
          <td>{{ s.synthesis }}</td>
          <td>
          <!-- <router-link to="/insert" active-class="active">Insert</router-link> -->
            <button class="button1" @click="write_signal">
              <router-link style="color:white; text-decoration: none;" :to="'/manage/edges/edit/' + s.id" active-class="active">
                修改
              </router-link>
            </button>
            <button class="button1"  @click="del_edges_info(s.id)" active-class="active">删除</button>
          </td>
        </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Edgesinfo",
  data() {
    return {
      msg: "欢迎来到物流信息管理系统",
      nodes: Array(),
      edges: Array(),
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

    del_edges_info(id) {
       this.$axios({
            method:"post",
            url:"http://localhost:3030/del_edge", // 删除接口
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
        this.$router.push({ path: "/manage/edges/info" });
    },    
  },

  created: function() {
    console.log('haha')
    this.$axios.get('http://localhost:3030/query_edges')
    .then((response) => {
        let len=response.data.length;
        let Productsinfo
        for(let i=0;i<len;i++){
          Productsinfo=response.data[i];
          this.edges.push(Productsinfo)
        }
    })
    this.$axios.get('http://localhost:3030/query_nodes')
    .then((response) => {
        let len=response.data.length;
        let Productsinfo
        for(let i=0;i<len;i++){
          Productsinfo=response.data[i];
          this.nodes.push(Productsinfo)
        }
    })

    setTimeout(()=>{
      //这里就写你要执行的语句即可，先让数据库的数据加载进去数组中你在从数组中取值就好了
      for (let i = 0; i < this.edges.length; i++){
        for(let j = 0; j < this.nodes.length; j++){
          if (this.edges[i].source == this.nodes[j].id){
            this.edges[i].source = this.nodes[j].name
            console.log(this.nodes[j].name)
          }
          if (this.edges[i].target == this.nodes[j].id){
            this.edges[i].target = this.nodes[j].name
            console.log(this.nodes[j].name)
          }
        }
      }
    },80)
    
  },
};
</script>

<style scoped>

.button1 {
  margin: 1px;
  text-align: center;
  background-color:transparent;
  /* border:none; */
  border-color:rgb(197, 255, 172);
  color:white;
  font-size:16px;
  width:70px;
}

</style>
