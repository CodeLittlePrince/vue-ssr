import * as types from './mutation-types'

const mutations = {
  /* 增加年龄 */
  [types.AGE_INCREASE](state) {
    state.age ++
  },
  /* 获取问候语 */
  [types.SET_CREETING](state, greeting) {
    state.asyncData.greeting = greeting
  }
}

export default mutations