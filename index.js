const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

require('./routes/api/kommuner')(app);
require('./routes/api/lan')(app);




const port = 5000;

app.listen(port,  ()=>console.log(`Server started on port ${port}`)); 