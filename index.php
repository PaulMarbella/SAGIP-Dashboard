<?php include("./config/db.php"); ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SAGIP Authentication</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="/SAGIP-Dashboard/css/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@400&display=swap" rel="stylesheet">
</head>
<body>

    <div class="container auth-box d-flex flex-column justify-content-center align-items-center vh-100 text-center">
        <h1 class="h1 title-welcome mb-3">
            Welcome to <img src="./assets/images/logo-title.png" class="img-fluid logo-title" alt="SAGIP Logo">
        </h1>
        <p class="lead text-muted mb-4">Self-Sustained Automated Gateway and Information Platform</p>

        <div class="p-3 col-12 col-md-8 col-lg-6">
            <div class="row g-4 justify-content-center">
                <div class="col-12 col-sm-6">
                    <a class="btn btn-danger p-3 btn-lg w-100 d-flex align-items-center justify-content-center button-glow" id="user" href="#">
                        <i class="bi bi-person me-2"></i>User
                    </a>
                </div>
                <div class="col-12 col-sm-6">
                    <a class="btn btn-secondary p-3 btn-lg w-100 d-flex align-items-center justify-content-center button-glow" id="admin" href="#">
                        <i class="bi bi-person-lock me-2"></i>Admin
                    </a>
                </div>
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

    <div class="modal fade" id="signupModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content p-3">
                <div class="modal-header fw-bold"><h5>Sign Up</h5></div>
                <div class="modal-body">
                    <form id="signupForm">
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

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="/SAGIP-Dashboard/js/auth.js"></script>
</body>
</html>