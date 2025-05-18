export class BaseModel {
  readonly assign_!: (source: Partial<this>) => void;
  readonly pack_!: () => Partial<this>;

  constructor() {
    Reflect.defineProperty(this, "assign_", {
      value: this._assign,
      writable: false,
      configurable: false,
      enumerable: false,
    });

    Reflect.defineProperty(this, "pack_", {
      value: this._pack,
      writable: false,
      configurable: false,
      enumerable: false,
    });
  }

  private _assign(source: Partial<this>) {
    for (const key in source) {
      if (key in this) {
        this[key as keyof this] = source[key as keyof this]!;
      }
    }
  }

  private _pack() {
    const packedValue: Partial<this> = {};

    for (const key in this) {
      if (this[key] !== undefined) {
        packedValue[key] = this[key];
      }
    }

    return packedValue;
  }
}
