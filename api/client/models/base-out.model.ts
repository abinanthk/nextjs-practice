import { BaseModel } from "./base-model.model";
import { Statuss } from "./statuss.model";

export class BaseOut<TResult extends object = {}> extends BaseModel {
  result?: TResult;
  statuss?: Statuss;
}
