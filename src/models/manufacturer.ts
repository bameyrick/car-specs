export interface Manufacturer {
  displayName: string;
  searchValues: string[];
}

export type ManufacturerLookup = Record<string, Manufacturer>;
