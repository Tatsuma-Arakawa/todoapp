<template>
  <section class="container">
    <h1>Todo App</h1>
    <p>
      <input type="text" name="content" v-model="content"  @focus="setFlag"/>
    </p>
    <div>
      <button @click="create">save</button>
      <button @click="find">find</button>
    </div>
    <ul>
      <li v-for="(todo, index) in displayTodos" :key="index">
        <span>{{ todo.content }}</span>
        <a @click="remove(todo)">×</a>
      </li>
    </ul>
  </section>
</template>

<script>
import {mapState} from 'vuex';
import { API, input } from 'aws-amplify';
import { createTodo } from '~/src/graphql/mutations';

export default {
  data: function() {
    return {
      content: '',
      findFlag: false
    }
  },
  computed: {
    ...mapState(['todos']),
    displayTodos: function() {
      if(this.findFlag) {
        const array = [];
        const data = this.todos;
        data.forEach(element => {
          if(element.content.toLowerCase() == this.content.toLowerCase()) {
            array.push(element);
          }
        });
        return array;
      } else {
        return this.todos;
      }
    }
  },
  methods: {
    create: function() {
      this.$store.commit('create', {content: this.content});
      this.content = '';
    },
    find: function() {
      this.findFlag = true;
    },
    setFlag: function() {
      if(this.findFlag) {
        this.findFlag = false;
        this.content = '';
      }
    },
    remove: function(todo) {
      this.$store.commit('remove', todo)
    }
  }
}
</script>
