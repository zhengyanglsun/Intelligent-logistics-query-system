<template>
  <div>
  <h2 class="title">  
        智慧物流集成管理与查询系统
  </h2>
  
  <ul>
    <li><a>
        <router-link to="/query/query"  @click.native="read_signal()">
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
  </ul>
  <img src="./wuliu.png" class="photo" alt="wuliu">
   </div>


</template>


<script>
export default{
  name: "title-index",
  methods: {
    read_signal: function()  {
      console.log("signal")
      this.$axios({
            method:"post",
            url:"http://localhost:3030/read_signal",
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
  }
}
</script>


<style>

.photo {
    display: inline-blocks;
    border: 1px solid rgb(255, 255, 255);
    border-radius: 4px;
    padding: 15px;
    transition: 0.3s;
    width: 80%;
    height:50%;
    margin-top:0px;
    margin-left:100px;
    text-align:center;
}

photo:hover {
    box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
}

</style>
