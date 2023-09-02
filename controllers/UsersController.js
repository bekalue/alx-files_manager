/* eslint-disable import/no-named-as-default */
import sha1 from 'sha1';
import Queue from 'bull/lib/queue';
import dbClient from '../utils/db';

const userQueue = new Queue('email sending');

export default class UsersController {
  static async postNew(request, response) {
    const { email, password } = request.body;

    if (!email) return response.status(400).json({ error: 'Missing email' });
    if (!password) return response.status(400).json({ error: 'Missing password' });

    const emailExists = await (await dbClient.usersCollection()).findOne({ email });
    if (emailExists) return response.status(400).json({ error: 'Already exists' });

    const result = await (await dbClient.usersCollection()).insertOne(
      { email, password: sha1(password) },
    );

    const userId = result.insertedId.toString();

    userQueue.add({ userId });
    return response.status(201).json({ id: userId, email });
  }

  static async getMe(request, response) {
    const { user } = request;

    response.status(200).json({ email: user.email, id: user._id.toString() });
  }
}
