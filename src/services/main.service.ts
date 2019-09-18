import { Request, Response } from 'express';

export class MainService {
  public getMain(req: Request, res: Response) {
    res.send({
      apiName: 'Star Wars API',
      uptimeInS: process.uptime(),
      creator: 'Vinícius Menezes'
    });
  }
}