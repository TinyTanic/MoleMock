export interface IRoute {
  id: string;
  name: string;
  description: string;
  workspace: string;
  payload?: any;
}