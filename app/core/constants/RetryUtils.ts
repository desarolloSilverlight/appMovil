import {Observable, of, throwError} from 'rxjs';
import {delay, mergeMap, retryWhen} from 'rxjs/operators';

const getErrorMesasge = (maxRetry: number) => `Tried to load Resource over XHR for ${maxRetry} times without success. Giving up.`;


const DEFAULT_MAX_RETRIES = 5;
const DEFAULT_DELAY_MS = 1000;

export function delayedRetry(delayMs: number = DEFAULT_DELAY_MS, maxRetry: number = DEFAULT_MAX_RETRIES) {
  let retries = maxRetry;
  return (src: Observable<any>) => src.pipe(
    retryWhen((errors: Observable<any>) => errors.pipe(
      delay(delayMs),
      mergeMap(error => retries-- > 0 ? of(error) : throwError(getErrorMesasge(maxRetry)))
    ))
  );
}
