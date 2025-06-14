(function () {
  console.log("[Chat script scoped]");

  const messageList = document.getElementById("messageList");
  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendMessage");

  let username = localStorage.getItem("username");
  let role = localStorage.getItem("role");

  // ✅ Fix invalid string "null"
  if (username === "null" || !username) username = null;
  if (role === "null" || !role) role = null;

  sendButton.addEventListener("click", (e) => {
    e.preventDefault();
  
    const message = messageInput.value.trim();
  
    // ✅ Check username again (this time also log it)
    if (!username || username === "null" || username.trim() === "") {
      alert("You must be logged in to send messages.");
      console.warn("Missing or invalid username:", username);
      return;
    }
  
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
    const shouldScroll =
      messageList.scrollTop + messageList.clientHeight >= messageList.scrollHeight - 10;

    fetch("/SAGIP-Dashboard/handlers/chat/fetch-messages.php")
      .then(res => res.json())
      .then(data => {
        messageList.innerHTML = "";

        let lastDate = "";

        


        data.forEach(msg => {
          // Show date separator if new day
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
        

          // ✅ Add delete button only for admin
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

  loadMessages();
  setInterval(loadMessages, 2000);
})(); 
