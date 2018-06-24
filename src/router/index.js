import Vue from 'vue'
import Router from 'vue-router'
import PostList from '../components/PostList'
import Article from '../components/Article'
import Userinfo from '../components/Userinfo'
import Sidebar from '../components/Sidebar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'root',
      path: '/',
      components: {
        main:PostList
      }
    },
    {
      name: 'post_content',
      path: '/topic/:id&author=:name',
      components: {
        main:Article,
        sidebar: Sidebar
      }
    },
    {
      name: 'user_info',
      path: '/user/:username',
      components: {
        main: Userinfo
      }
    }
  ]
})

