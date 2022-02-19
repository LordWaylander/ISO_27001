module.exports = {
  apps : [{
    script: 'bin/www',
    watch: ['../'],
    watch_delay: 1000,
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      user : 'francois2',
      host : '45.130.221.100',
      path : '/home/francois2.itsense.xyz/public_html',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
