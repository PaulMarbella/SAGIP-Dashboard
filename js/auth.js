const userBtn = document.getElementById('user');
const saveNameBtn = document.getElementById('saveNameBtn');
const adminBtn = document.getElementById('admin')
const submitAdminPassword = document.getElementById('submitAdminPassword');



userBtn.addEventListener('click', function (event) {
  event.preventDefault(); 
  const nameModal = new bootstrap.Modal(document.getElementById('nameModal'));
  nameModal.show();
});

saveNameBtn.addEventListener('click', function () {
  const name = document.getElementById('userNameInput').value.trim();

  if (name) {
    localStorage.setItem('userName', name);
    localStorage.setItem('role', 'user'); 
    window.location.href = '/pages/Home/home.html';
  } else {
    alert('Please enter your name.');
  }
});



adminBtn.addEventListener('click', function (event) {
  event.preventDefault();
  const passModal = new bootstrap.Modal(document.getElementById('passModal'));
  passModal.show();
});

submitAdminPassword.addEventListener('click', function () {
  const password = document.getElementById('adminPasswordInput').value;

  const correctPassword = "superchong123"; 

  if (password === correctPassword) {
    localStorage.setItem('role', 'admin');
    localStorage.removeItem('userName'); 
    window.location.href = './pages/Home/home-admin.html'; 
  } else {
    alert('Incorrect password!');
  }
});
