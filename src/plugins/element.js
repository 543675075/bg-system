import Vue from 'vue'
import {
  Button, Form, FormItem, Input, Message, container, header, aside, main, Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(container)
Vue.use(header)
Vue.use(aside)
Vue.use(main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.prototype.$message = Message
