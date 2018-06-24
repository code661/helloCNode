<template>
  <div>
    <div class="userinfo">
      <div class="header"></div>
      <img :src="user.avatar_url" alt="">
      <span>{{ user.loginname }}</span>
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

