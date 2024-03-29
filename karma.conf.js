// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-spec-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),

    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'), reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['spec', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
      browserNoActivityTimeout: 20000,
      customLaunchers: {
          ChromeHeadless: {
              base: 'Chrome',
              flags: [
                  '--headless',
                  '--disable-gpu',
                  '--no-sandbox',
                  '--remote-debugging-port=9222',
              ]
          }
      },
      specReporter: {
        maxLogLines: 5,             // limit number of lines logged per test
        suppressErrorSummary: true, // do not print error summary
        suppressFailed: false,      // do not print information about failed tests
        suppressPassed: false,      // do not print information about passed tests
        suppressSkipped: true,      // do not print information about skipped tests
        showSpecTiming: false,      // print the time elapsed for each spec
        failFast: false              // test would finish with error when a first fail occurs. 
      },
      browsers: ['PhantomJS'],
    singleRun: true
  });
};
