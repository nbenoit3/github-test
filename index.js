const express = require('express');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const getRepo = require('./src/handler/githubURL.js');


const startServer = async () => {
const app = express();

const swaggerDocument = yaml.load('./docs/swagger.yaml');

app.use(express.json())

app.get('/ping', (_, res) => res.json({ status: 'Healthy' }))

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.post('/githubURL', getRepo)

app.listen(3000, () => console.log(`Listening at http://localhost:${3000}`))

};

startServer();



