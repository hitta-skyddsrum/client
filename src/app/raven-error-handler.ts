import { ErrorHandler } from '@angular/core';
import Raven = require('raven-js');

export class RavenErrorHandler implements ErrorHandler {
  public handleError(err: any): void {
    if (ENV !== 'development') {
      Raven.captureException(err.originalError || err);
    } else {
      console.error(err);
    }
  }
}
