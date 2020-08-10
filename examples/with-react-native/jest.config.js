const rehabPath = './node_modules/rehabjs/dist';

module.exports = {
  preset: "react-native",
  transformIgnorePatterns: [],
  collectCoverage: true,
  collectCoverageFrom: [rehabPath],
  coverageDirectory: '../../coverage/with-react-native',
  coverageReporters: [
    ["lcov", { projectRoot: rehabPath }],
  ],
};
