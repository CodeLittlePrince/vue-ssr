module.exports = [
  // 主页-hello 用到了运行时控制success和error
  {
    url: '/home/hello',
    selections: [
      {
        name: '成功',
        value: `[
          result [@success [@hello]],
          @good
        ]`
      },
      {
        name: '失败',
        value: `[
          result [@error],
          @bad
        ]`
      }
    ]
  }
]