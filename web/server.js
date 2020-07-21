const express = require('express');
const app = express();

const port = 3000;
const base = `${__dirname}/public`

app.use(express.static('public'))

app.get('/', function (req, res) {
    res.sendFile(`${base}/device-list.html`);
   });

// server listen
app.listen(port, () => {
 console.log(`listening on port ${port}`);
});