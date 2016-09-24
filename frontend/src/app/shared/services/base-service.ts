import { Observable } from "rxjs/Observable";
import { Http, Headers, Response, RequestOptions } from "@angular/http";


/**
 * Base service for avoiding duplicate code.
 *
 * All services that need to make HTTP requests should `extend` this service.
 *
 * WARNING: This should NOT be injected, but rather extended.
 */
export abstract class BaseService {

  constructor(protected httpService: Http) { }

  /**
   * Parses `dataResponse` as JSON.
   *
   * If `dataResponse` cannot be parsed as JSON, attempts to parse it as a
   * string, and if that fails as well simply attaches the `dataResponse` object
   * itself to a JSON object (under the `data` key).
   */
  protected extractData(dataResponse: Response): Object {
    let bodyAsJSON;

    try {
      bodyAsJSON = dataResponse.json();
    } catch(error) {
      try {
        // We should never be sending the client non-json data, but in case...
        bodyAsJSON = { data: dataResponse.text() };
      } catch (error) {
        bodyAsJSON = { data: dataResponse };
      }
    }
    return bodyAsJSON;
  }

  /**
   * Parses `errorResponse` as as JSON.
   *
   * If it cannot be parsed as JSON, attempt to parse it as string, and if that
   * fails as well, simply attaches the `errorResponse` object itself to a JSON
   * object (under the `errorResponse` key).
   */
  protected extractError(errorResponse: Response) {
    let errorAsJSON;

    try {
      errorAsJSON = errorResponse.json();
    } catch(error) {
      try {
        errorAsJSON = { message: errorResponse.text() };
      } catch(error) {
        errorAsJSON = { message: "Unknown error", errorResponse }
      }
    }

    return Observable.throw(errorAsJSON);
  }

  /**
   * Returns an http object with shortcuts for http methods, as well as some of
   * the work done for you such as setting the headers in a POST request.
   */
  protected http() {
    return {
      get: (url: string) => {
        return this.httpService.get(url);
      },
      post: (url: string, body: Object) => {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        const bodyAsString = JSON.stringify(body);

        return this.httpService.post(url, bodyAsString, options);
      }
    }
  }
}