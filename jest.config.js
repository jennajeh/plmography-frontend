module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    './src/setupTestServer',
  ],
  transform: {
    '^.+\\.jsx?$': ['@swc/jest', {
      jsc: {
        parser: {
          jsx: true,
        },
        transform: {
          react: {
            runtime: 'automatic',
          },
        },
      },
    }],
  },

  moduleNameMapper: {
    '.+\\.(css|style|less|sass|scss|png|jpg|jpeg|ttf|woff|woff2)$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
};
