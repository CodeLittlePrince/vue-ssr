// 引入mockjs来模拟数据
// https://github.com/nuysoft/Mock/wiki/Getting-Started
const Mock = require('mockjs')
const data = Mock.mock({
  'list|1-10': [{
    'id|+1': 1
  }]
})
const img = Mock.Random.image('200x100')

// 返回的结果处理
module.exports = () => {
  // 返回最终结果（配合mockSwitch）
  return {
    message: 'error message',
    result: {
      '@success': {
        msg: 'mock hello api for success',
        data: data,
        imgUrl: img
      },
      '@error': {
        msg: 'mock hello api for error'
      }
    },
    '@good': {
      status: '200'
    },
    '@bad': {
      status: '401'
    }
  }
}