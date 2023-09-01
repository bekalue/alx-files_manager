/**
 * @file Redis client module.
 * @author Bekalu Endrias <bekalu2054@gmail.com>
 * @see {@link https://github.com/bekalue}
 */

import { promisify } from 'util';
import { createClient } from 'redis';

/**
 * Class representing a Redis client.
 */
class RedisClient {
  /**
   * Create a Redis client.
   */
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;

    // Handle connection errors
    this.client.on('error', (err) => {
      console.error('Redis client failed to connect:', err.message || err.toString());
      this.isClientConnected = false;
    });

    // Handle successful connection
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  /**
   * Check if the Redis client is alive.
   * @return {boolean} - The connection status of the Redis client.
   */
  isAlive() {
    return this.isClientConnected;
  }

  /**
   * Get the value of a key from Redis.
   * @param {string} key - The key to get the value of.
   * @return {Promise<string>} - The value of the key.
   */
  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    return getAsync(key);
  }

  /**
   * Set the value of a key in Redis, with an expiration time.
   * @param {string} key - The key to set the value of.
   * @param {string} value - The value to set.
   * @param {number} duration - The expiration time in seconds.
   */
  async set(key, value, duration) {
    const setAsync = promisify(this.client.setex).bind(this.client);
    await setAsync(key, duration, value);
  }

  /**
   * Delete a key from Redis.
   * @param {string} key - The key to delete.
   */
  async del(key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    await delAsync(key);
  }
}

// Export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
