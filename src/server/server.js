import axios from 'axios';
import express from 'express';
import { ENV } from './config/appConfig';
import { connect } from './db';
import passportConfig from './config/passport';
import expressConfig from './config/express';
import routesConfig from './config/routes';
const app = express();

/*
Server with api endpoints
*/

/*
 * Database-specific setup
 * - connect to MongoDB using mongoose
 * - register mongoose Schema
 */
connect();

/*
 * REMOVE if you do not need passport configuration
 */
passportConfig();


/*
 * Bootstrap application settings
 */
expressConfig(app);

/*
 * REMOVE if you do not need any routes
 *
 * Note: Some of these routes have passport and database model dependencies
 */
routesConfig(app);

const clientConfig = {
  host: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || '3000'
};
// configure baseURL for axios requests (for serverside API calls)
axios.defaults.baseURL = `http://${clientConfig.host}:${clientConfig.port}`;

app.listen(app.get('port'));
