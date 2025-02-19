import Validator from './validator.js';
import ExtendedGallery from './gallery.js';
import LoginForm from './login.js';


let validatorModule = new Validator();

let galleryModule = new ExtendedGallery();
galleryModule.initListeners();

let loginForm = new LoginForm(validatorModule, galleryModule);
loginForm.init();
