class LoginForm {

	constructor(validatorModule, galleryModule) {
		this.validator = validatorModule;
  		this.galleryPage = galleryModule;

		this.form = document.querySelector('#login-form');
		this.submitButton = this.form.querySelector('button[type="submit"]');
		this.alert = document.querySelector('.alert-danger');
		this.logoutButton = document.querySelector('#logout');
		this.userButton = document.querySelector('#user-button');
		this.galleryButton = document.querySelector('#gallery-button');
		this.topButtons = document.querySelector('#top-buttons');
		this.userPage = document.querySelector('#user-page');
	}

	init() {
		if (sessionStorage.getItem('loggedIn') === 'true') {
			this.showGallery();
		}
		else {
			this.form.style.display = 'block';
		}

		this.initListeners();
	}

	initListeners() {
		this.submitButton.addEventListener('click', (event) => this.validateForm(event));
		this.logoutButton.addEventListener('click', () => this.logout());
		this.galleryButton.addEventListener('click', () => this.showGallery());
		this.userButton.addEventListener('click',
			() => this.showUserInfo(this.validator.email, this.validator.password));
	}

	validateForm(event) {
		event.preventDefault();

		const inputEmail = document.getElementById('inputEmail').value.trim();
		const inputPass = document.getElementById('inputPassword').value.trim();

		const result = this.validator.check(inputEmail, inputPass);

		if (result === true) {
			sessionStorage.setItem('loggedIn', 'true');
			this.showGallery();
		}
		else this.showAlert(result);
	}

	showAlert(message) {
		this.alert.textContent = message;
		this.alert.style.visibility = 'visible';
	}

	logout() {
		sessionStorage.setItem('loggedIn', 'false');
		this.topButtons.style.visibility = 'hidden';
		this.form.style.display = 'block';

		this.galleryPage.hide();
		this.userPage.style.display = 'none';

		document.getElementById('inputPassword').value = '';
	}

	showGallery() {
		this.alert.style.visibility = 'hidden';
		this.form.style.display = 'none';
		this.topButtons.style.visibility = 'visible';
		this.userPage.style.display = 'none';
		this.userButton.classList.remove('btn-primary');
		this.galleryButton.classList.add('btn-primary');

		this.galleryPage.init();
	}

	showUserInfo(email, password) {
		this.galleryPage.hide();
		this.galleryButton.classList.remove('btn-primary');
		this.userButton.classList.add('btn-primary');

		this.userPage.innerHTML = `
            <div class="container border rounded-3 box-shadow"
                    style="width: fit-content; padding: 50px 75px; margin-top: 120px;">
                <h1 class="mb-3">Welcome, ${email.split('@')[0]}!</h1>
                <p class="mb-5">This is your Cargram account data:</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Password:</b>
                    <span id="passwordDisplay">${'*'.repeat(password.length)}</span>
                    <button class="btn btn-primary ml-2" id="revealButton">Show</button>
                </p>
            </div>`;
		this.userPage.style.display = 'block';

		const revealButton = document.getElementById('revealButton');
		const passwordDisplay = document.getElementById('passwordDisplay');

		revealButton.addEventListener('click', function () {
			if (revealButton.textContent === 'Show') {
				passwordDisplay.textContent = password;
				revealButton.textContent = 'Hide';
			} else {
				passwordDisplay.textContent = '*'.repeat(password.length);
				revealButton.textContent = 'Show';
			}
		});
	}
}

export default LoginForm;
