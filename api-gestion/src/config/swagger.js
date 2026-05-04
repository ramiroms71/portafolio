const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'API gestion de proyectos',
            version:'1.0.0',
            description:'API REST para la gestion de proyectos',

        },
        servers:[
            {
                url: 'http://localhost:5000',
                description:'Servidor de desarrollo',
            },
        ],
        components:{
            schemas:{
                Usuario:{
                    type: 'object',
                    properties: {
                        id:         {type: 'integer', example:1},
                        nombre:     {type: 'string', example:'Ramiro Marca'},
                        email:      {type: 'string', example:'ramiro.marca71@gmail.com'},
                        createAt:   {type: 'string', format: 'date-time'}
                    },                 
                },
                crearUsuario: {
                    type: 'object',
                    require: ['nombre', 'email', 'password'],
                    properties: {
                        nombre:     {type: 'string', example:'Ramiro Marca'},
                        email:      {type: 'string', example:'ramiro.marca71@gmail.com'},
                        password:   {type: 'string', example: 'seguro123'}
                    },
                },
                actualizarUsuario:{
                    type: 'object',
                    properties: {
                        nombre:     {type: 'string', example:'Ramiro Marca'},
                        email:      {type: 'string', example:'ramiro.marca71@gmail.com'},
                        password:   {type: 'string', example: 'seguro123'}
                    },
                }
            },
        },
    },
    apis:['./src/routes/*.js'],
}

const swaggerSpec=swaggerJsdoc(options);

module.exports ={swaggerUi, swaggerSpec};