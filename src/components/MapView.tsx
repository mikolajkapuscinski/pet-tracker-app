import { useEffect, useMemo, useState } from 'react'
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { PetProfile, SafetyZone } from '../lib/petguard-data'

type MapViewProps = {
  pets: PetProfile[]
  zones: SafetyZone[]
  mode?: 'dashboard' | 'zones'
}

function petAvatar(seed: string) {
  return `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(seed)}`
}

function petIcon(color: string) {
  return L.divIcon({
    className: '',
    html: `
      <div style="width:44px;height:44px;border-radius:9999px;border:4px solid white;box-shadow:0 16px 32px rgba(15,23,42,0.2);background:${color};display:grid;place-items:center;overflow:hidden;">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px;">
          <path d="M5 12c0-2.5 2-4.5 4.5-4.5S14 9.5 14 12s-2 4.5-4.5 4.5S5 14.5 5 12Z" />
          <path d="M14 9.5 16 7" />
          <path d="M7.5 9 6 6.5" />
          <path d="M16.5 13 19 12" />
        </svg>
      </div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -22],
  })
}

export default function MapView({ pets, zones, mode = 'dashboard' }: MapViewProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const center = useMemo<[number, number]>(() => {
    if (mode === 'zones' && zones[0]) {
      return zones[0].center
    }

    return pets[0]?.location ?? [52.2297, 21.0122]
  }, [mode, pets, zones])

  if (!mounted) {
    return (
      <div className="grid h-full min-h-[420px] place-items-center rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-100 to-white text-sm text-slate-500 shadow-inner">
        Loading OpenStreetMap...
      </div>
    )
  }

  return (
    <div className="relative h-full min-h-[420px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom
        className="h-full min-h-[420px] w-full"
        zoomControl={false}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {zones.map((zone) => (
          <Circle
            key={zone.name}
            center={zone.center}
            radius={zone.radiusMeters}
            pathOptions={{
              color: zone.color,
              fillColor: zone.color,
              fillOpacity: mode === 'zones' ? 0.16 : 0.1,
              weight: 2,
            }}
          >
            <Popup>
              <div className="space-y-1">
                <p className="font-bold text-slate-950">{zone.name}</p>
                <p className="text-sm text-slate-600">{zone.rule}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  {zone.radiusMeters} m radius
                </p>
              </div>
            </Popup>
          </Circle>
        ))}

        {pets.map((pet, index) => (
          <Marker
            key={pet.name}
            position={pet.location}
            icon={petIcon(index === 0 ? '#0d9488' : '#4f46e5')}
          >
            <Popup>
              <div className="flex items-center gap-3">
                <img
                  src={petAvatar(pet.avatarSeed)}
                  alt={pet.name}
                  className="h-12 w-12 rounded-full border border-slate-200 bg-slate-100"
                />
                <div>
                  <p className="font-bold text-slate-950">{pet.name}</p>
                  <p className="text-sm text-slate-600">{pet.breed}</p>
                  <p className="text-xs text-slate-400">{pet.lastSeen}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="pointer-events-none absolute left-4 top-4 flex gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        <span className="rounded-full bg-white/90 px-3 py-1 shadow-sm">OpenStreetMap</span>
        <span className="rounded-full bg-white/90 px-3 py-1 shadow-sm">Live collars</span>
      </div>
    </div>
  )
}
