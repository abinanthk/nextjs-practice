import { BaseModel } from "./base-model.model";
import { ResultPaging } from "./result-paging.model";
import { Statuss } from "./statuss.model";

export class BasePagingOut<T extends object = {}> extends BaseModel {
  result?: ResultPaging<T>;
  statuss?: Statuss;
}
