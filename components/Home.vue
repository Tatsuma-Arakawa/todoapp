<template>
  <section class="container">
    <div>  
      <amplify-authenticator>
        <h1>Todo App</h1>
        <amplify-sign-out></amplify-sign-out>
        <p>
          <input type="text" name="content" v-model="content"/>
        </p>
        <div>
          <button @click="create(content)">save</button>
        </div>
        <ul>
          <li v-for="todo in todos" :key="todo.id">
            {{ todo.content }}
            <a class="delete-button" @click="remove(todo.id)">×</a>
          </li>
        </ul>
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
<style scoped>
input {
  width: 300px;
  margin: 20px;
  padding: 8px 4px;
  font-size: 16pt;
}

button {
  margin: 0 10px;
  padding: 4px 8px;
  font-size: 10pt;
}

ul {
  margin-top: 20px;
  padding: 0;
  text-align: center;
}

li {
  list-style: none;
  margin: 5px 0;
  font-size: 14pt;   
}

span {
  margin: 0 5px;
}

.delete-button {
   cursor: pointer;
}
</style>