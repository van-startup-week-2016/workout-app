import { RestClient } from "twilio";
import { APP_CONFIG } from '../app-config';


/**
 * The twilio client.
 */
let twilioClient: RestClient;

/**
 * To avoid creating multiple clients, returns existing client or makes a new
 * one if one has not been created;
 */
const getTwilioClient = () => {
  return twilioClient ? twilioClient : new RestClient(APP_CONFIG.twilio.accountSid, APP_CONFIG.twilio.authToken);
};

/**
 *  For sending a message to the user.
 */
export const sendMessage = (toNumber: string, message: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    getTwilioClient().sendMessage({
      from: APP_CONFIG.twilio.from,
      to:   toNumber,
      body: message
    }, (err, response) => (err) ? reject(err) : resolve(response));
  });
}
