import Vue from 'vue'
import App from './App.vue'
import router from '@/route/index'
import store from '@/store/index'
import VModal from 'vue-js-modal'
import 'echarts/map/js/china.js'
import VueDraggableResizable from '@/components/draggable/vue-draggable-resizable.vue'
import 'components/draggable/vue-draggable-resizable.css'
import 'assets/styles/_vue_modal_edit.scss'
import 'video.js/dist/video-js.css'

Vue.config.productionTip = false
Vue.use(VModal, { dynamic: true, injectModalsContainer: true })
Vue.component('vue-draggable-resizable', VueDraggableResizable)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
