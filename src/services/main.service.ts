import { Request, Response } from 'express';
import { UtilService } from '.';

export class MainService {
  public getMain(req: Request, res: Response) {
    res.send({
      apiName: 'Star Wars API',
      uptime: process.uptime(),
      uptimeInHours: UtilService.prototype.formatMinutesToHours(process.uptime()),
      creator: 'Vinícius Menezes'
    });
  }
}