// module.exports = {
//   mongoURI: 'mongodb://andrew:andrew1@ds239968.mlab.com:39968/mentorcrowd',
//   secretOrKey: "secret"
// }
if(process.env.NODE_ENV === 'production'){
  module.exports = require('./keys_prod');
}else{
  module.exports = require('./keys_dev');
}