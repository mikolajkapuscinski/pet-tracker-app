import { useEffect } from 'react'
import { useLocation } from '@tanstack/react-router'
import ReactGA from 'react-ga4'

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID

let initialized = false

export function AnalyticsListener() {
  const location = useLocation()

  useEffect(() => {
    if (!measurementId) return
    if (initialized) return

    ReactGA.initialize(measurementId)
    initialized = true
  }, [])

  useEffect(() => {
    if (!measurementId) return
    if (!initialized) return

    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname + location.search,
    })
  }, [location.pathname, location.search])

  return null
}