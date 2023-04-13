import { Manufacturer } from './manufacturer';

export interface Model extends Manufacturer {
  manufacturer: string;
}

export type ModelLookup = Record<string, Model>;
