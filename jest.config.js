module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/utils/utils.ts',
    '<rootDir>/src/resolvers/**/*'
  ],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: ['<rootDir>/src/resolvers/common/'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testRegex: '(/__tests__/.*|\\.(spec))\\.(ts|tsx|js)$',
  testPathIgnorePatterns: ['<rootDir>/dist/']
};
