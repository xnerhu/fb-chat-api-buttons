import { Application } from 'express';

/**
 * @param app An express application
 * @param path Callback route path. Default /callback
 * @param endpoint Public callback endpoint e.g https://www.example.com/callback
 * @param api Facebook chat api
 */
export interface IOptions {
  app: Application;
  path?: string;
  endpoint: string;
  api?: any;
}
