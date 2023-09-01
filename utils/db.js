/**
 * @file MongoDB client module.
 * @author Bekalu Endrias <bekalu2054@gmail.com>
 * @see {@link https://github.com/bekalue}
 */

import mongodb from 'mongodb';

/**
 * Class representing a MongoDB client.
 */
class DBClient {
  /**
   * Create a MongoDB client.
   */
  constructor() {
    // Get the database connection details from environment variables
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    // Connect to the database
    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  /**
   * Check if the MongoDB client is alive.
   * @return {boolean} - The connection status of the MongoDB client.
   */
  isAlive() {
    return this.client.topology.isConnected();
  }

  /**
   * Get the number of users in the database.
   * @return {Promise<number>} - The number of users.
   */
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  /**
   * Get the number of files in the database.
   * @return {Promise<number>} - The number of files.
   */
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }
}

// Export an instance of DBClient
const dbClient = new DBClient();
export default dbClient;
