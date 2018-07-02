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
        <span class="count">
          <span class="count_of_replies">{{ post.reply_count }} /</span>
          <span class="count_of_visits">{{ post.visit_count }}</span>
        </span>
        <span :class="[{'tab_active':post.good || post.top},'tab']">{{post | formatTab}}</span>
        <router-link class="topic_title" :to="{
          name:'post_content',
          params: {
            id:post.id,
            name: post.author.loginname
          }
        }">
          {{ post.title }}
        </router-link>
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
    width: 800px;
    margin: 30px auto;
  }
  .header {
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
  }
  .header > ul {
    margin-left: 10px;
  }
  .header li {
    padding: 15px 10px;
    display: inline-block;
    color: #80bd01;
    font-size: 14px;
  }
  .content {
    display: flex;
    flex-direction: column;
    background-color: #fff;
  }
  .content > li {
    list-style: none;
    padding: 10px 0;
    font-size: 14px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .topic_title {
    margin-left: 10px;
    max-width: 400px;
    white-space: nowrap;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #333;
    text-decoration-line: none;
  }

  .topic_title:hover {
    text-decoration-line: underline
  }
  .content > li:hover {
    background-color: #f6f6f6;
  }

  img {
    max-width: 40px;
    border-radius: 3px;
    margin: 0 10px;
    float: left;
  }
  .last_active_time {
    font-size: 12px;
    color: #778087;
    margin-right: 30px;
    position: absolute;
    right: 8px;
  }
  .count_of_replies {
    font-size: 11px;
    color: #9e78c0;
  }

  .count_of_visits {
    font-size: 11px;
  }
  .count {
    width: 60px;
    display: inline-block;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .tab{
    background-color: #e5e5e5;
    color: #999;
    padding: 3px 4px;
    border-radius: 3px;
    font-size: 12px;
  }

  .tab_active {
    background: #80bd01;
    padding: 3px 4px;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
  }

  
</style>

