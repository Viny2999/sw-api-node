import { LoggerService } from '.';
import Cache from 'node-cache';

export class CacheService {
  private readonly cache = new Cache();
  private readonly logger = LoggerService.getLogger();

  public set(key: string, obj: any, time: number = 0): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache.set(key, obj, time, (err, sucess) => {
        if (err) {
          this.logger.error('CacheService :: setCache :: Error');
          reject(err);
        } else {
          this.logger.debug('CacheService :: setCache :: cacheSeted');
          resolve(sucess);
        }
      })
    })
  }

  public get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache.get(key, (err, value) => {
        if (err) {
          this.logger.error('CacheService :: getCache :: Error ', err);
          reject(err);
        } else {
          this.logger.debug(`CacheService :: getCache :: ${JSON.stringify(value, null, 2)}`);
          resolve(value);
        }
      })
    })
  }
}
