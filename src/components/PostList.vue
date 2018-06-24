<template>
  <div class="postlist">
    <div class="loading">
    </div>
    <div class="header">
      <ul>
        <li></li>
      </ul>
    </div>
    <ul>
      <li v-for="post in postlist">
        <router-link :to="{
          name:'user_info',
          params: {
            'username': post.author.loginname
          }
          }">
          <img :src="post.author.avatar_url" alt="author-avatar">
        </router-link>
        <span class="">{{post | formatTab}}</span>
        <span class="count_of_replies">{{ post.reply_count }} /</span>
        <span class="count_of_visits">{{ post.visit_count }}</span>
        <span>
          <router-link :to="{
            name:'post_content',
            params: {
              id:post.id,
              name: post.author.loginname
            }
          }">
            <span class="topic_title" >{{ post.title }}</span>
          </router-link>
        </span>
        <span class="last_active_time">{{ post.last_reply_at | formatDate}}</span>
      </li>
    </ul>
    <pagination @changePage="handle"></pagination>
  </div>
</template>

<script>
import pagination from './Pagination'
export default {
  data() {
    return {
      postlist: [],
      currentPage: 1
    }
  },
  methods: {
    getData(){
      this.$http.get('https://cnodejs.org/api/v1/topics',{params:{'page':this.currentPage}})
        .then(res=>{
          if (res.statusText == 'OK') {
            this.postlist = res.data.data
          }
        })
        .catch(function(err){
          console.log(err)
        })
    },
    handle(value){
      this.currentPage = value
      this.getData()
    }
  },
  beforeMount(){
    this.getData()
  },
  components: {
    'pagination': pagination
  }
}
</script>

<style scoped>
  img {
    max-width: 50px;
  }
</style>

