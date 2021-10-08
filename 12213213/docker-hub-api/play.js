(async () => {
    let dockerHubAPI = require('./src/api');

    var username = 'ryantheallmighty';
    var password = 's1eqjEUjvvFs';

    await dockerHubAPI.login(username, password);
    dockerHubAPI
        .logout()
        .then(() => console.log(`${username} is logged out`))
        .catch(console.error);
})();
