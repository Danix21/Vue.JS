const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost/vuemongo')
    .then(db => console.log('DB esta conectada'))
    .catch(err => console.log(err))

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/personas', require('./routes/personas'));
app.use('/api/palabras', require('./routes/palabras'));

// Static files
app.use(express.static(__dirname + '/public'));

// Server is listening
app.listen(app.get('port'), ()=>{
    console.log('Server on port ' + app.get('port'));
});