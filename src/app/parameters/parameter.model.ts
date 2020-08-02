import { Units } from 'src/app/units/units.model';

export interface Parameter {
    description: string;
    value: number;
    type: string;
    units: Units;
}
