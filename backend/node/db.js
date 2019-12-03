var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin123@ds029939.mlab.com:29939/stock_database', { useNewUrlParser: true })

mongoose.connection.on('connected', function() {
    console.log('Mongoose default connect open');
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connect error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connect disconnected')
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnect through app termination');
        process.exit(0);
    });
});