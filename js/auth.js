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

  usernameError.textContent = "";
  passwordError.textContent = "";

  if (!username) {
    usernameError.textContent = "Username is required.";
    return;
  }
  if (!password) {
    passwordError.textContent = "Password is required.";
    return;
  }

  fetch("/SAGIP-Dashboard/handlers/submit-user/login.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);

        const redirect = data.role === "admin"
          ? "/SAGIP-Dashboard/pages/Home/home-admin.php"
          : "/SAGIP-Dashboard/pages/Home/home.php";

        window.location.href = redirect;
      } else {
        const msg = data.message;
        if (msg.includes("password")) {
          passwordError.textContent = msg;
        } else {
          usernameError.textContent = msg;
        }
      }
    });
});




document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("openSignup").addEventListener("click", function () {
    const signupModal = new bootstrap.Modal(document.getElementById("signupModal"));
    signupModal.show();
  });

  document.getElementById("openLogin").addEventListener("click", function () {
    const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
    loginModal.show();
  });

});

