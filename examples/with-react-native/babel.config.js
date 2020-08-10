module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    test: {
      plugins: [
        ['istanbul', {
          exclude: [
            '**',
            '!**/node_modules/rehabjs/dist/**',
          ]
        }]
      ]
    }
  }
};
