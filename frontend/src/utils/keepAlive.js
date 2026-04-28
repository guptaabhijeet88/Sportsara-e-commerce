import axios from 'axios';
import API from './api';

/**
 * Render Free Tier Keep-Alive
 * 
 * Render spins down free-tier services after ~15 minutes of inactivity.
 * Cold starts take 30-50 seconds as the container restarts.
 * 
 * This module pings the /api/health endpoint every 13 minutes while
 * the user has the site open, preventing the backend from sleeping.
 * 
 * It only runs while the browser tab is visible (saves resources).
 */

let intervalId = null;
const PING_INTERVAL = 13 * 60 * 1000; // 13 minutes (under Render's 15-min timeout)

function ping() {
  axios.get(`${API}/health`).catch(() => {
    // Silently ignore errors — this is best-effort
  });
}

export function startKeepAlive() {
  if (intervalId) return; // Already running

  // Immediate ping to wake up the server if it's sleeping
  ping();

  intervalId = setInterval(ping, PING_INTERVAL);

  // Pause when tab is hidden, resume when visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(intervalId);
      intervalId = null;
    } else {
      ping();
      intervalId = setInterval(ping, PING_INTERVAL);
    }
  });
}
