document.querySelector('.connect').addEventListener('submit', (event) => {
  const $channel = document.querySelector('.channel');
  const $username = document.querySelector('.username');
  const $token = document.querySelector('.token');

  return electronAPI.twitchConnect($channel.value, $username.value, $token.value)
    .then(() => {
    });
});
