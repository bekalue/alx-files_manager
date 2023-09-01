import dbClient from './utils/db';

/**
 * Wait for the database connection to be established.
 * @return {Promise} - Resolves when the connection is established, rejects after 10 seconds.
 */
const waitConnection = () => new Promise((resolve, reject) => {
  let i = 0;
  const repeatFct = async () => {
    await setTimeout(() => {
      i += 1;
      if (i >= 10) {
        reject();
      } else if (!dbClient.isAlive()) {
        repeatFct();
      } else {
        resolve();
      }
    }, 1000);
  };
  repeatFct();
});

(async () => {
  // Log the initial connection status
  console.log(dbClient.isAlive());

  // Wait for the connection to be established
  await waitConnection();

  // Log the connection status after waiting
  console.log(dbClient.isAlive());

  // Log the number of users and files in the database
  console.log(await dbClient.nbUsers());
  console.log(await dbClient.nbFiles());
})();
