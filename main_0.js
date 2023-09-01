import redisClient from './utils/redis';

(async () => {
  // Log the initial connection status
  console.log(redisClient.isAlive());

  // Log the value of 'myKey'
  console.log(await redisClient.get('myKey'));

  // Set the value of 'myKey' to 12, with an expiration time of 5 seconds
  await redisClient.set('myKey', 12, 5);

  // Log the value of 'myKey' again
  console.log(await redisClient.get('myKey'));

  // Wait for 10 seconds, then log the value of 'myKey' again
  setTimeout(async () => {
    console.log(await redisClient.get('myKey'));
  }, 1000 * 10);
})();
