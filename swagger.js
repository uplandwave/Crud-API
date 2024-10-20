const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Crud Api',
        description: 'Crud Api'
    },
    host: 'crud-api-nseo.onrender.com',
    schemes: ['https', 'http']
  };

  const outputFile = './swagger.json';
  const endpointsFiles = ['./routes/index.js'];

  // this will generate swagger.json
  swaggerAutogen(outputFile, endpointsFiles, doc);