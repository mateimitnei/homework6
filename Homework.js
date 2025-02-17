// Goal: Learn to create modules using constructor functions and prototypes. Learn basic inheritance techniques.
// You need to combine the "login" component (login and password checks) which was implemented in the previous homework
// with the image gallery.
// Specifically, simulate authentication. If nothing else is specified, the login form and gallery should work as
// described in the previous homework assignments.
// You can see the template in HomeworkExample.

// Basic task description:
// To implement this task, use ES6 syntax is **not** necessary.
// The application should consist of several modules. Each module is placed in its own file.
// Each module is a separate constructor function. Methods are not placed inside the constructor function but inside
// the prototype (prototype). A rough scheme of module organization and their initialization sequence is available in
// the attachment.
// In the basic version of the task, inheritance should not be used. Everything should be implemented only through
// prototypes.
// Creating objects from constructor functions should occur in the main.js file.
// There should be 3 modules: "login module", "validation module", "gallery module".
// The first module "login" or "authentication" is responsible for user input of login and password. In some way,
// this is the main or controlling module. It also handles initializing the gallery, working with the top menu,
// displaying the user profile, and the logout button. Inside itself, it uses/calls the "validation module" to check
// the correctness of login and password.
// In the case of successful login (correct login/password), the gallery module is initialized.
// If login is successful, after a page reload, the user cannot see the password input form anymore but directly sees
// the gallery (the same behavior as everywhere else. If you log in to the mail, after page reload, you see not the
// login form but the list of emails).
// In the Header menu (top or upper menu) there are three buttons. "Gallery", "About User", and "Logout". When clicking
// on the "gallery" button — the gallery is visible. When clicking on the "About User" button — information about the
// user opens. When clicking on the "logout" button, logging out or "exiting" occurs. The user is redirected back to
// the password input page. Until they provide the correct login and password again, they can't see the gallery or their
// profile.
// Extended task description:
// The functionality of adding a new image and removing it from the gallery should be moved to a separate "class".
// So, the basic "class" of the gallery will contain all the functionality except for the code that handles the
// "add image" and "remove" buttons.
// A separate class that inherits the base one implements these capabilities.
// Thus, an instance of the inherited class needs to be created, inheriting the base class using a function for
// inheritance:

function inheritance(parent, child) {
    let tempChild = child.prototype;
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;

    for (let key in tempChild) {
        if (tempChild.hasOwnProperty(key)) {
            child.prototype[key] = tempChild[key];
        }
    }
}

// Step-by-step algorithm:
// 1. The constructor function of the "login" module takes an object as a parameter. This object sets the correct login
// and password. {login: "admin", password: "qaz1234"}
// 2. Upon password entry by the user, it is checked using the "validation" module.
// 3. The following checks are applied: fields are not empty, the email matches the pattern, the password is at least 8
// characters long. For each case, a specific error message is displayed.
// 4. If all checks pass, the entered data (login/password) is compared with the reference ones.
// 5. If everything is okay, the gallery is initialized.
// 6. The gallery is opened, and the current open page is highlighted in the top menu.
// 7. The login module should contain code that handles the display and operation of the "logout" button.
// 8. Accordingly, after successful login, the button appears, and when pressed, it logs out ("exiting").
// 9. When clicking on the "About User" button in the top menu, information about the user is displayed. His login and
// password, as well as a button "show password". Just as in the previous homework.
// 10. When clicking on the "gallery" button in the top menu, the gallery is displayed.

