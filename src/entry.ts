import { createApp, h } from 'vue';

const version = __APP_VERSION__ as string;

console.log('R2 asset loaded OK', { version });

if (typeof document !== 'undefined') {
  const root = document.getElementById('app');
  if (root) {
    createApp({
      render() {
        return h('div', `TestWidget v${version}`);
      },
    }).mount(root);
  }
}
