if(process.env.NODE_ENV === 'production'){
    module.exports = require('./credentials_prod');
  }else{
    module.exports = require('./credential_dev');
  }