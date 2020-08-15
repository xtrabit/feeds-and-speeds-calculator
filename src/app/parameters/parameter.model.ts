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
}

export abstract class Parameter implements ParameterData{
  readonly description: string;
  readonly type: string;
  public value: number;
  public units: Units;
  public strategy: {[key in Strategy]: Parameter['type'][]};

  constructor(parameter: ParameterData) {
    this.description = parameter.description;
    this.type = parameter.type;
    this.value = parameter.value;
    this.units = parameter.units;
    this.strategy[Strategy.A] = parameter[Strategy.A];
    this.strategy[Strategy.B] = parameter[Strategy.B];
  }

  abstract calculate(parameters: {[type: string]: Parameter}, strategy: Strategy): void;

  writeValue(value: number) {
    if ([-Infinity, Infinity].includes(value) || isNaN(value)) {
      value = 0;
    }
    this.value = value;
  }
}

class Diameter extends Parameter {
  calculate(parameters: {[type: string]: Parameter}, strategy: Strategy) {
    const { feed, load, rpm, speed, teeth } = parameters;
    let value: number = 0;
    switch (strategy) {
      case Strategy.A:
        value = speed.value / (Math.PI * rpm.value);
        break;
      case Strategy.B:
        value = speed.value * teeth.value * load.value / (Math.PI * feed.value);
        break;
    }
    this.writeValue(value);
  }
}

class Feed extends Parameter {
  calculate(parameters: {[type: string]: Parameter}, strategy: Strategy) {
    const { diameter, load, rpm, speed, teeth } = parameters;
    let value: number = 0;
    switch (strategy) {
      case Strategy.A:
        value = rpm.value * teeth.value * load.value;
        break;
      case Strategy.B:
        value = speed.value * teeth.value * load.value / (Math.PI * diameter.value);
        break;
    }
    this.writeValue(value);
  }
}

class Load extends Parameter {
  calculate(parameters: {[type: string]: Parameter}, strategy: Strategy) {
    const { diameter, feed, rpm, speed, teeth } = parameters;
    let value: number = 0;
    switch (strategy) {
      case Strategy.A:
        value = feed.value / (rpm.value * teeth.value);
        break;
      case Strategy.B:
        value = feed.value * Math.PI * diameter.value / (speed.value * teeth.value);
        break;
    }
    this.writeValue(value);
  }
}

class Rpm extends Parameter {
  calculate(parameters: {[type: string]: Parameter}, strategy: Strategy) {
    const { diameter, feed, load, speed, teeth } = parameters;
    let value: number = 0;
    switch (strategy) {
      case Strategy.A:
        value = speed.value / (Math.PI * diameter.value);
        break;
      case Strategy.B:
        value = feed.value / (teeth.value * load.value);
        break;
    }
    this.writeValue(value);
  }
}

class Speed extends Parameter {
  calculate(parameters: {[type: string]: Parameter}, strategy: Strategy) {
    const { diameter, feed, load, rpm, teeth } = parameters;
    let value: number = 0;
    switch (strategy) {
      case Strategy.A:
        value = Math.PI * rpm.value * diameter.value;
        break;
      case Strategy.B:
        value = Math.PI * feed.value * diameter.value / (teeth.value * load.value);
        break;
    }
    this.writeValue(value);
  }
}

class Teeth extends Parameter {
  calculate(parameters: {[type: string]: Parameter}, strategy: Strategy) {
    const { diameter, feed, load, rpm, speed } = parameters;
    let value: number = 0;
    switch (strategy) {
      case Strategy.A:
        value = feed.value / (rpm.value * load.value);
        break;
      case Strategy.B:
        value = Math.PI * feed.value * diameter.value / (speed.value * load.value);
        break;
    }
    this.writeValue(value);
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

export function createParameter(parameter: ParameterData): Parameter {
  return new map[parameter.type](parameter);
}
