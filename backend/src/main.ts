/// <reference path="../typings_manual/index.d.ts" />

import 'babel-polyfill';
import './global_augmentations';

import { server } from './server';
import { APP_CONFIG } from '../app-config';
import { startCoaching } from './coach';

const minutesBeforeRescan = 0.5;

server.listen(APP_CONFIG.app.port);
console.log(`Running app on port ${APP_CONFIG.app.port}`);
startCoaching(minutesBeforeRescan);
console.log("Coach is awake!");