const role = localStorage.getItem('role');
const userName = localStorage.getItem('userName');

if (!role || (role !== 'admin' && !userName)) {
  alert("Missing role or userName. Please log in again.");
}


const sender = role === 'admin' ? 'Admin' : userName;

document.getElementById('sendMessage').addEventListener('click', function () {
  const message = document.getElementById('messageInput').value.trim();
  if (!message) return;

  const newMessage = document.createElement('div');
  newMessage.classList.add('mb-2', 'p-2', 'border', 'rounded');
  newMessage.innerHTML = `<strong class="text-primary">${sender}:</strong> ${message}`;

  const messageList = document.getElementById('messageList');
  messageList.appendChild(newMessage);
  messageList.scrollTop = messageList.scrollHeight;

  document.getElementById('messageInput').value = '';
});
