import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static getStatus(request, response) {
    const redisStatus = redisClient.isAlive();
    const dbStatus = dbClient.isAlive();
    response.status(200).json({ redis: redisStatus, db: dbStatus });
  }

  static async getStats(request, response) {
    const nbUsers = await dbClient.nbUsers();
    const nbFiles = await dbClient.nbFiles();
    response.status(200).json({ users: nbUsers, files: nbFiles });
  }
}

export default AppController;
