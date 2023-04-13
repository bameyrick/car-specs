import { Specs } from './specs';

export interface SourceTrim {
  manufacturer: string;
  model: string;
  name: string;
  start_year: number;
  end_year?: number;
  specs: Specs;
}
