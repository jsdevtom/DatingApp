export interface IFormToDtoMapper<F, D> {
  map(form: F): D;
}
