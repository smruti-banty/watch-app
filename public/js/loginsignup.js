const loginPage = document.querySelector('.login-background')
const signInBtn = document.querySelector('.login-background .signup-card form');
const logInBtn = document.querySelector('.login-background .login-card form');
const logout = document.querySelector('header .logout');

signInBtn.addEventListener('submit', onSignIn);
logInBtn.addEventListener('submit', onLogIn);
logout.addEventListener('click', onLogout);

function onSignIn(event) {
    event.preventDefault();
    const form = event.target;
    const allInput = form.querySelectorAll('.form-control');

    const inputs = Array.from(allInput);
    const user = {};
    inputs.forEach(input => { user[input.name] = input.value });

    const headers = {
        "Content-Type": "application/json"
    };

    fetch(`/api/user/signup`, { method: 'POST', headers, body: JSON.stringify(user) })
        .then(response => {
            alert('Account created');
        }).catch(error => console.error(error));

    form.reset();
}

async function onLogIn(event) {
    event.preventDefault();
    const form = event.target;
    const allInput = form.querySelectorAll('.form-control');

    const inputs = Array.from(allInput);
    const user = {};
    inputs.forEach(input => { user[input.name] = input.value });

    const headers = {
        "Content-Type": "application/json"
    };

    const response = await fetch(`/api/user/login`, { method: 'POST', headers, body: JSON.stringify(user) }).catch(error => alert('Unauthorized acess'))
    const secret = await response.json();

    if (secret.token) {
        localStorage.setItem('token', secret.token);
        loginPage.classList.add('d-none');
        counterValue();
    } else {
        alert('Invalid user');
    }

}

function onLogout(event) {
    if (confirm('Are you want to logout')) {
        const token = localStorage.getItem('token');

        const headers = {
            authorization: `Bearer ${token}`
        };

        fetch(`/api/user/logout`, { headers }).then(response => {
            if (response.ok) {
                localStorage.removeItem('token');
                loginPage.classList.remove('d-none');
                counterValue(0);
            }
        }).catch(error => console.error(error));

    }
}

function checkToken() {
    if (localStorage.getItem('token') && !loginPage.classList.contains('d-none')) {
        loginPage.classList.add('d-none');
    } else {
        loginPage.classList.remove('d-none');
    }
}