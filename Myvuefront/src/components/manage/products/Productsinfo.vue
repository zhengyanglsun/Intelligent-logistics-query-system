<template>
  <div>
  <!-- 导航栏 -->
    <div>
      <h2 class="title">  
            物品信息管理
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
              <router-link to="/manage/products/insert" @click.native="write_signal()">
              　　<span>增加物品</span>
              </router-link>   
          </a>
        </li>
      </ul>
    </div>

    <div>

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
        <th>相关操作</th>
        </tr>
        <tr v-for="(s, index) in wuliu" :key="index" style="text-align: center">
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
        <td>
          <button class="button1" @click="write_signal()">
            <router-link style="text-decoration:none;color:white" :to="'/manage/products/edit/' + s.id" active-class="active">
              修改
            </router-link>
          </button>
          <button class="button1" @click="del_products_info(s.id)" active-class="active" >删除</button>
          <button class="button1" @click="deliver_products(s.id)" active-class="active">发货</button>
        </td>
      </tr>
    </table>
    </div>

  </div>


</template>

<script>

export default {
  name: "Productsinfo",
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
    del_products_info(id) {
       this.$axios({
            method:"post",
            url:"http://localhost:3030/del_product", // 删除接口
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
        //TODO:这里不能成功跳转
        this.$router.push({ path: "/manage/products/info" });
    },
    deliver_products(id) {
       this.$axios({
            method:"post",
            url:"http://localhost:3030/deliverproduct", 
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
        //TODO:这里不能成功跳转
        this.$router.push({ path: "/manage/products/info" });
    },
  },

  created: function() {
    this.$axios.get('http://localhost:3030/query_products_manage').then((response) => {
        let len=response.data.length;
        let Productsinfo
        for(let i=0;i<len;i++){
          Productsinfo=response.data[i];
          this.wuliu.push(Productsinfo)
        }
    })  
    setTimeout(()=>{
      this.wuliutemp = JSON.parse(JSON.stringify(this.wuliu))
      console.log('yaha')
      let obs = this.wuliutemp.length
      for (let i = 0; i < obs; i++){
        // console.log(this.wuliutemp[i].deliver)
        if ( this.wuliutemp[i].vip == '1'){
          this.wuliutemp[i].vip = '是'
          // console.log(this.wuliu[i].vip)
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

h3,
h4 {
  font-weight: normal;
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

</style>
