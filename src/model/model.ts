import {authenticate} from '../decorators';
import {Client} from '../mnubo';

export interface SimpleType {
  highLevelType: string;
}
export interface ComplexType {
  highLevelType: string;
  containerType: string;
}

export interface Timeseries {
  key: string;
  displayName: string;
  description: string;
  type: SimpleType;
}

export interface ObjectAttribute {
  key: string;
  displayName: string;
  description: string;
  type: ComplexType;
}

export interface OwnerAttribute {
  key: string;
  displayName: string;
  description: string;
  type: ComplexType;
}

export interface Sessionizer {
  key: string;
  displayName: string;
  description: string;
  startEventTypeKey: string;
  endEventTypeKey: string;
}

export interface EventType {
  key: string;
  description: string;
  origin: string;
  timeseries: Array<Timeseries>;
}

export interface ObjectType {
  key: string;
  description: string;
  objectAttributes: Array<ObjectAttribute>;
}

export interface Orphans {
  timeseries?: Array<Timeseries>;
  objectAttributes?: Array<ObjectAttribute>;
}

export interface DataModel {
  objectTypes: Array<ObjectType>;
  eventTypes: Array<EventType>;
  ownerAttributes: Array<OwnerAttribute>;
  sessionizers: Array<Sessionizer>;
  orphans: Orphans;
}

const basePath = '/api/v3/model';

export class Model {
  constructor(private client: Client) {

  }

  @authenticate
  export(query: object): Promise<DataModel> {
    return this.client.get(basePath + '/export')
  }
}
