import { createApp } from 'vue';
import Widget from './Widget.vue';

if (typeof document !== 'undefined') {
  const root = document.getElementById('app');
  if (root) {
    createApp(Widget).mount(root);
  }
}
