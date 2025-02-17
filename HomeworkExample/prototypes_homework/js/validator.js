
class Validator {
    constructor() {
        this.email = "a@b.c";
        this.password = "1";
    }

    check(inputEmail, inputPass) {
        if (!inputEmail || !inputPass) {
            return 'Form is filled out incorrectly';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputEmail)) {
            return 'Invalid email format';
        }

        if (this.email === inputEmail && this.password === inputPass) {
            return true;
        } else {
            return 'Incorrect login or password';
        }
    }
}

export default Validator;