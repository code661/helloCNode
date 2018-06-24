<template>
  <div class="main">
    <div class="header">
      <p class="topic_title">{{ post.title}}</p>
      <div class="changes">
        <span>发布于{{post.create_at | formatDate}}</span>
        <span>作者 {{ post.author.loginname}}</span>
        <span>{{ post.visit_count}}次浏览</span>
        <span>来自{{post| formatTab}}</span>
      </div>
    </div>
    <div class="content" v-html="post.content"></div>
    <div class="replylist">
      <ul>
        <li v-for="(reply,index) in post.replies">
          <router-link :to="{
            name:'user_info',
            params:{
              'username' :reply.author.loginname
            }
          }">
            <img :src="reply.author.avatar_url" alt="">
          </router-link>
          <span>{{ reply.author.loginname}}</span>
          <span>{{ index + 1}}楼</span>
          <span>{{reply.create_at | formatDate}}</span>
          <span>{{reply.ups.length}}个👍</span>
          <p v-html="reply.content"></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {}
    }
  },
  methods: {
    getData() {
      this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
      .then(res=>{
        this.post = res.data.data
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  beforeMount: function(){
    this.getData()
  },
  watch:{
    $route: function(){
      this.getData()
    }
  }
}
</script>

<style >
@import url('../assets/markdown-github.css');
</style>

