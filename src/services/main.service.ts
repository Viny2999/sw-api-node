import { Request, Response } from 'express';
import { UtilService } from '.';

const projectName = process.env.PROJECT_NAME || "";
const cratorName = process.env.CREATOR_NAME || "";
const utilService = new UtilService();

export class MainService {
  public getMain(req: Request, res: Response) {
    console.info('MainService :: getMain :: Status of application retrivied');
    res.send({
      apiName: projectName,
      uptimeInSeconds: process.uptime(),
      uptimeInHours: utilService.formatMinutesToHours(process.uptime()),
      creator: cratorName,
      endpoints: {
        planets: `${req.protocol}://${req.headers.host}/planets`,
      }
    });
  }
}