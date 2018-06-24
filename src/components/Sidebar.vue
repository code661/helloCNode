<template>
  <div>
    <div>
      <div class="header"></div>
      <img src="" alt="">
      <span>{{ userinfo.loginname}}</span>
      <span>积分: {{ userinfo.score }}</span>
    </div>
    <div>
      <div class="header">作者其它话题</div>
      <ul>
        <li v-for="topic in userinfo.recent_topics">
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
    <div>
      <div class="header">最近参与的话题</div>
      <ul>
        <li v-for="topic in userinfo.recent_replies">
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
      userinfo: {}
    }
  },
  methods: {
    getUserinfoData(){
      this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
      .then(res=> {
        this.userinfo = res.data.data
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

