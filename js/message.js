const storedName = localStorage.getItem('userName');

  if (!storedName) {
    alert("No userName found in localStorage. Please set it using:\nlocalStorage.setItem('userName', 'YourName');");
  }

  document.getElementById('sendMessage').addEventListener('click', function () {
    const message = document.getElementById('messageInput').value.trim();
    if (!storedName || !message) return;

    const newMessage = document.createElement('div');
    newMessage.classList.add('mb-2', 'p-2', 'border', 'rounded');
    newMessage.innerHTML = `<strong class="text-primary">${storedName}:</strong> ${message}`;

    const messageList = document.getElementById('messageList');
    messageList.appendChild(newMessage);
    messageList.scrollTop = messageList.scrollHeight;

    document.getElementById('messageInput').value = '';
  });