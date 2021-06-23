module.exports = {
    "testURL": "http://localhost:7357/jest/unit",
    "roots": [
      "<rootDir>"
    ],
    "moduleNameMapper": {
      "^vue$": "vue/dist/vue.common.js",
      "^@/(.*)$": "<rootDir>/src/$1",
    },
    "moduleFileExtensions": [ "js", "vue" ],
    "transform": {
      "^.+\\.js$": "babel-jest",
      "^.+\\.vue$": "vue-jest",
    },
    "clearMocks": true,
    "coverageReporters": [
      "text-summary",
      "lcov"
    ],
    "collectCoverage": true,
    "testTimeout": 30000,
  }
  