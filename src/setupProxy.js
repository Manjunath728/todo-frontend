const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config({ path: '.env.local' });

module.exports = function (app) {
  console.log('NODE_ENV:', process.env.NODE_ENV);

  if (process.env.NODE_ENV === 'development') {
    console.log('Development environment detected');
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: {
          '^/api':'', // Remove the '/api' prefix
        },
      })
    );
  }
  // You can add additional conditions for other environments (e.g., staging, production) if needed.
};
