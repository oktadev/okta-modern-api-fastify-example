"use strict";

require( "dotenv" ).config();
const jwtVerifier = require( "./jwtVerifier" );

const fastify = require( "fastify" )( { logger: true } );
const fs = require( "fs" );
const util = require( "util" );

const readFile = util.promisify( fs.readFile );

fastify.route( {
  method: "GET",
  url: "/employees",
  schema: {
    response: {
      200: {
        type: "array",
        properties: {
          userId: { type: "string" }
        }
      }
    }
  },
  preHandler: async ( request, reply ) => {
    return jwtVerifier( request, reply );
  },
  handler: async ( request, reply ) => {
    const obj = JSON.parse( await readFile( "sample-data.json", "utf8" ) );
    return obj.Employees;
  }
} );

fastify.route( {
  method: "GET",
  url: "/employees/:userId",
  schema: {
    querystring: {
      userId: { type: "string" }
    }
  },
  preHandler: async ( request, reply ) => {
    return jwtVerifier( request, reply );
  },
  handler: async ( request, reply ) => {
    const obj = JSON.parse( await readFile( "sample-data.json", "utf8" ) );
    const employee = obj.Employees.find( r => r.userId === request.params.userId );

    if ( !employee )
      return reply.code( 404 ).send();

    return employee;
  }
} );

const start = async () => {
  try {
    await fastify.listen( process.env.PORT );
    fastify.log.info( `server listening on ${ fastify.server.address().port }` );
  } catch ( err ) {
    fastify.log.error( err );
    process.exit( 1 );
  }
};

start();
