class EmailCopy {
    constructor() {
        this.email = document.querySelector('#email');
        this.events();
        this.alert = document.querySelector('.site-header__copy-alert');
    }
    events() {
        this.email.addEventListener('click', () => this.copyEmail());
    }

    copyEmail() {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(this.email);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        this.copyAlert();
    }

    setTimers() {
        this.opactiyTimer = setTimeout(() => {
            this.alert.style.opacity = '0';
        }, 1000);
        this.displayTimer = setTimeout(() => (this.alert.style.display = 'none'), 2000);
    }

    copyAlert() {
        // this.alert.classList.toggle('site-header__copy-alert--is-visible');
        clearTimeout(this.opactiyTimer);
        clearTimeout(this.displayTimer);
        this.alert.style.transition = 'none';
        this.alert.style.opacity = '1';
        this.alert.style.display = 'block';
        this.alert.style.transition = 'opacity 1s';
        this.setTimers();
    }
}

export default EmailCopy;