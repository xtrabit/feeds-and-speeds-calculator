import { Units } from 'src/app/units/units.model';

export enum Strategy{
  A,
  B,
}

export interface ParameterData {
  description: string;
  value: number;
  type: string;
  units: Units;
  strategy: {[key in Strategy]: Parameter['type'][]};
  digits: number;
}

export type Parameters = {
  [type: string]: Parameter
}

export abstract class Parameter implements ParameterData{
  readonly description: string;
  readonly type: string;
  private _value: number;
  public units: Units;
  public strategy: {[key in Strategy]: Parameter['type'][]};
  public parameters: Parameters;
  public digits: number;

  constructor(parameter: ParameterData, parameters: Parameters) {
    this.description = parameter.description;
    this.type = parameter.type;
    this._value = parameter.value;
    this.units = parameter.units;
    this.strategy = {} as {[key in Strategy]: Parameter['type'][]};
    this.strategy[Strategy[Strategy.A]] = parameter.strategy[Strategy.A];
    this.strategy[Strategy[Strategy.B]] = parameter.strategy[Strategy.B];
    this.parameters = parameters;
    this.digits = parameter.digits;
  }

  abstract calculate(strategy: Strategy): void;

  abstract cleanValue(value: string): string;

  get value() {
    return this._value;
  }

  set value(value: number) {
    if ([-Infinity, Infinity].includes(value) || isNaN(value)) {
      value = 0;
    }
    this._value = parseFloat(value.toFixed(this.digits));
  }

  get converted() {
    return this.value / this.units.multiplier;
  }

  validate(value: string): string {
    value = this.cleanValue(value);
    this.value = parseFloat(value);
    return value;
  }
}

class Diameter extends Parameter {

  calculate(strategy: Strategy) {
    const { feed, load, rpm, speed, teeth } = this.parameters;
    let value: number = 0;
    switch (Strategy[strategy as unknown as string]) {
      case Strategy.A:
        value = speed.converted / (Math.PI * rpm.converted) * this.units.multiplier;
        break;
      case Strategy.B:
        value = speed.converted * teeth.converted * load.converted / (Math.PI * feed.converted) * this.units.multiplier;
        break;
    }
    this.value = value;
  }

  cleanValue(value: string) {
    return cleanFloat(value, this.digits);
  }
}

class Feed extends Parameter {

  calculate(strategy: Strategy) {
    const { diameter, load, rpm, speed, teeth } = this.parameters;
    let value: number = 0;
    switch (Strategy[strategy as unknown as string]) {
      case Strategy.A:
        value = rpm.converted * teeth.converted * load.converted * this.units.multiplier;
        break;
      case Strategy.B:
        value = speed.converted * teeth.converted * load.converted / (Math.PI * diameter.converted) * this.units.multiplier;
        break;
    }
    this.value = value;
  }

  cleanValue(value: string) {
    return cleanInt(value);
  }
}

class Load extends Parameter {

  calculate(strategy: Strategy) {
    const { diameter, feed, rpm, speed, teeth } = this.parameters;
    let value: number = 0;
    switch (Strategy[strategy as unknown as string]) {
      case Strategy.A:
        value = feed.converted / (rpm.converted * teeth.converted) * this.units.multiplier;
        break;
      case Strategy.B:
        value = feed.converted * Math.PI * diameter.converted / (speed.converted * teeth.converted) * this.units.multiplier;
        break;
    }
    this.value = value;
  }

  cleanValue(value: string) {
    return cleanFloat(value, this.digits);
  }
}

class Rpm extends Parameter {

  calculate(strategy: Strategy) {
    const { diameter, feed, load, speed, teeth } = this.parameters;
    let value: number = 0;
    switch (Strategy[strategy as unknown as string]) {
      case Strategy.A:
        value = speed.converted / (Math.PI * diameter.converted) * this.units.multiplier;
        break;
      case Strategy.B:
        value = feed.converted / (teeth.converted * load.converted) * this.units.multiplier;
        break;
    }
    this.value = value;
  }

  cleanValue(value: string) {
    return cleanInt(value);
  }
}

class Speed extends Parameter {

  calculate(strategy: Strategy) {
    const { diameter, feed, load, rpm, teeth } = this.parameters;
    let value: number = 0;
    switch (Strategy[strategy as unknown as string]) {
      case Strategy.A:
        value = Math.PI * rpm.converted * diameter.converted * this.units.multiplier;
        break;
      case Strategy.B:
        value = Math.PI * feed.converted * diameter.converted / (teeth.converted * load.converted) * this.units.multiplier;
        break;
    }
    this.value = value;
  }

  cleanValue(value: string) {
    return cleanInt(value);
  }
}

class Teeth extends Parameter {

  calculate(strategy: Strategy) {
    const { diameter, feed, load, rpm, speed } = this.parameters;
    let value: number = 0;
    switch (Strategy[strategy as unknown as string]) {
      case Strategy.A:
        value = feed.converted / (rpm.converted * load.converted) * this.units.multiplier;
        break;
      case Strategy.B:
        value = Math.PI * feed.converted * diameter.converted / (speed.converted * load.converted) * this.units.multiplier;
        break;
    }
    this.value = value;
  }

  cleanValue(value: string) {
    return cleanInt(value);
  }
}

const map = {
  diameter: Diameter,
  feed: Feed,
  load: Load,
  rpm: Rpm,
  speed: Speed,
  teeth: Teeth,
};

export function createParameter(parameter: ParameterData, parameters: Parameters): Parameter {
  return new map[parameter.type](parameter, parameters);
}

function cleanFloat(value: string, digits: number): string {
    value = value.replace(/[^\d\.]/, '');
    value = value.replace(/(?<=\.\d*)\..*/, '');
    value = value.replace(/^(?=\.)/, '0');
    value = value.replace(/^0(?=\d)/, '');
    value = value.replace(new RegExp(`(?<=\\.\\d{${digits}}).*`, 'g'), '');
    if (value === '') value = '0';
    return value;
}

function cleanInt(value: string): string {
    value = value.replace(/\..*/, '');
    value = value.replace(/[^\d]/, '');
    value = value.replace(/^0(?=\d)/, '');
    if (value === '') value = '0';
    return value;
}
