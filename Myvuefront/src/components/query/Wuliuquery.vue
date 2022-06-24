<template>
<div>
  <!-- 导航栏 ---------------------------------------------->
  <div>
  <h2 class="title">  
        智慧物流查询系统
  </h2>
  
  <ul>
    <li><a>
        <router-link to="/query/query"  @click="read_signal()">
　　         <span class="">查询系统</span>
        </router-link>
        </a>
    </li>
    <li>
      <a>
           <router-link to="/manage/manage">
           　　<span class="">管理系统</span>
           </router-link>  
      </a>
    </li>
    <li>
      <a>
          <router-link to="/sql/sql">
           　　<span class="">SQL语句</span>
           </router-link>        
      </a>
    </li>
    <li>
      <a >
          <router-link to="/" @click.native="back_signal_read()">
           　　<span class="">返回主页</span>
           </router-link>   
      </a>
    </li>
  </ul>
  
   </div>
  <!------------导航栏---------------------------->

  <!-----------下拉菜单 -------------------------->
  <div class="dropdown" style="text-align:center;">
    <button class="dropbtn" style="text-align:center;">查询</button>
    <div class="dropdown-content">
    <a @click="select2()">查询已发货名单</a>
    <a @click="select3()">查询未发货名单</a>
    <a @click="select4()">查询VIP物品</a>
    <a @click="select5()">查询最短时间方案物品</a>
    <a @click="select6()">查询最少花费方案物品</a>
    <a @click="select7()">查询综合最优方案物品</a>
    <a @click="select8()">查询航空物流方案物品</a>  
    <a @click="select1()">下方输入id查询</a>
    <input type="text" v-model="projectsid" style="text-align:center" />       
    </div>
  </div>

  <div class="dropdown2">
    <button class="dropbtn">排序</button>
    <div class="dropdown-content">

    <a @click="sort_asc('id')">按订单升序排序</a>
    <a @click="sort_asc('arrival_time')">按到达时间升序排序</a>
    <a @click="sort_asc('vip')">按是否vip升序排序</a>
    <a @click="sort_desc('id')">按订单号降序排序</a>
    <a @click="sort_desc('arrival_time')">按到达时间降序排序</a>
    <a @click="sort_desc('vip')">按是否vip降序排序</a>

    </div>
  </div>


  <div >

    <!-- 所有名单 -->
    <button class="dropbtn"   @click="select()">所有订单</button>

  <table>
    <tr style="text-align: center">
    <th>No</th>
    <th>订单号</th>
    <th>物品类型</th>
    <th>Vip</th>
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
</template>


<script>



export default {
  name: "query",
  data() {
    return {
      msg: "欢迎来到物流信息管理系统",
      num1: '',
      num2: '',
      num3: '',
      wuliu: Array(),
      wuliutemp: Array(),
    };
  },

  created: function() {
        // 从后端接受数据
        this.$axios.get('http://localhost:3030/query_products').then((response) => {
            let len=response.data.length;
            let wuliuinfo
            for(let i=0;i<len;i++){
              wuliuinfo=response.data[i];
              this.wuliu.push(wuliuinfo)
            }
            this.wuliutemp = this.wuliu
        })
        console.log("wuliu:",this.wuliu)
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

    // 所有物品信息
    select:function(){
      this.wuliutemp = this.wuliu
      return this.wuliutemp
    },

    // 按订单号查询物品信息
    select1:function(){
      let productsid=this.projectsid;
      let len = this.wuliu.length;
      let wuliu1 = []
      for(let i=0;i<len;i++){
        if(this.wuliu[i].id==productsid){
          wuliu1.push(this.wuliu[i])
        }
      }
      this.wuliutemp=wuliu1
      return this.wuliutemp
    },
    
    // 查询已发货名单
    select2:function(){      
      let len = this.wuliu.length;
      let wuliu2 = []
      for(let i=0;i<len;i++){
        if(this.wuliu[i].deliver==1){
          wuliu2.push(this.wuliu[i])
        }
      }
      this.wuliutemp=wuliu2
      return this.wuliutemp
    },

    // 查询未发货名单
    select3:function(){      
      let len = this.wuliu.length;
      let wuliu3 = []
      for(let i=0;i<len;i++){
        if(this.wuliu[i].deliver==0){
          wuliu3.push(this.wuliu[i])
        }
      }
      this.wuliutemp=wuliu3
      return this.wuliutemp
    },

    // 查询VIP物品
    select4:function(){
      let len = this.wuliu.length;
      let wuliu4 = []
      for(let i=0;i<len;i++){
        if(this.wuliu[i].vip==1){
          wuliu4.push(this.wuliu[i])
        }
      }
      this.wuliutemp=wuliu4
      return this.wuliutemp
    },

    // 查询最短时间方案
    select5:function(){
      let len = this.wuliu.length;
      let wuliu5 = []
      for(let i=0;i<len;i++){
        if(this.wuliu[i].type==1){
          wuliu5.push(this.wuliu[i])
        }
      }
      this.wuliutemp=wuliu5
      return this.wuliutemp
    },

    // 查询最少花费方案
    select6:function(){
      let len = this.wuliu.length;
      let wuliu6 = []
      for(let i=0;i<len;i++){
        if(this.wuliu[i].type==2){
          wuliu6.push(this.wuliu[i])
        }
      }
      this.wuliutemp=wuliu6
      return this.wuliutemp
    },

    // 查询综合最优方案
    select7:function(){
      let len = this.wuliu.length;
      let wuliu7 = []
      for(let i=0;i<len;i++){
        if(this.wuliu[i].type==3){
          wuliu7.push(this.wuliu[i])
        }
      }
      this.wuliutemp=wuliu7
      return this.wuliutemp
    },

    // 查询航空物8方案
    select8:function(){
      let len = this.wuliu.length;
      let wuliu8 = []
      for(let i=0;i<len;i++){
        if(this.wuliu[i].type==4){
          wuliu8.push(this.wuliu[i])
        }
      }
      this.wuliutemp=wuliu8
      return this.wuliutemp
    },

    //从高到低排序(参数为要排序的属性值)
    sort_asc: function(a){
      function compare(property){
          return function(a,b){
              var value1 = a[property];
              var value2 = b[property];
              return value2 - value1;
          }
      }
        this.wuliutemp.sort(compare(a));
        return wuliutemp;
    },

    //从低到高排序(参数为要排序的属性值)
    sort_desc: function(a){
      function compare(property){
          return function(a,b){
              var value1 = a[property];
              var value2 = b[property];
              return value1 - value2;
          }
      }
        this.wuliutemp.sort(compare(a));   
        return wuliutemp;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.frame {
  width: 90%;
  margin: 40px auto;
  text-align: center;
}
button {
  margin: 20px;
  text-align: center;
}
</style>
