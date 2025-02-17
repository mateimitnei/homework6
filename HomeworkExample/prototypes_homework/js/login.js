
class LoginForm {
	constructor(validatorModule, galleryModule) {
		this.validator = validatorModule;
		this.gallery = galleryModule;
	}

	initComponent(){
		// code
	}

	validateUserData(){
		this.validator.check();
	}

	showGallery(){
		this.gallery.initComponent();
	}
}
