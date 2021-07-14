import { API } from 'aws-amplify'
import { createTodo, deleteTodo } from '~/src/graphql/mutations'

export const state = () => ({
  content: '',
  id: ''
})

export const mutations = {
  async create(state, content) {
    state.content = content
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
  async remove(state, id) {
    state.id = id
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

export const actions = {
  create(context, content) {
    context.commit('create', content)
  },
  remove(context, id) {
    context.commit('remove', id)
  }
}
