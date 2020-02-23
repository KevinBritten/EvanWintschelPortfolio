class AboutSection {
    constructor() {
        this.aboutBtn = document.querySelector('#about-button');
        this.closeBtn = document.querySelector('.about-overlay__close-button');
        this.contentHeading = document.querySelector('.content-area__heading');
        this.contentSectionHeight = document.querySelector('.content-area').scrollHeight;
        this.contentSection = document.querySelector('.content-area__box');
        this.aboutOverlay = document.querySelector('.about-overlay');
        this.albumsList = document.querySelector('.content-area__list');
        this.aboutEscape = function() {
            if (event.keyCode === 27) {
                this.toggleAboutSection();
            }
        };
        this.aboutEscapeBinded = this.aboutEscape.bind(this);
        this.events();
    }

    events() {
        this.aboutBtn.addEventListener('click', () => this.toggleAboutSection());
        this.closeBtn.addEventListener('click', () => this.toggleAboutSection());
    }

    toggleAboutSection() {
        this.contentSection.style.minHeight = `${this.contentSectionHeight}px`;
        this.aboutOverlay.classList.toggle('about-overlay--is-visible');
        this.albumsList.classList.toggle('content-area__list--is-hidden');
        if (this.aboutOverlay.classList.contains('about-overlay--is-visible')) {
            document.addEventListener('keydown', this.aboutEscapeBinded);
            this.contentHeading.innerText = 'About';
        } else {
            document.removeEventListener('keydown', this.aboutEscapeBinded);
            this.contentHeading.innerText = 'Albums';
        }
    }
}

export default AboutSection;