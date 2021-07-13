export const state = () => ({
  todos: []
})

export const mutations = {
  create: function(state, text) {
    state.todos.unshift({
      content: text.content,
    })
  },
  remove: function(state, obj) {
    for(let i = 0; i < state.todos.length; i++) {
      const ob = state.todos[i];
      if(ob.content == obj.content ) {
        alert('削除しました');
        state.todos.splice(i, 1);
        return;
      }
    }
  }
}
