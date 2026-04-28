/**
 * Product Cache — avoids re-fetching from the slow Render backend on every visit.
 *
 * Strategy:
 *   1. First check in-memory cache (instant, survives SPA navigation)
 *   2. Then check localStorage (survives page refresh, 10-min TTL)
 *   3. Only hit the API if both caches miss
 *
 * The API call still happens in the background (stale-while-revalidate)
 * so users always see fresh-enough data.
 */

const CACHE_KEY = 'sportsara_products_cache';
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

// In-memory cache (survives SPA navigation, lost on page refresh)
let memoryCache = null;
let memoryCacheTimestamp = 0;

/**
 * Get cached products (memory → localStorage → null)
 */
export function getCachedProducts() {
  // 1. Check memory cache
  if (memoryCache && (Date.now() - memoryCacheTimestamp) < CACHE_TTL) {
    return memoryCache;
  }

  // 2. Check localStorage
  try {
    const stored = localStorage.getItem(CACHE_KEY);
    if (stored) {
      const { data, timestamp } = JSON.parse(stored);
      if ((Date.now() - timestamp) < CACHE_TTL) {
        // Warm up memory cache
        memoryCache = data;
        memoryCacheTimestamp = timestamp;
        return data;
      }
    }
  } catch (e) {
    // localStorage might be full or corrupted — ignore
  }

  return null;
}

/**
 * Store products in both caches
 */
export function setCachedProducts(data) {
  const timestamp = Date.now();

  // 1. Memory cache
  memoryCache = data;
  memoryCacheTimestamp = timestamp;

  // 2. localStorage
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp }));
  } catch (e) {
    // localStorage full — memory cache still works
  }
}

/**
 * Force clear all caches (useful after admin product edits)
 */
export function clearProductCache() {
  memoryCache = null;
  memoryCacheTimestamp = 0;
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (e) {
    // ignore
  }
}
