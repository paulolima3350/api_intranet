module.exports = {
    apps : [
        {
          name: "intranet_2023",
          script: "./server.js",
          watch: true,
          env: {
              "PORT": 3000,
              "NODE_ENV": "development"
          },
          env_production: {
              "PORT": 3057,
              "NODE_ENV": "production",
          }
        }
    ]
  }