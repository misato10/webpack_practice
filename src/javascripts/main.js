// モジュールの読み込み
import Vue from 'vue';
import VueApp from'./VueApp.vue';

import my from './my.js';
import './reactApp.jsx';
import '../stylesheets/main.scss';

console.log('webpack');

import add from './add.ts';

console.log(add(3, 9));
console.log('This is index.js');

// モジュールを実行
my();


new Vue({
  el: '#vue-root',
  render: (h) => h(VueApp),
});