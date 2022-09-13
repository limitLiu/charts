/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testMatch: ['**/__tests__/**/*.spec.ts'],
  runner: 'jest-electron/runner',
  testEnvironment: 'jest-electron/environment'
};
