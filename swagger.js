const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Crud Api',
        description: 'Crud Api'
    },
    host: 'localhost:3001',
    schemes: ['https', 'http']
  };

  const outputFile = './swagger.json';
  const endpointsFiles = ['./routes/index.js'];

  // this will generate swagger.json
  swaggerAutogen(outputFile, endpointsFiles, doc);