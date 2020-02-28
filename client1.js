var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', function(error, connection) {
    if (error) {
        throw error;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'ticket_callback';
        var msg = 'Hello world';
    
        channel.assertQueue(queue, {
            durable: true
        });
    
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });


    setTimeout(function() { 
        connection.close(); 
        process.exit(0) 
    }, 500);
})
