import Vue from 'vue'
import VueRouter from 'vue-router';

import memoList from './components/memoList';
import addMemo from './components/addMemo';

Vue.use(VueRouter);

const routes = [
  { path: '', redirect: '/todos'},
  { path: '/todos', component: memoList },
  { path: '/todos/add', component: addMemo}
]

export default new VueRouter({ routes })