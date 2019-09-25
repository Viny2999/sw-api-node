import { Request, Response } from 'express';
import { UtilService } from '.';

export class MainService {
  public getMain(req: Request, res: Response) {
    console.info('MainService :: getMain :: Status of application retrivied');
    res.send({
      apiName: 'SW-API',
      uptimeInSeconds: process.uptime(),
      uptimeInHours: UtilService.prototype.formatMinutesToHours(process.uptime()),
      creator: 'Vinicius Menezes',
      endpoints: {
        planets: `${req.protocol}://${req.headers.host}/planets`,
      }
    });
  }
}