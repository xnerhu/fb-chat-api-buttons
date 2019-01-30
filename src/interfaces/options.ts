import { Application } from 'express';

export interface IOptions {
  app: Application;
  path: string;
  endpoint: string;
  api?: any;
}
