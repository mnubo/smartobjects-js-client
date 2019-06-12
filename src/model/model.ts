import { authenticate } from '../decorators';
import { Client } from '../mnubo';

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

export interface SingleTimeseries {
  key: string;
  displayName: string;
  description: string;
  type: SimpleType;
  eventTypeKeys: Array<string>;
}

export interface SingleObjectAttribute {
  key: string;
  displayName: string;
  description: string;
  type: ComplexType;
  objectTypeKeys: Array<string>;
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
  displayName: string;
  description: string;
  origin: string;
  timeseries: Array<Timeseries>;
}

export interface SingleEventType {
  key: string;
  displayName: string;
  description: string;
  origin: string;
  timeseriesKeys: Array<string>;
}

export interface ObjectType {
  key: string;
  displayName: string;
  description: string;
  objectAttributes: Array<ObjectAttribute>;
}

export interface SingleObjectType {
  key: string;
  displayName: string;
  description: string;
  objectAttributesKeys: Array<string>;
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

export interface EntityOps<A> {
  create(values: Array<A> | A): Promise<void>;
  update(key: string, update: { displayName: string; description: string }): Promise<void>;

  generateDeployCode(key: string): Promise<string>;
  applyDeployCode(key: string, code: string): Promise<void>;
  deploy(key: string): Promise<void>;
}

export interface TypeOps<A> {
  create(values: Array<A> | A): Promise<void>;
  update(key: string, update: A): Promise<void>;
  delete(key: string): Promise<void>;
  addRelation(key: string, entityKey: string): Promise<void>;
  removeRelation(key: string, entityKey: string): Promise<void>;
}

export interface ResetOps {
  generateResetCode(): Promise<string>;
  applyResetCode(code: string): Promise<void>;
  reset(): Promise<void>;
}

export interface SandboxOnlyOps {
  timeseriesOps: EntityOps<SingleTimeseries>;
  ownerAttributesOps: EntityOps<OwnerAttribute>;
  objectAttributesOps: EntityOps<SingleObjectAttribute>;

  objectTypesOps: TypeOps<SingleObjectType>;
  eventTypesOps: TypeOps<SingleEventType>;
  resetOps: ResetOps;
}

const basePath = '/api/v3/model';

class EntityOpsImpl<A> implements EntityOps<A> {
  constructor(private client: Client, private path: string) {}

  @authenticate
  create(value: Array<A> | A): Promise<void> {
    const valueArray: Array<A> = Array.isArray(value) ? value : [value];
    return this.client.post(`${basePath}${this.path}`, valueArray);
  }

  @authenticate
  update(key: string, update: { displayName: string; description: string }): Promise<void> {
    return this.client.put(`${basePath}${this.path}/${key}`, update);
  }

  @authenticate
  generateDeployCode(key: string): Promise<string> {
    return this.client
      .post(`${basePath}${this.path}/${key}/deploy`, null)
      .then((response: { code: string }) => response.code);
  }

  @authenticate
  applyDeployCode(key: string, code: string): Promise<void> {
    return this.client.post(`${basePath}${this.path}/${key}/deploy/${code}`, null);
  }

  @authenticate
  deploy(key: string): Promise<void> {
    return this.generateDeployCode(key).then((code) => this.applyDeployCode(key, code));
  }
}

class TypeOpsImpl<A> implements TypeOps<A> {
  constructor(private client: Client, private path: string, private entityPath: string) {}

  @authenticate
  create(value: Array<A> | A): Promise<void> {
    const valueArray: Array<A> = Array.isArray(value) ? value : [value];
    return this.client.post(`${basePath}${this.path}`, valueArray);
  }

  @authenticate
  update(key: string, update: A): Promise<void> {
    return this.client.put(`${basePath}${this.path}/${key}`, update);
  }

  @authenticate
  delete(key: string): Promise<void> {
    return this.client.delete(`${basePath}${this.path}/${key}`);
  }

  @authenticate
  addRelation(key: string, entityKey: string): Promise<void> {
    return this.client.post(`${basePath}${this.path}/${key}${this.entityPath}/${entityKey}`, null);
  }

  @authenticate
  removeRelation(key: string, entityKey: string): Promise<void> {
    return this.client.delete(`${basePath}${this.path}/${key}${this.entityPath}/${entityKey}`);
  }
}
class ResetOpsImpl implements ResetOps {
  constructor(private client: Client) {}

  @authenticate
  generateResetCode(): Promise<string> {
    return this.client.post(`${basePath}/reset`, null).then((response: { code: string }) => response.code);
  }

  @authenticate
  applyResetCode(code: string): Promise<void> {
    return this.client.post(`${basePath}/reset/${code}`, null);
  }

  @authenticate
  reset(): Promise<void> {
    return this.generateResetCode().then((code) => this.applyResetCode(code));
  }
}

export class Model {
  public sandboxOps: SandboxOnlyOps;
  constructor(private client: Client) {
    const timeseriesPath = '/timeseries';
    const objectAttributesPath = '/objectAttributes';
    this.sandboxOps = {
      timeseriesOps: new EntityOpsImpl<Timeseries>(client, timeseriesPath),
      ownerAttributesOps: new EntityOpsImpl<OwnerAttribute>(client, '/ownerAttributes'),
      objectAttributesOps: new EntityOpsImpl<ObjectAttribute>(client, objectAttributesPath),

      objectTypesOps: new TypeOpsImpl<SingleObjectType>(client, '/objectTypes', objectAttributesPath),
      eventTypesOps: new TypeOpsImpl<SingleEventType>(client, '/eventTypes', timeseriesPath),
      resetOps: new ResetOpsImpl(client),
    };
  }

  @authenticate
  export(): Promise<DataModel> {
    return this.client.get(basePath + '/export');
  }

  @authenticate
  getTimeseries(): Promise<Array<Timeseries>> {
    return this.client.get(basePath + '/timeseries');
  }

  @authenticate
  getOwnerAttributes(): Promise<Array<OwnerAttribute>> {
    return this.client.get(basePath + '/ownerAttributes');
  }

  @authenticate
  getObjectAttributes(): Promise<Array<ObjectAttribute>> {
    return this.client.get(basePath + '/objectAttributes');
  }

  @authenticate
  getObjectTypes(): Promise<Array<ObjectType>> {
    return this.client.get(basePath + '/objectTypes');
  }

  @authenticate
  getEventTypes(): Promise<Array<EventType>> {
    return this.client.get(basePath + '/eventTypes');
  }
}
