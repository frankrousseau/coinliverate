const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const colors = require('colors');
const client = require('request-json').createClient(
  'https://api.coinmarketcap.com/v1/'
)

const app = express();

app.use(express.static('frontend/dist'))

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
let currentResults = [];

const printResults = (results) => {
  const Table = require('cli-table')
  const table = new Table([
    'Name',
    'Symbol',
    'Price',
    'Change 1h',
    'Change 7h'
  ]);
  console.log("*********");
  results.forEach((result) => {
    const change_1h = result.percent_change_1h
    const change_24h = result.percent_change_24h
    table.push([
      result.name,
      result.symbol,
      Math.floor(result.price_eur * 100) / 100,
      change_1h > 0 ? change_1h.green : change_1h.red,
      change_24h > 0 ? change_24h.green : change_24h.red,
    ]);
  })
  console.log(table.toString());
};

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on('connection', function connection(ws, req) {
  console.log('new connection: ' + req.connection.remoteAddress);
  ws.send(JSON.stringify(currentResults));
});


client.get('ticker/?convert=EUR&limit=20', (err, res, results) => {
  if (err) return console.log(err);
  currentResults = results;
  // printResults(results)
});


setInterval(() => {
  client.get('ticker/?convert=EUR&limit=20', (err, res, results) => {
    if (err) return console.log(err);
    // printResults(results)
    currentResults = results;
    wss.broadcast(results);
  })
}, 1000 * 10);

server.listen(5555, () => {
  console.log('Listening on %d', server.address().port);
});
