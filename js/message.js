(function () {
  console.log("[Chat script scoped]");

  const chatTitle = document.getElementById("chatTitle");
  const backToGlobalBtn = document.getElementById("backToGlobalBtn");
  const messageList = document.getElementById("messageList");
  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendMessage");

  let currentChatTarget = null;
let username = localStorage.getItem("username");
let role = localStorage.getItem("role");

console.log("username:", localStorage.getItem("username"));
console.log("role:", localStorage.getItem("role"));


// ✅ Normalize null/invalid values
if (username === "null" || !username) username = null;
if (role === "null" || !role) role = null;

// ✅ Send message handler
sendButton.addEventListener("click", (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();

  // ✅ Allow both admin and regular users
  if(username === null){
    username = "Admin";
    return message;
  }

  if (!message) return;

  // ✅ Send using actual username (not "Admin" label)
  fetch("/SAGIP-Dashboard/handlers/chat/chat.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `username=${encodeURIComponent(username)}&message=${encodeURIComponent(message)}&recipient=${encodeURIComponent(currentChatTarget || "")}`
  })
    .then(res => res.text())
    .then(txt => {
      console.log("Sent:", txt);
      messageInput.value = "";
    });
});

  function loadMessages() {
    const shouldScroll =
      messageList.scrollTop + messageList.clientHeight >= messageList.scrollHeight - 10;

    fetch(`/SAGIP-Dashboard/handlers/chat/fetch-messages.php?recipient=${encodeURIComponent(currentChatTarget || "")}&username=${encodeURIComponent(username)}`)
      .then(res => res.json())
      .then(data => {
        messageList.innerHTML = "";
        let lastDate = "";

        data.forEach(msg => {
          if (msg.date_pretty !== lastDate) {
            lastDate = msg.date_pretty;
            const dateDivider = document.createElement("div");
            dateDivider.classList.add("text-center", "text-muted", "my-2", "small");
            dateDivider.textContent = msg.date_pretty;
            messageList.appendChild(dateDivider);
          }

          const msgElement = document.createElement("div");
          msgElement.classList.add("chat-bubble", msg.username === username ? "own" : "other");

          const wrapper = document.createElement("div");
          wrapper.classList.add("d-flex", "flex-column");

          const header = document.createElement("div");
          header.classList.add("username", "d-flex", "align-items-center", "gap-1");
          header.innerHTML = `
            <span>${msg.role === "admin" ? "Admin" : msg.username}</span>
            <small class="text-muted">${msg.time_pretty}</small>
          `;

          if (role === "admin") {
            const delBtn = document.createElement("button");
            delBtn.classList.add("btn", "btn-sm", "btn-outline-danger", "ms-auto", "py-0", "px-2");
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

        if (shouldScroll) {
          messageList.scrollTop = messageList.scrollHeight;
        }
      })
      .catch(err => console.error("Fetch messages error:", err));
  }

  // Init load
  loadMessages();
  setInterval(loadMessages, 2000);

  // 🔁 Re-bind click events every time page is (re)loaded
  document.querySelectorAll(".message-contact-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const number = btn.dataset.number;
      const name = btn.dataset.name;

      currentChatTarget = number;
      chatTitle.textContent = `📱 Chat with ${name}`;
      backToGlobalBtn.classList.remove("d-none");
      loadMessages();
    });
  });

  backToGlobalBtn.addEventListener("click", () => {
    currentChatTarget = null;
    chatTitle.textContent = "💬 Global Chat";
    backToGlobalBtn.classList.add("d-none");
    loadMessages();
  });

})();
