/**
 * @file catalogService.js
 * Scalable Data Access Layer with offline fallback
 *
 * Provides a unified async API for fetching tours and transfer destinations.
 * Queries Supabase when configured, falling back gracefully to static catalog constants.
 */

import { supabase } from '../lib/supabase';
import { TOURS_DATA } from '../constants/toursCatalog';
import {
  MADEIRA_ADVENTURES,
  AIRPORT_TRANSFER_LOCATIONS,
} from '../constants/transfersCatalog';

// In-memory cache to prevent redundant fetches
const cache = {
  tours: null,
  destinations: null,
  adventures: null,
  lastFetched: 0
};

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch all available tours with local fallback
 * @returns {Promise<Array>}
 */
export async function getTours({ forceRefresh = false } = {}) {
  const now = Date.now();
  if (!forceRefresh && cache.tours && (now - cache.lastFetched < CACHE_TTL_MS)) {
    return cache.tours;
  }

  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('active', true)
        .order('id', { ascending: true });

      if (!error && data && data.length > 0) {
        cache.tours = data;
        cache.lastFetched = now;
        return data;
      }
    }
  } catch (err) {
    console.warn('[catalogService] Supabase tours fetch failed, using fallback catalog:', err?.message || err);
  }

  // Resilient fallback to static catalog
  cache.tours = TOURS_DATA;
  return TOURS_DATA;
}

/**
 * Fetch transfer destinations catalog with fallback
 * @returns {Promise<{ destinations: Array, popular: Array, standardPrice: number, executivePrice: number }>}
 */
export async function getTransferCatalog({ forceRefresh = false } = {}) {
  const now = Date.now();
  if (!forceRefresh && cache.destinations && (now - cache.lastFetched < CACHE_TTL_MS)) {
    return {
      destinations: cache.destinations,
      popular: cache.popular || POPULAR_DESTINATIONS,
      standardPrice: STANDARD_PRICE,
      executivePrice: EXECUTIVE_PRICE
    };
  }

  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('transfer_destinations')
        .select('*')
        .eq('active', true)
        .order('name', { ascending: true });

      if (!error && data && data.length > 0) {
        cache.destinations = data.map((d) => d.name);
        cache.popular = data.filter((d) => d.is_popular).map((d) => d.name);
        cache.lastFetched = now;
        return {
          destinations: cache.destinations,
          popular: cache.popular,
          standardPrice: STANDARD_PRICE,
          executivePrice: EXECUTIVE_PRICE
        };
      }
    }
  } catch (err) {
    console.warn('[catalogService] Supabase destinations fetch failed, using fallback catalog:', err?.message || err);
  }

  const defaultNames = AIRPORT_TRANSFER_LOCATIONS.map((l) => l.name);
  const defaultPopular = AIRPORT_TRANSFER_LOCATIONS.filter((l) => l.popular).map((l) => l.name);

  // Resilient fallback to static catalog
  cache.destinations = defaultNames;
  cache.popular = defaultPopular;
  return {
    destinations: defaultNames,
    popular: defaultPopular,
    standardPrice: 30,
    executivePrice: 50
  };
}

/**
 * Fetch adventure routes with fallback
 * @returns {Promise<Array>}
 */
export async function getAdventureRoutes() {
  if (cache.adventures) return cache.adventures;

  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('adventure_routes')
        .select('*')
        .eq('active', true);

      if (!error && data && data.length > 0) {
        cache.adventures = data;
        return data;
      }
    }
  } catch (err) {
    console.warn('[catalogService] Supabase adventure routes fetch failed, using fallback:', err?.message || err);
  }

  cache.adventures = MADEIRA_ADVENTURES;
  return MADEIRA_ADVENTURES;
}

/**
 * Fetch airport transfer locations with live fallback from Supabase table 'transfer_destinations'
 * @returns {Promise<Array>}
 */
export async function getAirportLocations() {
  if (cache.airportLocations) return cache.airportLocations;

  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('transfer_destinations')
        .select('*')
        .order('one_way_price', { ascending: true });

      if (!error && data && data.length > 0) {
        // Helper to normalize regions from database (e.g. 'south-east' -> 'east', 'north-west'/'north-east' -> 'north')
        const normalizeRegion = (r) => {
          if (!r) return 'south-west';
          if (r === 'south-east' || r === 'east') return 'east';
          if (r === 'north-west' || r === 'north-east' || r === 'north') return 'north';
          if (r === 'funchal') return 'funchal';
          if (r === 'mountain') return 'mountain';
          return 'south-west';
        };

        // Map database columns to app schema
        const mapped = data.map((d) => ({
          id: d.id,
          name: d.name,
          subtitle: d.subtitle,
          region: normalizeRegion(d.region),
          oneWayPrice: Number(d.one_way_price),
          roundTripPrice: Number(d.round_trip_price),
          duration: d.duration || '~25 min',
          popular: d.is_popular || false,
        }));

        cache.airportLocations = mapped;
        return mapped;
      }
    }
  } catch (err) {
    console.warn('[catalogService] Error fetching transfer_destinations from Supabase:', err);
  }

  cache.airportLocations = AIRPORT_TRANSFER_LOCATIONS;
  return AIRPORT_TRANSFER_LOCATIONS;
}

export default {
  getTours,
  getTransferCatalog,
  getAdventureRoutes,
  getAirportLocations,
};

