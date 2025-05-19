module.exports = {
  apps: [{
    name: 'all-stars',
    port: 5567,
    instances : "max",
    exec_mode : "cluster",
    script: './node_modules/nuxt/bin/nuxt.js',
    args: 'start'
  }]
}
