import { psqlCreateTypeForms } from './getCreatePsqlTypeQuery';

interface ICompositeTypeValues {
  attributeName: string;
  dataType: string;
}

interface IRangeTypeValues {
  subtype: string;
  subtypeDiffFunction: string;
}

interface IBaseGetCreatePsqlTypeQuery {
  name: string;
}

interface IGetCreatePsqlCompositeTypeQuery extends IBaseGetCreatePsqlTypeQuery {
  asForm?: psqlCreateTypeForms.COMPOSITE;
  values: ICompositeTypeValues[];
}

interface IGetCreatePsqlEnumTypeQuery extends IBaseGetCreatePsqlTypeQuery {
  asForm: psqlCreateTypeForms.ENUM;
  values: string[];
}

interface IGetCreatePsqlRangeTypeQuery extends IBaseGetCreatePsqlTypeQuery {
  asForm: psqlCreateTypeForms.RANGE;
  values: IRangeTypeValues;
}

export type IGetCreatePsqlTypeQuery =
  | IGetCreatePsqlCompositeTypeQuery
  | IGetCreatePsqlEnumTypeQuery
  | IGetCreatePsqlRangeTypeQuery;
