<template>
  <div class="main">
    <div class="userinfo">
      <div class="header">用户详情</div>
      <div class="wrapper">
        <img :src="user.avatar_url" alt="">
        <span>{{ user.loginname }}</span>
      </div>
      <span>{{ user.score}}积分</span>
      <span>注册时间{{ user.create_at | formatDate}}</span>
    </div>
    <div class="create">
      <div class="header">最近创建的话题</div>
      <ul>
        <li v-for="topic in user.recent_topics">
          <router-link :to="{
            name: 'post_content',
            params: {
              'id':topic.id,
              'name': topic.author.loginname
            }
          }">
          {{ topic.title}}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="reply">
      <div class="header">最近参与的话题</div>
      <ul>
        <li v-for="topic in user.recent_replies">
          <router-link :to="{
            name: 'post_content',
            params: {
              'id':topic.id,
              'name': topic.author.loginname
            }
          }">
          {{ topic.title}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    }
  },
  methods: {
    getUserinfoData(){
      this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.username}`)
          .then(res=> {
            this.user = res.data.data
          })
          .catch(err=> {
            console.log(err)
          })
    }
  },
  beforeMount: function(){
    this.getUserinfoData()
  }
}
</script>

<style scoped>
.header {
  background-color: #f6f6f6;
  padding: 10px 0;
  border-radius: 4px 4px 0 0;
  color: #444;
  font-size: 13px;
  padding-left: 18px;
}

.main {
  width: 800px;
  margin: 0 auto;
  margin-top: 30px;
}

.userinfo,
.create,
.reply {
  background-color: #FFF;
  margin-bottom: 30px;
  border-radius: 4px;
}

ul,ol {
  list-style: none;
  margin-left: 15px;
  }
ul a {
  color:rgb(0, 136, 204);
  font-size: 14px;
}

ul > li {
  margin-top: 5px;
  margin-bottom: 5px;
}

.wrapper {
  display: flex;
  align-items: center;
  margin-left: 30px;
  margin-top: 30px;
}
.wrapper > img {
  max-width: 80px;
  border-radius: 4px;
}
.wrapper > span {
  margin-left: 20px;
  color: rgb(119, 128, 135);
}
</style>

