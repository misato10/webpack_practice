// モジュールの読み込み
import Vue from 'vue';
import VueApp from'./VueApp.vue';

import my from './my.js';
import './reactApp.jsx';
import '../stylesheets/main.scss';

console.log('webpack');

// モジュールを実行
my();


new Vue({
  el: '#vue-root',
  render: (h) => h(VueApp),
});