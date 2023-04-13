import { ManufacturerLookup } from './manufacturer';
import { ModelLookup } from './model';
import { ModelYearLookup } from './model-year';
import { TrimLookup } from './trim';

export interface Lookups {
  manufacturers: ManufacturerLookup;
  models: ModelLookup;
  modelYears: ModelYearLookup;
  trims: TrimLookup;
}
