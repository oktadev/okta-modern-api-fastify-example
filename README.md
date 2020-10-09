# Build a Modern API using Fastify and Node.js Example

This example project is for the blog post "[Build a Modern API using Fastify and Node.js](https://developer.okta.com/blog/2020/10/12/build-modern-api-using-fastify)."

This project requires:

* [Node.js](https://nodejs.org) version 12 or higher
* Free [Okta Developer](https://developer.okta.com/) account

## Setup

It would be best to follow the tutorial using the link above.

* Clone or download this project
* Run `npm install` to install dependencies

### Create an Okta application

1. Go to your Okta Developer Console and click **Applications**
1. Click **Add Application**
1. Select Service Machine-to-Machine
1. Name the application and click **Done** 
1. Make note of your application's **Client ID** and **Client secret**
1. Click on **API** navigation menu
1. Click **Authorization Servers**
1. Click on **Default**
1. Click on **Scopes**
1. Click **Add Scope** and name it `api`
1. Click on **Settings** and note your **Issuer URL**

### Local configuration

* Create a file named `.env` in the root of the project

```sh
OKTA_CLIENT_ID={yourClientID}
OKTA_ISSUER=https://{yourOktaOrgUrl}/oauth2/default
OKTA_AUDIENCE='api://default'
PORT=3000
```

* Copy your application's **Client ID** and your Okta Developer **Org URL** to the `.env` file

### Running server locally

* Launch server using `node index.js`
