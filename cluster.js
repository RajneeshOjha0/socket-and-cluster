const express = require('express');
const cluster = require('cluster');
const os = require('os');


const totalCPUs = os.cpus().length;


if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else{
    // console.log(totalCPUs);
    const app = express();

    const port = 3000;
    app.listen(port, () => {
        console.log(`Worker ${process.pid} started`);
    })

    app.get('/', (req, res) => {
        res.send('Hello from the server!' + `on processid ${process.pid}`);
    });

}


