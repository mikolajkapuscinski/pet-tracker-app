export type PetStatus = 'Safe' | 'Exploring' | 'Charging' | 'Alert'

export type PetProfile = {
  name: string
  breed: string
  status: PetStatus
  battery: number
  signal: string
  lastSeen: string
  location: [number, number]
  avatarSeed: string
  collarId: string
}

export type SafetyZone = {
  name: string
  radiusMeters: number
  rule: string
  status: 'Active' | 'Paused'
  center: [number, number]
  color: string
}

export type BillingEntry = {
  date: string
  amount: string
  status: 'Paid' | 'Pending'
  note: string
}

export type DeviceProfile = {
  name: string
  serial: string
  battery: number
  signal: string
  lastSync: string
  status: 'Active' | 'Charging' | 'Offline'
}

export type FamilyMember = {
  name: string
  role: string
  status: string
  permissions: string[]
}

export type TogglePreference = {
  label: string
  description: string
  enabled: boolean
}

export const dashboardStats = [
  { label: 'Pets monitored', value: '2', delta: '+1 since morning' },
  { label: 'Safe zones', value: '3', delta: 'All active' },
  { label: 'Battery avg.', value: '73%', delta: 'One collar charging' },
  { label: 'Alerts today', value: '0', delta: 'No geofence exits' },
]

export const pets: PetProfile[] = [
  {
    name: 'Luna',
    breed: 'Golden Retriever',
    status: 'Safe',
    battery: 88,
    signal: 'Excellent',
    lastSeen: '2 min ago at Park Avenue',
    location: [52.2297, 21.0122],
    avatarSeed: 'luna',
    collarId: 'PG-992-LX',
  },
  {
    name: 'Milo',
    breed: 'Beagle',
    status: 'Charging',
    battery: 42,
    signal: 'Strong',
    lastSeen: '8 min ago at home base',
    location: [52.2331, 21.0244],
    avatarSeed: 'milo',
    collarId: 'PG-114-KT',
  },
]

export const safetyZones: SafetyZone[] = [
  {
    name: 'Home',
    radiusMeters: 160,
    rule: 'Alert on exit',
    status: 'Active',
    center: [52.2288, 21.0118],
    color: '#0d9488',
  },
  {
    name: 'Dog Park',
    radiusMeters: 240,
    rule: 'Gentle reminder after 20 min',
    status: 'Active',
    center: [52.2362, 21.0202],
    color: '#4f46e5',
  },
  {
    name: "Grandma's House",
    radiusMeters: 130,
    rule: 'Text family group',
    status: 'Active',
    center: [52.2256, 21.03],
    color: '#ea580c',
  },
]

export const billingHistory: BillingEntry[] = [
  {
    date: 'May 12, 2026',
    amount: '$14.99',
    status: 'Paid',
    note: 'Premium Guard monthly plan',
  },
  {
    date: 'Apr 12, 2026',
    amount: '$14.99',
    status: 'Paid',
    note: 'Premium Guard monthly plan',
  },
  {
    date: 'Mar 12, 2026',
    amount: '$14.99',
    status: 'Paid',
    note: 'Premium Guard monthly plan',
  },
]

export const devices: DeviceProfile[] = [
  {
    name: 'Luna',
    serial: 'PG-992-LX',
    battery: 88,
    signal: 'Excellent',
    lastSync: '2 min ago',
    status: 'Active',
  },
  {
    name: 'Milo',
    serial: 'PG-114-KT',
    battery: 42,
    signal: 'Strong',
    lastSync: '8 min ago',
    status: 'Charging',
  },
  {
    name: 'Nori',
    serial: 'PG-740-RS',
    battery: 65,
    signal: 'Excellent',
    lastSync: '14 min ago',
    status: 'Active',
  },
]

export const familyMembers: FamilyMember[] = [
  {
    name: 'Alicja',
    role: 'Owner',
    status: 'Online now',
    permissions: ['Route changes', 'Emergency calls', 'Billing'],
  },
  {
    name: 'Tomek',
    role: 'Caregiver',
    status: 'At work',
    permissions: ['Live location', 'Geofence alerts'],
  },
  {
    name: 'Zosia',
    role: 'Family viewer',
    status: 'Last active 12 min ago',
    permissions: ['Check-ins', 'Shared notes'],
  },
]

export const notificationPreferences: TogglePreference[] = [
  {
    label: 'Exit alerts',
    description: 'Notify the group when a pet leaves a geofence.',
    enabled: true,
  },
  {
    label: 'Low battery reminders',
    description: 'Get an early warning when battery drops below 25%.',
    enabled: true,
  },
  {
    label: 'Night activity summary',
    description: 'Send a morning digest with overnight movement.',
    enabled: false,
  },
]

export const activitySeries = [40, 58, 34, 62, 80, 94, 72]

export const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function petAvatar(seed: string) {
  return `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(seed)}`
}

export const healthSignals = [
  { label: 'Average daily steps', value: '8,432', delta: '+12% this week' },
  { label: 'Sleep quality', value: '88/100', delta: 'Stable' },
  { label: 'Recovery score', value: '91/100', delta: 'Excellent' },
]
