import ProgressLogger from '@qntm-code/progress-logger';
import { asyncForEach, delay } from '@qntm-code/utils';
import chalk from 'chalk';
import { readFileSync, writeFileSync } from 'fs';
import { sortBy } from 'sort-by-typescript';

import { sanitiseName } from '../helpers';
import { Lookups, ManufacturerLookup, ModelLookup, ModelYearLookup, SourceTrim, TrimLookup } from '../models';
import { createYearRange } from './create-year-range';
import { generateSearchValues } from './generate-search-values';

export async function generateDataCache(): Promise<Lookups> {
  console.log(chalk.green(`GENERATE DATA CACHE`));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const specs: SourceTrim[] = JSON.parse(readFileSync('specs.json', 'utf8'));

  console.log(chalk.cyan(`${specs.length} specs`));

  specs.sort(sortBy('manufacturer', 'model', '-start_year', 'model'));

  const manufacturers: ManufacturerLookup = {};
  const models: ModelLookup = {};
  const modelYears: ModelYearLookup = {};
  const trims: TrimLookup = {};

  const specsMappingProgressLogger = new ProgressLogger(specs.length, 'Mapping specs', 'Average processing time');

  await asyncForEach(specs, async ({ manufacturer, model, start_year, end_year, name, specs }) => {
    const start = performance.now();

    const manufacturerUrl = sanitiseName(manufacturer);

    if (!manufacturers[manufacturerUrl]) {
      manufacturers[manufacturerUrl] = {
        displayName: manufacturer,
        searchValues: generateSearchValues(manufacturer),
      };
    }

    const modelUrl = `${manufacturerUrl}/${sanitiseName(model)}`;

    if (!models[modelUrl]) {
      models[modelUrl] = {
        manufacturer: manufacturerUrl,
        displayName: model,
        searchValues: generateSearchValues(`${manufacturer} ${model}`),
      };
    }

    const modelYearUrl = `${modelUrl}/${start_year}`;

    if (!modelYears[modelYearUrl]) {
      modelYears[modelYearUrl] = {
        manufacturer: manufacturerUrl,
        model: modelUrl,
        displayName: `${start_year} ${end_year ? `- ${end_year}` : `onwards`}`,
        years: createYearRange(start_year, end_year),
        searchValues: [],
      };
    }

    const trimUrl = `${modelYearUrl}/${sanitiseName(name)}`;

    if (!trims[trimUrl]) {
      trims[trimUrl] = {
        manufacturer: manufacturerUrl,
        model: modelUrl,
        modelYear: modelYearUrl,
        displayName: name,
        searchValues: generateSearchValues(`${manufacturer} ${model} ${name}`),
        specs,
      };
    }

    specsMappingProgressLogger.itemCompleted(performance.now() - start);

    await delay();
  });

  specsMappingProgressLogger.destroy();

  writeFileSync('manufacturer-lookup.json', JSON.stringify(manufacturers, null, 2), 'utf8');
  writeFileSync('model-lookup.json', JSON.stringify(models, null, 2), 'utf8');
  writeFileSync('model-year-lookup.json', JSON.stringify(modelYears, null, 2), 'utf8');
  writeFileSync('trim-lookup.json', JSON.stringify(trims, null, 2), 'utf8');

  return {
    manufacturers,
    models,
    modelYears,
    trims,
  };
}
