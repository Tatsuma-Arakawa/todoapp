<template>
  <section class="container">
    <h1>Todo App</h1>
    <p>
      <input type="text" name="content" v-model="content"  @focus="setFlag"/>
    </p>
    <div>
      <button @click="create(content)">save</button>
    </div>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.content }}
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { API, input } from 'aws-amplify';
import { onCreateTodo } from '~/src/graphql/subscriptions'
import { listTodos } from '~/src/graphql/queries'

export default {
  data: function() {
    return {
      content: '',
      findFlag: false,
      todos: []
    }
  },
  async created() {
    await this.getTodos(),
    await this.subscribe()
  },
  methods: {
    async create(content) {
      if (!content) return
      this.$store.commit('create', content);
      this.content = ''
    },

    async subscribe() {
      API.graphql({ query:  onCreateTodo }).subscribe({
        next: (eventData) => {
          const todo = eventData.value.data.onCreateTodo
          this.todos = [...this.todos, todo]
        }
      })
    },

    async getTodos() {
      const todos = await API.graphql({
        query: listTodos
      })
      this.todos = todos.data.listTodos.items
    },

    async find() {
      this.findFlag = true;
    },
    async setFlag() {
      if(this.findFlag) {
        this.findFlag = false;
        this.content = '';
      }
    },
    async remove(todo) {
      this.$store.commit('remove', todo)
    }
  }
}
</script>
