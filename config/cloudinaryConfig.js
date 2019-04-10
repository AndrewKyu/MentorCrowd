const { config, uploader } = require('cloudinary');

const cloudinaryConfig = () =>
   config({
      cloud_name: 'dnqzsx0t6',
      api_key: '543979593383162',
      api_secret: 'RxnoSS-xWEg2-9e-2S5YtL7yfXo',
   });

module.exports = { cloudinaryConfig, uploader };