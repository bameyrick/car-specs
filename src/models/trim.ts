import { Model } from './model';
import { Specs } from './specs';

export interface Trim extends Model {
  model: string;
  modelYear: string;
  specs: Specs;
}

export type TrimLookup = Record<string, Trim>;
