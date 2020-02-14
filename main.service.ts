import { Request, Response } from 'express';
import { UtilService, LoggerService } from '.';

export class MainService {
  private readonly logger = LoggerService.getLogger();

  public getMain(req: Request, res: Response) {
    this.logger.info('MainService :: getMain :: Status of application retrivied');
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