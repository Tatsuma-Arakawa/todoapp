import { API } from 'aws-amplify'
import { createTodo, deleteTodo } from '~/src/graphql/mutations'
import { listTodos } from '~/src/graphql/queries';

export const state = () => ({
  todos: [{
    content: "",
    id: ""
  }]
})

export const getters = {
  todos: state => state.todos
}

export const mutations = {
  setState(state, { content=state.todos.content, id=state.todos.id }) {
    state.todos.content = content
    state.todos.id = id
  }
}

export const actions = {

  async create({ commit }, content) {
    commit('setState', content)
    await API.graphql({
      query: createTodo,
      variables: {
        input: {
          content: content
        }
      }
    }).catch((e) => {
      console.log(e)
    })
  },

  async remove({ commit }, id) {
    commit('setState', id)
    await API.graphql({
      query: deleteTodo,
      variables: {
        input: {
          id: id
        }
      }
    })
  }
}
