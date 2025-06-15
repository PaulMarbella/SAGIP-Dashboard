setTimeout(() => {
    let currentChatTarget = ""; 
    let username = localStorage.getItem("username") || "";
    if (username === "null") username = "";
  
    function loadUserList() {
      fetch(`/SAGIP-Dashboard/handlers/chat/get-user-chat-list.php?admin=${encodeURIComponent(username)}`)
        .then(res => res.json())
        .then(users => {
          const userList = document.getElementById("userList");
          if (!userList) return;
          userList.innerHTML = "";
  
          users.forEach(user => {
            const li = document.createElement("li");
            li.className = "list-group-item list-group-item-action";
            li.textContent = user;
            li.onclick = () => {
              currentChatTarget = user;
              document.getElementById("chatTitle").textContent = `💬 Chat with ${user}`;
              document.getElementById("backToGlobalBtn").classList.remove("d-none");
              loadMessages();
            };
            userList.appendChild(li);
          });
        });
    }
  
    function loadMessages() {
      fetch(`/SAGIP-Dashboard/handlers/chat/fetch-messages.php?recipient=${encodeURIComponent(currentChatTarget)}&username=${encodeURIComponent(username)}`)
        .then(res => res.json())
        .then(data => {
          const messageList = document.getElementById("messageList");
          if (!messageList) return;
          messageList.innerHTML = "";
  
          data.forEach(msg => {
            const bubble = document.createElement("div");
            bubble.className = msg.username === username ? "chat-bubble own" : "chat-bubble other";
  
            const wrapper = document.createElement("div");
            wrapper.className = "d-flex justify-content-between align-items-center";
  
            const content = document.createElement("div");
            content.innerHTML = `<strong>${msg.username}</strong>: ${msg.message}`;
            wrapper.appendChild(content);
  
            const isAdmin = localStorage.getItem("role") === "admin";
            const isGlobalChat = currentChatTarget === "" || currentChatTarget === null;
  
            if (isAdmin && isGlobalChat) {
              const delBtn = document.createElement("button");
              delBtn.className = "btn btn-sm btn-danger ms-2";
              delBtn.textContent = "🗑️";
              delBtn.onclick = () => {
                if (confirm("Delete this message?")) {
                  fetch("/SAGIP-Dashboard/handlers/chat/delete-message.php", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `id=${encodeURIComponent(msg.id)}`,
                  }).then(() => loadMessages());
                }
              };
              wrapper.appendChild(delBtn);
            }
  
            const timestamp = document.createElement("div");
            timestamp.className = "text-muted small mt-1";
            timestamp.textContent = `${msg.date_pretty} • ${msg.time_pretty}`;
  
            bubble.appendChild(wrapper);
            bubble.appendChild(timestamp);
            messageList.appendChild(bubble);
          });
  
          messageList.scrollTop = messageList.scrollHeight;
        });
    }
  
    const interval = setInterval(() => {
      const sendBtn = document.getElementById("sendMessage");
      const backBtn = document.getElementById("backToGlobalBtn");
  
      if (sendBtn && backBtn && document.getElementById("messageInput")) {
        clearInterval(interval); // ✅ Elements are ready — now attach events
  
        backBtn.addEventListener("click", () => {
          currentChatTarget = "";
          document.getElementById("chatTitle").textContent = "💬 Global Chat";
          document.getElementById("backToGlobalBtn").classList.add("d-none");
          loadMessages();
        });
  
        sendBtn.addEventListener("click", () => {
          const message = document.getElementById("messageInput").value.trim();
          if (!message) return;
  
          fetch("/SAGIP-Dashboard/handlers/chat/chat.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `username=${encodeURIComponent(username)}&message=${encodeURIComponent(message)}&recipient=${encodeURIComponent(currentChatTarget)}`
          }).then(() => {
            document.getElementById("messageInput").value = "";
            loadMessages();
          });
        });
  
        loadUserList();
        loadMessages();
      }
    }, 50); 
  }, 0);
  