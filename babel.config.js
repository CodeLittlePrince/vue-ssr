module.exports = {
  'presets': [
    [
      '@babel/env',
      {
        'targets': {
          'browsers': [
            '> 0.1%',
            'iOS >= 7.0',
            'Android >= 4.3'
          ]
        },
        'modules': false,
        'corejs': '2',
        'useBuiltIns': 'usage'
      }
    ]
  ],
  'plugins': [
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-object-rest-spread', { 'loose': true, 'useBuiltIns': true }], // babel-preset-env已依赖安装
    ['@babel/plugin-proposal-class-properties', { 'loose': true }]
  ],
  'env': {
    'test': {
      'plugins': [ 'istanbul' ]
    }
  }
}