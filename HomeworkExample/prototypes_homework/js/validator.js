
class Validator {
    constructor() {
        this.email = "admin@b.c";
        this.password = "123";
    }

    check(inputEmail, inputPass) {
        if (!inputEmail || !inputPass) {
            return 'Fill in both fields!';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputEmail)) {
            return 'Invalid email format!';
        }

        if (this.email === inputEmail && this.password === inputPass) {
            return true;
        } else {
            return 'Incorrect login or password!';
        }
    }
}

export default Validator;