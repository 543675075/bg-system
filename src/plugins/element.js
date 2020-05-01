import Vue from 'vue'
import {
  Button, Form, FormItem, Input, Message, container, header, aside, main, Menu,
  Submenu,
  MenuItem,
  breadcrumb,
  breadcrumbItem,
  col,
  row,
  card,
  table,
  tableColumn,
  Switch,
  pagination,
  Dialog,
  Popconfirm
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
Vue.use(breadcrumb)
Vue.use(breadcrumbItem)
Vue.use(col)
Vue.use(row)
Vue.use(card)
Vue.use(table)
Vue.use(tableColumn)
Vue.use(Switch)
Vue.use(pagination)
Vue.use(Dialog)
Vue.use(Popconfirm)
Vue.prototype.$message = Message
