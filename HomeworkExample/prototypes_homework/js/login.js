
class LoginForm {
	constructor(validatorModule, galleryModule) {
		this.validator = validatorModule;
		this.gallery = galleryModule;
		this.form = document.querySelector('#login-form');
		this.submitButton = this.form.querySelector('button[type="submit"]');
		this.alert = document.querySelector('.alert-danger');
		this.logoutButton = document.querySelector('#logout');
		this.topButtons = document.querySelector('#top-buttons');
		if (!sessionStorage.getItem('loggedIn')) {
			sessionStorage.setItem('loggedIn', 'false');
		}
	}

	init() {
		if (sessionStorage.getItem('loggedIn') === 'true') {
			this.showGallery();
		}
		else {
			this.form.style.display = 'block';
			this.submitButton.addEventListener('click', (event) => this.validateForm(event));
		}
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

	showGallery() {
		this.alert.style.visibility = 'hidden';
		this.form.style.display = 'none';
		this.topButtons.style.visibility = 'visible';

		this.gallery.init();

		this.logoutButton.addEventListener('click', () => this.logout());
	}

	logout() {
		sessionStorage.setItem('loggedIn', 'false');
		this.topButtons.style.visibility = 'hidden';
		this.form.style.display = 'block';

		document.getElementById('inputEmail').value = '';
		document.getElementById('inputPassword').value = '';
	}
}

export default LoginForm;