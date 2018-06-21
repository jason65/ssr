import todo from '../views/todo/todo.vue'
import login from '../views/login/login.vue'
import index from '../views/index.vue'
import app from '../app.vue'
export default [{
  path: '/todo',
  component: todo
}, {
  path: '/login',
  component: login
}, {
  path: '/',
  component: index
}]