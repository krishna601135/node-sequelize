import express from 'express'
import cluster from 'node:cluster';
import { databaseConnection } from './database';
import { endpoints } from './routes/endpoints';
const port = process.env.PORT;
const app = express();

app.use(express.json())

app.listen(port, () => {
    console.log("server is running at " + port);
});

if (process.env.IS_DEVELOPMENT) {
    databaseConnection.connectToDb();
} else {
    // utilizing multiple node instances to tackle mulltiple requests
    if (cluster.isPrimary) {
        const numCPUs = require('os').cpus().length;

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', () => {
            cluster.fork();
        })
    } else {
        databaseConnection.connectToDb();
    }

}

app.route('/v1/lib/health-check')
    .get((req, res) => {
        res.status(200).send("Server is Okay!");
    });
app.use('/v1', endpoints)

export default app;

