import Cache from 'node-cache';

export class CacheService {
  public readonly cache = new Cache();

  public set(key: string, obj: any, time: number = 0): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache.set(key, obj, time, (err, sucess) => {
        if (err) {
          console.error('CacheService :: setCache :: Error');
          reject(err);
        } else {
          console.info('CacheService :: setCache :: cacheSeted');
          resolve(sucess);
        }
      })
    })
  }

  public get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache.get(key, (err, value) => {
        if (err) {
          console.error('CacheService :: getCache :: Error ', err);
          reject(err);
        } else {
          console.info(`CacheService :: getCache :: ${JSON.stringify(value, null, 2)}`);
          resolve(value);
        }
      })
    })
  }
}
