import { API } from 'aws-amplify'
import { createTodo } from '~/src/graphql/mutations'
import { onCreateTodo } from '~/src/graphql/subscriptions'

export const state = () => ({
  todos: ''
})

export const mutations = {
  async create(state, content) {
    state.todos = content
    content = state.todos
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
}
