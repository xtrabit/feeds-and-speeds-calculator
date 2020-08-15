import { Strategy } from 'src/app/parameters/parameter.model';

export const parameters = [
  {
    description: 'Tool Diameter',
    value: 0,
    type: 'diameter',
    strategy: {
      [Strategy.A]: [
        'feed',
        'rpm',
      ],
      [Strategy.B]: [
        'feed',
        'load',
        'speed',
        'teeth',
      ]
    }
  },
  {
    description: 'Feed Rate',
    value: 0,
    type: 'feed',
    strategy: {
      [Strategy.A]: [
        'rpm',
        'load',
        'teeth',
      ],
      [Strategy.B]: [
        'diameter',
        'load',
        'speed',
        'teeth',
      ]
    }
  },
  {
    description: 'Chip Load',
    value: 0,
    type: 'load',
    strategy: {
      [Strategy.A]: [
        'feed',
        'rpm',
        'teeth',
      ],
      [Strategy.B]: [
        'diameter',
        'feed',
        'speed',
        'teeth',
      ]
    }
  },
  {
    description: 'RPM',
    value: 0,
    type: 'rpm',
    strategy: {
      [Strategy.A]: [
        'diameter',
        'speed',
      ],
      [Strategy.B]: [
        'feed',
        'load',
        'teeth',
      ]
    }
  },
  {
    description: 'Cutting Speed',
    value: 0,
    type: 'speed',
    strategy: {
      [Strategy.A]: [
        'diameter',
        'rpm',
      ],
      [Strategy.B]: [
        'diameter',
        'feed',
        'load',
        'speed',
      ]
    }
  },
  {
    description: 'Number of Teeth',
    value: 0,
    type: 'teeth',
    strategy: {
      [Strategy.A]: [
        'feed',
        'load',
        'rpm',
      ],
      [Strategy.B]: [
        'diameter',
        'feed',
        'load',
        'speed',
      ]
    }
  }
];
