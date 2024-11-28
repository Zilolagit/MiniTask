import { createRouter, createWebHistory } from 'vue-router'
import UsersList from '../views/users/UsersList.vue'
import PostsList from '../views/PostsList.vue'
import CommentsList from '../views/CommentsList.vue'
import UserSingle from '@/views/users/UserSingle.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'users',
      component: UsersList
    },
    {
      path: '/users',
      name: 'userslist',
      component: UsersList
    },
    {
      path: '/users/:id',
      name: 'user-detail',
      component: UserSingle
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostsList
    },
    {
      path: '/comments',
      name: 'comments',
      component: CommentsList
    },
  ]
})

export default router
