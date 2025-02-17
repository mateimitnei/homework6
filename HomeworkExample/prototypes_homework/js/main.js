/* 
*  Application initialization scheme
*/

let validatorModule = new Validator();

let galleryModule = new BaseGallery();
//let galleryModule = new ExtendedGallery();

let loginForm = new LoginForm(validatorModule, galleryModule);
loginForm.initComponent();
