"use strict";

const OktaJwtVerifier = require( "@okta/jwt-verifier" );

const oktaJwtVerifier = new OktaJwtVerifier( {
  issuer: process.env.OKTA_ISSUER,
  clientId: process.env.OKTA_CLIENT_ID
} );

module.exports = async ( request, response ) => {
  const { authorization } = request.headers;

  if ( !authorization ) {
    response.code( 401 ).send();
  }

  const [ authType, token ] = authorization.trim().split( " " );

  try {
    const { claims } = await oktaJwtVerifier.verifyAccessToken( token, process.env.OKTA_AUDIENCE );

    if ( !claims ) {
      response.code( 401 ).send();
    }
    if ( !claims.scp.includes( "api" ) ) {
      response.code( 401 ).send();
    }
  }
  catch ( err ) {
    console.log( err );
    response.code( 401 ).send();
  }
};
