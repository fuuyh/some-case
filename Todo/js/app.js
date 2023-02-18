let filters = {
  all(todos) {
    return todos
  },
  active(todos) {
    return todos.filter(todo => !todo.completed)
  },
  completed(todos) {
    return todos.filter(todo => todo.completed)
  }
}

// 声明常量  用于本地存储中的保存数据的 键
const TODOS_KEY = 'todos_vue';
// 声明对象统一保存本地存储的处理功能
let todoStorage = {
  // 读取
  get () {
    return JSON.parse(localStorage.getItem(TODOS_KEY)) || []
  },
  // 更新
  set (todos) {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
  }
}


new Vue({
  el: '#app',
  data: {
    todos: todoStorage.get(),
    contents: '',
    todoType: 'all'
  },
  // 监听 数组 的变化并更新到 本地
  watch: {
    todos: {
      deep: true,
      handler: todoStorage.set
    }
  },
  // 个数展示
  computed: {
    // 处理筛选功能
    filteredTodo() {
      return filters[this.todoType](this.todos)
      // console.log(filters[this.todoType])

    },
    remaining() {
      // return filters.active(this.todos).length
      if (this.todoType === 'completed') {
        return filters.completed(this.todos).length
      } else {
        return filters.active(this.todos).length
      }
    }
  },
  methods: {
    // 单位处理
    pluralize() {
      return this.remaining === 1 ? 'item' : 'items';
    },
    // 新增todos 
    addTodo() {
      // 如果输入框为空 直接返回
      if (this.contents === '') return;
      // 不为空。添加到数组里
      this.todos.push({ id: this.todos.length + 1, title: this.contents, completed: false });
      // 添加完成后 清空
      this.contents = ''
    },
    deleteTodo(todo) {
      // 获得当前todo 的index 索引值
      let index = this.todos.indexOf(todo);
      this.todos.splice(index, 1)
    }
    // 删除数据
  }
})