<template>
  <div class='navbar'>
    <img class='nav brand' src="../assets/cnodejs_logo.svg" alt="">
    <ul class="nav pullright">
      <li v-for="item in navinfo"><a href="">{{ item }}</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      navinfo: ["首页","新手入门","API","关于","注册","登录"]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navbar {
    height: 50px;
    background-color: #444;
    min-width: 600px;
    box-shadow: 0 1px 4px #ccc;
  }
  .pullright {
    float: right;
    margin: 16px 12px;
  }

  .pullright > li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
  }

  .pullright > li > a {
    color: #ccc;
    text-decoration-line: none;
    font-size: 13px;
    padding: 17px 12px;
  }
  .pullright>li>a:hover {
    color: #fff;
  }
  .brand{
    max-width: 150px;
    margin: 8px 15px;
  }
</style>
