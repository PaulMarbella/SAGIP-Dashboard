document.getElementById("submitSignup").addEventListener("click", function () {
  const username = document.getElementById("signupUsername").value.trim();
  const password = document.getElementById("signupPassword").value;
  const rePassword = document.getElementById("signupRePassword").value;

  // Clear previous errors
  document.getElementById("usernameError").textContent = "";
  document.getElementById("passwordError").textContent = "";
  document.getElementById("rePasswordError").textContent = "";

  let hasError = false;

  if (!username) {
    document.getElementById("usernameError").textContent = "Username is required.";
    hasError = true;
  }

  if (!password) {
    document.getElementById("passwordError").textContent = "Password is required.";
    hasError = true;
  }

  if (!rePassword) {
    document.getElementById("rePasswordError").textContent = "Please re-enter your password.";
    hasError = true;
  } else if (password && password !== rePassword) {
    document.getElementById("rePasswordError").textContent = "Passwords do not match.";
    hasError = true;
  }

  if (hasError) return; // Stop if there are validation errors

  // Proceed with fetch if all is good
  fetch("/SAGIP-Dashboard/handlers/submit-user/signin.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
  })
    .then(res => res.text())
    .then(msg => {
      if (msg.trim() === "success") {
        localStorage.setItem("username", username);
        localStorage.setItem("role", "user");
        window.location.href = "../../SAGIP-Dashboard/pages/Home/home.php";
      } else {
        document.getElementById("usernameError").textContent = msg; // show server error inline
      }
    });
});





document.getElementById("submitLogin").addEventListener("click", function () {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;

  const usernameError = document.getElementById("loginUsernameError");
  const passwordError = document.getElementById("loginPasswordError");

  // Clear previous errors
  usernameError.textContent = "";
  passwordError.textContent = "";

  let hasError = false;

  // Client-side validation
  if (!username) {
    usernameError.textContent = "Username is required.";
    hasError = true;
  }

  if (!password) {
    passwordError.textContent = "Password is required.";
    hasError = true;
  }

  if (hasError) return;

  fetch("/SAGIP-Dashboard/handlers/submit-user/login.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
  })
    .then(res => res.text())
    .then(msg => {
      const trimmedMsg = msg.trim();

      if (trimmedMsg === "success") {
        localStorage.setItem("username", username);
        localStorage.setItem("role", "user");
        window.location.href = "/SAGIP-Dashboard/pages/Home/home.php";
      } else if (trimmedMsg === "❌ Incorrect password.") {
        passwordError.textContent = "Incorrect password.";
      } else if (trimmedMsg === "❌ Account not found.") {
        usernameError.textContent = "Account not found.";
      } else if (trimmedMsg === "❌ Missing input.") {
        usernameError.textContent = "Please fill in both fields.";
      } else {
        usernameError.textContent = trimmedMsg; // fallback for unknown error
      }
    });
});



document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("user").addEventListener("click", function (e) {
    e.preventDefault();
    const authModal = new bootstrap.Modal(document.getElementById("authModal"));
    authModal.show();
  });

  document.getElementById("openSignup").addEventListener("click", function () {
    const signupModal = new bootstrap.Modal(document.getElementById("signupModal"));
    signupModal.show();
  });

  document.getElementById("openLogin").addEventListener("click", function () {
    const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
    loginModal.show();
  });

});

document.addEventListener("DOMContentLoaded", function () {
  const adminBtn = document.getElementById("admin");
  const passModal = new bootstrap.Modal(document.getElementById("passModal"));
  const submitAdminPassword = document.getElementById("submitAdminPassword");
  const adminPasswordInput = document.getElementById("adminPasswordInput");

  // Optional: inline error display
  const errorDisplay = document.createElement("div");
  errorDisplay.className = "text-danger mt-2 small";
  adminPasswordInput.insertAdjacentElement("afterend", errorDisplay);

  adminBtn.addEventListener("click", function (event) {
    event.preventDefault();
    errorDisplay.textContent = ""; // Clear previous errors
    adminPasswordInput.value = ""; // Reset input
    passModal.show();
  });

  submitAdminPassword.addEventListener("click", function () {
    const password = adminPasswordInput.value.trim();
    const correctPassword = "superchong21";

    if (password === correctPassword) {
      localStorage.setItem("role", "admin");
      localStorage.removeItem("username"); // optional: clear user info
      window.location.href = "/SAGIP-Dashboard/pages/Home/home-admin.php";
    } else {
      errorDisplay.textContent = "❌ Incorrect password.";
    }
  });
});

