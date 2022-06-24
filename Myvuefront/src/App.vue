<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view />
  </div>

</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/* 标题样式 */
.title{
  font-size: 40px ;
  color:rgb(255, 255, 255);
  font-family:kaiti;
  margin-top: 0px ;
  margin-bottom:0px;
  /* background-color:rgb(188, 223, 145); */
  height:100%;
  background: -webkit-linear-gradient(left, #25c481, #25b7c4);
  background: linear-gradient(to right, #25c481, #25b7c4);
}

/* -----------------------导航栏样式--------------------- */
ul {
    /* top:-50; */
    list-style-type: none;
    margin-top:-106px;
    margin-left: -10px;
    padding: 0;
    width: 7%;
    background-color: rgb(255, 255, 255);
    position: fixed;
    height: 130%;
    overflow: auto;
}

li a {
    font-family:微软雅黑;
    font-size:20px;
    display: block;
    color: #000;
    padding: 8px 16px;
    text-decoration: none;
}

li a.active {
    background-color: #4CAF50;
    color: white;
}

li a:hover:not(.active) {
    background-color: rgb(188, 223, 145);
    color: white;
}

.btn2{
    background-color: #4CAF50;
    color: white;
    width: 200px;
    padding: 12px;
    font-size:18px;
    border: none;
    cursor: pointer;
    display: flex;
    margin-top:0;
    margin-left:20%;
    float:left;
    text-align:center;
}

/* -----------------------导航栏样式--------------------- */

/* 搜索框样式 */
.search{
    padding: 4px;
    text-align:center;
    margin-top:30px;
    float:left;
}

/*-------------------------- 下拉菜单样式--------------------------- */
.dropbtn {
    background-color: #f1f1f1;
    color: black;
    width: 120px;
    padding: 12px;
    font-size:18px;
    border: white;
    cursor: pointer;
    display: flex;
    margin-top:-10%;
    margin-left:70;
    justify-content:center;
}

.dropdown {
    position: relative;
    display: inline-block;
    margin-left:100px;
    text-align:center;
    float:left;
}
.dropdown2 {
    position: relative;
    display: inline-block;
    margin-left:0px;
    text-align:center;
    float:left;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
}

.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

.dropdown-content a:hover {background-color: #f1f1f1}

.dropdown:hover .dropdown-content {
    display: block;
}

.dropdown:hover .dropbtn {
    background-color: rgb(188, 223, 145);
}

.dropdown2:hover .dropdown-content {
    display: block;
}

.dropdown2:hover .dropbtn {
    background-color: rgb(188, 223, 145);
}


/*--------------------------- 总体表格统一样式------------------------ */
table{
  display:blocks;
  text-align: center;
  width: 90%;
  margin-left:160px;
  border-collapse: collapse;
  border: 0;
}
.tbl-header{
  background-color: rgba(255,255,255,0.3);
 }
.tbl-content{
  height:300px;
  overflow-x:auto;
  margin-top: 0px;
  border: 1px solid rgba(255,255,255,0.3);
}
th{
  padding: 20px 15px;
  text-align: center;
  font-weight: 500;
  font-size: 18px;
  color: #fff;
  text-transform: uppercase;
}
td{
  padding: 15px;
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

/* 按钮样式1 */
.button1 {
  margin: 10px;
  text-align: center;
  background-color:transparent;
  /* border:none; */
  border-color:rgb(197, 255, 172);
  color:white;
  font-size:16px;
  width:90px;
}

/* 按钮样式2 */
.button2 {
  margin: 10px;
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
