const express = require('express');
const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer();

const app = express();

const vm = new Vue({
  render(h) {
    return h('div', 'hi there');
  }
});

app.get('*', (req, res) => {
  const stream = renderer.renderToStream(vm);

  res.write('<html><head><title>Some Title</title></head><body>');

  stream.on('data', chunk => {
    res.write(chunk);
  });

  stream.on('end', () => {
    res.end('</body></html>');
  });
});

app.listen(4000, () => {
  console.log('Server started');
});
