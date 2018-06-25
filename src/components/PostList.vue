<template>
  <div class="postlist">
    <div class="header">
      <ul>
        <li>精华</li>
        <li>分享</li>
        <li>回答</li>
        <li>招聘</li>
      </ul>
    </div>
    <ul class='content'>
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
  .postlist {
    width: 700px;
    margin: 30px auto;
  }
  .header {
    height: 40px;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
  }
  .header li {
    display: inline-block;
    color: #80bd01;
    font-size: 14px;
  }
  .content {
    background-color: #fff;
  }
  .content > li {
    list-style: none;
    padding: 10px 0;
    font-size: 15px;
  }
  .topic_title {
    margin-left: 15px;
    max-width: 450px;
    max-height: 24px;
    display: inline-block;
    overflow: hidden;
    text-overflow: clip;
    line-height: 30px;
  }
  .content > li:hover {
    background-color: #f6f6f6;
  }

  img {
    max-width: 40px;
    border-radius: 3px;
    margin: 0 20px 0 30px;
  }
  a {
    color: #333;
    text-decoration-line: none;
  }
  a:hover {
    text-decoration-line: underline;
  }
  .last_active_time {
    float: right;
    font-size: 12px;
    color: #778087;
    margin-right: 30px;
  }
  .count_of_replies {
    font-size: 12px;
  }
</style>

