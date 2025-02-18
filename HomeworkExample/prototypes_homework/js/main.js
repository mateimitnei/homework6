import Validator from './validator.js';
import BaseGallery from './gallery.js';
import ExtendedGallery from './gallery.js';
import LoginForm from './login.js';

let validatorModule = new Validator();
let galleryModule = new BaseGallery();
let galleryManager = new ExtendedGallery();

let loginForm = new LoginForm(validatorModule, galleryModule);

loginForm.initListeners();
