export interface IRoute {
  id: string;
  name: string;
  description: string;
  workspace: string;
  referTo?: string;
  payload?: any;
}