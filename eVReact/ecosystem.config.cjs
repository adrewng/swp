module.exports = {
  apps: [
    {
      name: 'Eviest',
      script: 'npm run preview -- --host',
      env: {
        PM2_SERVE_PATH: '.',
        PM2_SERVE_PORT: 8080
      }
    }
  ]
}
