class AboutSection {
    constructor() {
        this.aboutBtn = document.querySelector('#about-button');
        this.closeBtn = document.querySelector('.about-overlay__close-button');
        this.contentSection = document.querySelector('.content-area__box');
        this.aboutOverlay = document.querySelector('.about-overlay');
        this.albumsList = document.querySelector('.content-area__list');
        this.events();
    }

    events() {
        this.aboutBtn.addEventListener('click', () => this.toggleAboutSection());
        this.closeBtn.addEventListener('click', () => this.toggleAboutSection());
    }

    toggleAboutSection() {
        this.aboutOverlay.classList.toggle('about-overlay--is-visible');
        this.albumsList.classList.toggle('content-area__list--is-hidden');
    }
}

export default AboutSection;