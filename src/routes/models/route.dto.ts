export class CreateRouteDto {
  readonly name: string;
  readonly description: string;
  readonly workspace: string;
}

export class PatchRouteDto extends CreateRouteDto {
  readonly id: string;
  readonly payload: any;
}