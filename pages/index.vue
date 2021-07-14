<template>
  <section class="container">
    <div>  
      <amplify-authenticator>
        <h1>Todo App</h1>
        <p>
          <input type="text" name="content" v-model="content"/>
        </p>
        <div>
          <button @click="create(content)">save</button>
        </div>
        <ul>
          <li v-for="todo in todos" :key="todo.id">
            {{ todo.content }}
            <button @click="remove(todo.id)">×</button>
          </li>
        </ul>
        <amplify-sign-out></amplify-sign-out>
      </amplify-authenticator>
    </div>
  </section>
</template>

<script>
import { API } from 'aws-amplify';
import { onCreateTodo, onDeleteTodo } from '~/src/graphql/subscriptions';
import { listTodos } from '~/src/graphql/queries';

export default {
  data: function() {
    return {
      todos: [],
      content: '',
      signedIn: false
    }
  },
  async created() {
    await this.getTodos(),
    await this.createSubscribe()
    await this.deleteSubscribe()
  },

  methods: {
    async create(content) {
      if (!content) return
      this.$store.dispatch('create', content);
      this.content = ''
    },

    async getTodos() {
      const todos = await API.graphql({
        query: listTodos
      })
      this.todos = todos.data.listTodos.items
    },

    async remove(id) {
      this.$store.dispatch('remove', id)
    },

    async createSubscribe() {
      API.graphql({
          query:  onCreateTodo
        }).subscribe({
        next: (eventData) => {
          const todo = eventData.value.data.onCreateTodo
          this.todos = [...this.todos, todo]
        }
      })
    },

    async deleteSubscribe() {
      API.graphql({
        query: onDeleteTodo
      }).subscribe({
        next: (eventData) => {
          const todo = eventData.value.data.onDeleteTodo.id
          this.todos = this.todos.filter(item => item.id !== todo)
        }
      })
    },
  }
}
</script>
