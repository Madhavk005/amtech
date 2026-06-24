export const craneTypes = [
  {
    id: 'single-girder',
    name: 'Single Girder EOT Crane',
    image: '/images/configurator/single-girder.png',
    capacityRange: '1T - 20T',
    tags: ['Light Duty', 'Warehouse', 'Workshops'],
    description: 'Cost-effective solution for light to medium material handling in limited space.',
  },
  {
    id: 'double-girder',
    name: 'Double Girder EOT Crane',
    image: '/images/configurator/double-girder.png',
    capacityRange: '5T - 150T+',
    tags: ['Heavy Duty', 'Steel Plants', 'Power Plants'],
    description: 'Robust power for demanding environments and massive lifting requirements.',
  },
  {
    id: 'goliath',
    name: 'Goliath / Gantry Crane',
    image: '/images/configurator/goliath.png',
    capacityRange: '5T - 100T',
    tags: ['Outdoor', 'Shipyards', 'Construction'],
    description: 'Self-supported structure perfect for outdoor stockyards and rail yards.',
  },
  {
    id: 'jib-crane',
    name: 'JIB Crane',
    image: '/images/configurator/jib-crane.png',
    capacityRange: '0.5T - 10T',
    tags: ['Assembly Lines', 'Localized Lifting', 'Workstations'],
    description: 'Versatile 360° rotation for efficient handling within a circular area.',
  },
  {
    id: 'wire-rope-hoist',
    name: 'Wire Rope Hoist',
    image: '/images/configurator/wire-rope-hoist.png',
    capacityRange: '1T - 50T',
    tags: ['Standard Lifting', 'Reliable', 'Modular'],
    description: 'High-precision lifting components designed for maximum duty cycles.',
  },
  {
    id: 'underslung-crane',
    name: 'Underslung Crane',
    image: '/images/configurator/underslung-crane.png',
    capacityRange: '1T - 10T',
    tags: ['Low Headroom', 'Complex Layouts', 'Precision'],
    description: 'Suspended from roof structure to maximize floor space and lift height.',
  },
];

export const dutyClasses = [
  { id: 'm3', name: 'M3 (Light)', desc: 'Maintenance and standby work' },
  { id: 'm5', name: 'M5 (Medium)', desc: 'General workshop and production' },
  { id: 'm7', name: 'M7 (Heavy)', desc: 'Steel plants and continuous duty' },
  { id: 'm8', name: 'M8 (Extra Heavy)', desc: 'Extreme 24/7 industrial loads' },
];

export const industries = [
  'Steel Industry',
  'Power Generation',
  'Manufacturing',
  'Automotive',
  'Oil & Gas',
  'Logistics & Warehousing',
  'Construction',
  'Mining',
  'Other',
];
