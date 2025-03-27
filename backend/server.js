const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const { readdirSync } = require('fs');
const path = require('path');
const { port } = require('./configs/configenv') || 6001;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

readdirSync('./routes').map((item) => app.use('/api' , require(`./routes/${item}`)));

app.use('/uploads/', express.static(path.join(__dirname, './uploads')));

app.listen(port , () => {
    console.log('Server is running on port ' + port); 
});