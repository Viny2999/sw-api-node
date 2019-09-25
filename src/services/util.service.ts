import { CacheService } from ".";
import axios from 'axios';

const cacheService = new CacheService();

export class UtilService {
  public async requestMovies(index: Number) {
    try {
      let filmsCached = await cacheService.get(`${index}`);
      if (filmsCached) {
        return filmsCached;
      }

      const swapiEndpoint = `https://swapi.co/api/planets/${index}`;
      const filmsArray = await axios.get(swapiEndpoint).then(res => {
        return res.data;
      });
      const films = {
        movies: filmsArray.films
      };

      await cacheService.set(`${index}`, films, 5000);

      return films;
    } catch (err) {
      throw new Error(err);
    }
  }

  public formatMinutesToHours(uptime: number) {
    function pad(s) {
      return (s < 10 ? '0' : '') + s;
    }
    let hours = Math.floor(uptime / (60 * 60));
    let minutes = Math.floor(uptime % (60 * 60) / 60);
    let seconds = Math.floor(uptime % 60);

    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
  }
}