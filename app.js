const express = require("express"); 
const routes = require("./routes/routes");

const app = express();
const PORT = 3200;
const WELCOME_FILE = __dirname + '/public/html/index.html';

app.use(express.json());
app.use(express.static('public'));

app.use('/api',routes);
app.use((request, response) => response.sendFile(WELCOME_FILE));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));