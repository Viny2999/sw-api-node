import { Entity, model, property } from '@loopback/repository';

@model()
export class PlanetModel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true
  })
  _id: string;

  @property({
    type: 'number',
    id: true,
    generated: true
  })
  index: number;

  @property({
    type: 'string',
    required: true
  })
  name: string;

  @property({
    type: 'string'
  })
  climate: string;

  @property({
    type: 'string'
  })
  terrain: string;

  constructor(data?: Partial<PlanetModel>) {
    super(data);
  }
}
