const env = require('env2')('./.env');

var nightwatch_config = {
  "src_folders" : ["src/tests/e2e"],
  "output_folder" : "reports",
  "custom_commands_path" : "",
  "custom_assertions_path" : "",
  "page_objects_path" : "",
  "globals_path" : "",

  "selenium" : {
    "start_process" : false,
    "host" : "hub-cloud.browserstack.com",
    "port" : 80
  },

  "test_settings" : {
    "default": {
      "launch_url" : process.env.NIGHWATCH_BROWSERSTACK_LAUNCH_URL,
      "desiredCapabilities": {
        "build": "nightwatch-browserstack",
        "browserstack.user": process.env.BROWSERSTACK_USERNAME,
        "browserstack.key": process.env.BROWSERSTACK_KEY,
        "browserstack.debug": true,
        "browser": "chrome"
      },
      "screenshots" : {
        "enabled" : true,
        "path" : "",
        "on_failure" : true,
        "on_error" : true,
      },
    },
    "chrome:no-geo" : {
      "desiredCapabilities": {
        "chromeOptions": {
          "prefs": {
            "profile.default_content_setting_values.geolocation": 2
          }
        }
      },
      "exclude": ["src/tests/e2e/*.geo.*"]
    },
    "firefox:no-geo" : {
      "desiredCapabilities": {
        "browser": "chrome"
      },
      "exclude": ["src/tests/e2e/*.geo.*"]
    },
    "edge:no-geo" : {
      "desiredCapabilities": {
        "browser": "edge"
      },
      "exclude": ["src/tests/e2e/*.geo.*"]
    }
  }
};

// Code to copy seleniumhost/port into test settings
for(var i in nightwatch_config.test_settings){
  var config = nightwatch_config.test_settings[i];
  config['selenium_host'] = nightwatch_config.selenium.host;
  config['selenium_port'] = nightwatch_config.selenium.port;
}

module.exports = nightwatch_config;
