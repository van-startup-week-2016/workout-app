/// Module for app encapsulating app configuration.

/**
 * Config for the backend.
 */
export const APP_CONFIG = {
  "app": {
    "baseUrl": "https://example.com", // TODO UPDATE
    "secondsBeforeReloginNeeded": 1000 * 60 * 60 * 24 * 365 * 10,
    "expressSessionSecretKey": "changeThisSecretKey", // TODO UPDATE
    "isHttps": false,
    "port": 3000,
    "apiSuffix": "/api"
  },
  "db": {
    "url": "mongodb://localhost:27017/dbName>" // TODO UPDATE
  },
  "twilio":  {
    "from": "6043300586",
    "accountSid": "ACd3c7c4dfeb4f433bbae647094a5a1ef0",
    "authToken": "c18d28efa0bb999da2567de173406b39"
  }
}
