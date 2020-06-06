import Vue from 'vue'
import VueRouter from 'vue-router';

import memoList from './components/memoList';
import addMemo from './components/addMemo';

Vue.use(VueRouter);

const routes = [
  { path: '', redirect: '/memos'},
  { path: '/memos', component: memoList },
  { path: '/memos/add', component: addMemo}
]

export default new VueRouter({ routes })