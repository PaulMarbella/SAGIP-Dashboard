(function () {
  console.log("[Chat script scoped]");

  const messageList = document.getElementById("messageList");
  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendMessage");

  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role"); // <-- ✅ check if admin

  sendButton.addEventListener("click", (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (!message) return;

    fetch("/SAGIP-Dashboard/handlers/chat/chat.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `username=${encodeURIComponent(username)}&message=${encodeURIComponent(message)}`
    })
    .then(res => res.text())
    .then(txt => {
      console.log("Sent:", txt);
      messageInput.value = "";
    });
  });

  function loadMessages() {
    fetch("/SAGIP-Dashboard/handlers/chat/fetch-messages.php")
      .then(res => res.json())
      .then(data => {
        messageList.innerHTML = "";
        data.forEach(msg => {
          const msgElement = document.createElement("div");
          msgElement.classList.add("chat-bubble", msg.username === username ? "own" : "other");

          const wrapper = document.createElement("div");
          wrapper.classList.add("d-flex", "flex-column");

          const header = document.createElement("div");
          header.classList.add("username");

          header.innerHTML = `
            ${msg.username} <small class="text-muted">${msg.created_at}</small>
          `;

          // ✅ Add delete button only for admin
          if (role === "admin") {
            const delBtn = document.createElement("button");
            delBtn.classList.add("btn", "btn-sm", "btn-outline-danger", "ms-2", "py-0", "px-2");
            delBtn.style.fontSize = "12px";
            delBtn.innerHTML = "🗑️";
            delBtn.addEventListener("click", () => {
              if (confirm("Delete this message?")) {
                fetch("/SAGIP-Dashboard/handlers/chat/delete-message.php", {
                  method: "POST",
                  headers: { "Content-Type": "application/x-www-form-urlencoded" },
                  body: `id=${msg.id}`
                }).then(() => loadMessages());
              }
            });
            header.appendChild(delBtn);
          }

          const bubble = document.createElement("div");
          bubble.classList.add("bubble", "p-2", "rounded");
          bubble.textContent = msg.message;

          wrapper.appendChild(header);
          wrapper.appendChild(bubble);
          msgElement.appendChild(wrapper);
          messageList.appendChild(msgElement);
        });

        messageList.scrollTop = messageList.scrollHeight;
      });
  }

  loadMessages();
  setInterval(loadMessages, 2000);
})();
