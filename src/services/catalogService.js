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
  DESTINATIONS,
  POPULAR_DESTINATIONS,
  MADEIRA_ADVENTURES,
  AIRPORT_TRANSFER_LOCATIONS,
  STANDARD_PRICE,
  EXECUTIVE_PRICE
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

  // Resilient fallback to static catalog
  cache.destinations = DESTINATIONS;
  cache.popular = POPULAR_DESTINATIONS;
  return {
    destinations: DESTINATIONS,
    popular: POPULAR_DESTINATIONS,
    standardPrice: STANDARD_PRICE,
    executivePrice: EXECUTIVE_PRICE
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
 * Fetch airport transfer locations with fallback
 * @returns {Promise<Array>}
 */
export async function getAirportLocations() {
  return AIRPORT_TRANSFER_LOCATIONS;
}

export default {
  getTours,
  getTransferCatalog,
  getAdventureRoutes,
  getAirportLocations,
};

