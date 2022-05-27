(async () => {
  const $channel = document.querySelector('.channel');
  const $username = document.querySelector('.username');
  const $token = document.querySelector('.token');
  const $submit = document.querySelector('.submit');
  const $disconnect = document.querySelector('.disconnect');

  const channel = localStorage.getItem('channel') || '';
  const username = localStorage.getItem('username') || '';

  const connect = async (channel, username, token) => {
    const result = await electronAPI.twitchConnect(channel, username, token);
    connectEnabled = !result.success;
    $submit.disabled = result.success;

    if (result.success) {
      console.log('Connected successfully.');
    } else {
      console.error('Error while connecting: ' + result.message);
    }

    return result;
  };

  const disconnect = async () => {
    await electronAPI.twitchDisconnect();
    $submit.disabled = false;
    connectEnabled = true;
  };

  let connectEnabled = !channel || !username;

  document.querySelector('.channel').value = channel;
  document.querySelector('.username').value = username;

  if (channel && username) {
    connect(channel, username);
  }

  document.querySelector('.connect').addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!connectEnabled) {
      return;
    }

    const result = await connect($channel.value, $username.value, $token.value);

    if (result.success) {
      localStorage.setItem('channel', $channel.value);
      localStorage.setItem('username', $username.value);
    }
  });

  $disconnect.addEventListener('click', disconnect);
})();
