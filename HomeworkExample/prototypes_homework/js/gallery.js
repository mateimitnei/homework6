class BaseGallery {

	constructor() {
		this.gallery = document.querySelector('#gallery-page');
	}

	init() {
		this.gallery.style.display = 'block';
	}

	hide() {
		this.gallery.style.display = 'none';
	}

	initListeners () {

	}
}

class ExtendedGallery extends BaseGallery {

	addImage() {

	}
}

export default BaseGallery;
