import * as axiosDefault from 'axios';

const axios = axiosDefault.default;

export class UtilService {
  public async requestMovies(index: String) {
    const swapiEndpoint = `https://swapi.co/api/planets/${index}`;
    let filmsArray, films;

    try {
      filmsArray = await axios.get(swapiEndpoint).then(res => {
        return res.data;
      });

      films = {
        movies: filmsArray.films
      };
    } catch (err) {
      throw new Error(err);
    }

    return films;
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