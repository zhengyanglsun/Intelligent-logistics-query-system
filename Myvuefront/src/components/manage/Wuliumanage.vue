<template>
<div>
<div>
  <!-- 导航栏 ---------------------------------------------->
  <div>
  <h2 class="title">  
        智慧物流管理系统——物品订单总览
  </h2>
  <ul>
    <li><a>
        <router-link to="/manage/products/info">
　　         <span class="">物品信息管理</span>
        </router-link>
        </a>
    </li>
    <li>
      <a>
           <router-link to="/manage/nodes/info">
           　　<span class="">物流节点管理</span>
           </router-link>  
      </a>
    </li>
    <li>
      <a>
          <router-link to="/manage/edges/info">
           　　<span class="">物流路径管理</span>
           </router-link>        
      </a>
    </li>
    <li>
      <a >
          <router-link to="/">
           　　<span class="">返回主页</span>
           </router-link>   
      </a>
    </li>
  </ul>
   </div>
  <!-- 导航栏 -------------------------------------------------->

  <div >
  <table>
    <tr style="text-align: center">
    <th>No</th>
    <th>订单号</th>
    <th>物品物流方案</th>
    <th>是否Vip</th>
    <th>目的地</th>
    <th>到达时间</th>
    <th>物流路径</th>
    <th>是否发货</th>
    </tr>

    <tr v-for="(s, index) in wuliutemp" :key="index" style="text-align: center">
    <td>{{ index+1 }}</td>
    <td>{{ s.id }}</td> 
    <td>{{ s.type }}</td>
    <td>{{ s.vip }}</td>
    <td>{{ s.destination }}</td>
    <td>{{
      s.arrival_time.slice(0,4)
      +'年'+
      s.arrival_time.slice(4,6)
      +'月'+
      s.arrival_time.slice(6,8)
      +'日'+
      s.arrival_time.slice(8,10)
      +'时'+
      s.arrival_time.slice(10,12)
      +'分'
    }}</td>
    <td>{{ s.logistics_routes }}</td>
    <td>{{ s.deliver}}</td>
    </tr>

    </table>
  </div>
</div>
</div>
</template>

<script>



export default {
  name: "Wuliumanage",
  data() {
    return {
      wuliu: Array(),
      wuliutemp: Array(),
    };
  },

  created: function() {
        // 从后端接受数据
        this.$axios.get('http://localhost:3030/query_products_manage').then((response) => {
            let len=response.data.length;
            for(let i=0;i<len;i++){
              let wuliuinfo=response.data[i];
              this.wuliu.push(wuliuinfo)
            }
        })
        setTimeout(()=>{
          this.wuliutemp = JSON.parse(JSON.stringify(this.wuliu)) 
          let obs = this.wuliutemp.length
          for (let i = 0; i < obs; i++){
            if ( this.wuliutemp[i].vip == '1'){
              this.wuliutemp[i].vip = '是'
            }
            if (this.wuliutemp[i].vip == '0'){
              this.wuliutemp[i].vip = '否'
            }
            if ( this.wuliutemp[i].type == '1'){
              this.wuliutemp[i].type = '最短时间方案'
            }
            if ( this.wuliutemp[i].type == '2'){
              this.wuliutemp[i].type = '最少消耗方案'
            }
            if ( this.wuliutemp[i].type == '3'){
              this.wuliutemp[i].type = '综合物流方案'
            }
            if ( this.wuliutemp[i].type == '4'){
              this.wuliutemp[i].type = '航空直达方案'
            }
            if ( this.wuliutemp[i].deliver == '1'){
              this.wuliutemp[i].deliver = '是'
            }
            if (this.wuliutemp[i].deliver == '0'){
              this.wuliutemp[i].deliver = '否'
            }
          }
        },80)
  },


  methods: {
    back_signal_read: function()  {
      console.log("signal")
      this.$axios({
            method:"post",
            url:"http://localhost:3030/back_signal_read",
            data: {},
        }).then((res)=>{
            console.log("成功向后端发送post请求:");
            console.log(res.data);
        }).catch(function (error) {
          console.log(error);
        })
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*-----------------------按钮样式------------------------- */

button {
  margin: 20px;
  text-align: center;
}

</style>
