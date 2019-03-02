import { IRoute } from '../../routes/models/route.interface';

export interface IWorkspace {
  id: string;
  name: string;
  description: string;
}

export interface IWorkspaceDetail extends IWorkspace {
  routes: IRoute[];
  user: string;
}
