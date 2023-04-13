import { Model } from './model';

export interface ModelYear extends Model {
  model: string;
  years: number[];
}

export type ModelYearLookup = Record<string, ModelYear>;
