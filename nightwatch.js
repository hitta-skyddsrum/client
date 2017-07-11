const env = require('env2')('./.env');

let nightwatch_config = {
  "src_folders" : ["src/tests/e2e"],
  "output_folder" : "reports",
  "custom_commands_path" : "",
  "custom_assertions_path" : "",
  "page_objects_path" : "",
  "globals_path" : "",

  "selenium" : {
    "start_process" : false,
    "host" : process.env.SELENIUM_HOST,
    "port" : process.env.SELENIUM_PORT
  },

  "test_settings" : {
    "default": {
      "launch_url": process.env.NIGHTWATCH_LAUNCH_URL,
      "desiredCapabilities": {
        "browserName": "chrome"
      },
      "exclude": ["src/tests/e2e/*.no-geo.*"]
    },
    
    "chrome:no-geo": {
      "desiredCapabilities": {
        "chromeOptions": {
          "prefs": {
            "profile.default_content_setting_values.geolocation": 2
          }
        }
      },
      "exclude": [""],
      "filter": "shelters.no-geo.e2e.js"
    }
  },
};

// Code to copy seleniumhost/port into test settings
for(let i in nightwatch_config.test_settings){
  let config = nightwatch_config.test_settings[i];
  config['selenium_host'] = nightwatch_config.selenium.host;
  config['selenium_port'] = nightwatch_config.selenium.port;
}

module.exports = nightwatch_config;
