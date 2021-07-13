<template>
  <section class="container">
    <h1>Todo App</h1>
    <p><input type="text" name="content" v-model="content"  @focus="set_flg"/></p>
    <div>
      <button @click="insert">save</button>
      <button @click="find">find</button>
    </div>
    <ul>
      <li v-for="(todo, index) in display_todos" :key="index">
        <span>{{ todo.content }}</span><span>({{ todo.created }})</span><span @click="remove(todo)">×</span>
      </li>
    </ul>
  </section>
</template>

<script>
import {mapState} from 'vuex';

export default {
  data: function() {
    return {
      content: '',
      find_flg: false
    }
  },
  computed: {
    ...mapState(['todos']),
    display_todos: function() {
      if(this.find_flg) {
        var arr = [];
        var data = this.todos;
        data.forEach(element => {
          if(element.content.toLowerCase() == this.content.toLowerCase()) {
            arr.push(element);
          }
        });
        return arr;
      } else {
        return this.todos;
      }
    }
  },
  methods: {
    insert: function() {
      this.$store.commit('insert', {content: this.content});
      this.content = '';
    },
    find: function() {
      this.find_flg = true;
    },
    set_flg: function() {
      if(this.find_flg) {
        this.find_flg = false;
        this.content = '';
      }
    },
    remove: function(todo) {
      this.$store.commit('remove', todo)
    }
  }
}
</script>
