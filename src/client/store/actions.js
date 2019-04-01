import * as types from './mutation-types'
import ajax from 'plugins/ajax'

/* 增加年龄 */
export const ageIncrease = function ({commit}) {
  setTimeout(() => {
    commit(types.AGE_INCREASE)
  }, 3000)
}

/* 设置asyncData */
export const setGreeting = function ({commit}) {
  return ajax.get('/api/home/greeting')
    .then(res => {
      commit(types.SET_CREETING, res.greeting)
    })
    .catch(err => {
      console.log(err)
    })
}