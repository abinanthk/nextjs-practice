import { BaseModel } from "./base-model.model";
import { Paging } from "./paging.model";

export class ResultPaging<TRecord extends object = {}> extends BaseModel {
  paging: Paging = new Paging();
  records: Array<TRecord> = new Array();
}
