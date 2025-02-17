
class Validator {
    constructor() {
        this.email = "admin";
        this.password = "12345678";
    }

    check(inputEmail, inputPass) {
        if (!inputEmail || !inputPass) {
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputEmail)) {
            return false;
        }

        return this.email === inputEmail && this.password === inputPass;
    }
}
