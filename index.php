<?php include("./config/db.php"); ?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
  <link rel="stylesheet" href="./css/styles.css">

</head>
<body>



  <div class="container auth-box d-flex flex-column justify-content-center align-items-center vh-100">
    <h1 class="h1 text-center title-welcome">Welcome to <img src="./assets/images/logo-title.png" class="img-fluid logo-title"></h1>
    <p>Self-Sustained Automated Gateway and Information Platform</p>
    <div class="p-3 mt-3 col-6 d-flex justify-content-center align-items-center text-center">
      <div class="d-flex gap-5 ">
        <a class="btn btn-danger d-flex gap-2 p-3 px-5" id="user"><i class="bi bi-person"></i>User</a>
        <a class="btn btn-secondary d-flex gap-2 p-3 px-5" id="admin"><i class="bi bi-person-lock"></i>Admin</a>
      </div>
    </div>
  </div>

  <div class="modal fade" id="authModal" tabindex="-1" aria-labelledby="authModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content p-3">
      <div class="modal-header">
        <h5 class="modal-title">User Authentication</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body text-center d-flex gap-3">
        <button class="btn btn-danger w-100 p-3" id="openSignup">Sign Up</button>
        <button class="btn btn-secondary w-100 p-3" id="openLogin">Log In</button>
      </div>
    </div>
  </div>
</div>

<!-- Signup Form -->
<div class="modal fade" id="signupModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content p-3">
      <div class="modal-header fw-bold"><h5>Sign Up</h5></div>
      <div class="modal-body">
  <form id="signupForm">
    <!-- Username Field -->
    <div class="mb-3">
      <label for="signupUsername" class="form-label">Username</label>
      <input
        type="text"
        id="signupUsername"
        class="form-control"
        placeholder="Enter your Username"
        aria-describedby="usernameError"
        required
      />
      <div id="usernameError" class="text-danger small mt-1"></div>
    </div>

    <!-- Password Field -->
    <div class="mb-3">
      <label for="signupPassword" class="form-label">Password</label>
      <input
        type="password"
        id="signupPassword"
        class="form-control"
        placeholder="Password"
        autocomplete="new-password"
        aria-describedby="passwordError"
        required
      />
      <div id="passwordError" class="text-danger small mt-1"></div>
    </div>

    <!-- Confirm Password Field -->
    <div class="mb-3">
      <label for="signupRePassword" class="form-label">Re-enter Password</label>
      <input
        type="password"
        id="signupRePassword"
        class="form-control"
        placeholder="Re-enter Password"
        aria-describedby="rePasswordError"
        autocomplete="new-password"
        required
      />
      <div id="rePasswordError" class="text-danger small mt-1"></div>
    </div>
  </form>
</div>

      <div class="modal-footer">
        <button class="btn btn-success" id="submitSignup">Sign Up</button>
      </div>
    </div>
  </div>
</div>

<!-- Login Form -->
  <div class="modal fade" id="loginModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-3">
        <div class="modal-header"><h5>Log In</h5></div>
        <div class="modal-body">

        <div class="mb-3">
          <label class="form-label">Username</label>
          <input type="text" id="loginUsername" class="form-control mb-1" placeholder="Username" />
          <div id="loginUsernameError" class="text-danger small mb-2"></div>
        </div>

        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" id="loginPassword" autocomplete="new-password" class="form-control mb-1" placeholder="Password" />
          <div id="loginPasswordError" class="text-danger small mb-2"></div>
        </div>

        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" id="submitLogin">Log In</button>
        </div>
      </div>
    </div>
  </div>


<div class="modal fade" id="passModal" tabindex="-1" aria-labelledby="passModalLabel" aria-hidden="true"> 
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="passModalLabel">Admin Password</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input type="password" id="adminPasswordInput" class="form-control" placeholder="Enter Password" required />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="submitAdminPassword">Continue</button>
      </div>
    </div>
  </div>
</div>



  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="/SAGIP-Dashboard/js/auth.js"></script>
</body>
</html>