class ContentSection {
    constructor() {
        this.aboutBtn = document.querySelector('#about-button');
        this.printsBtn = document.querySelector('#prints-button');
        this.closeBtn = document.querySelector('.content-overlay__close-button');
        this.contentHeading = document.querySelector('.content-area__heading');
        this.contentSectionHeight = document.querySelector('.content-area').scrollHeight;
        this.contentSection = document.querySelector('.content-area__box');
        this.contentOverlay = document.querySelector('.content-overlay');
        this.albumsList = document.querySelector('.content-area__list');
        this.contentText = document.querySelector('.content-overlay__text');
        this.contentEscape = function() {
            if (event.keyCode === 27) {
                this.toggleSection();
            }
        };
        this.contentEscapeBinded = this.contentEscape.bind(this);
        this.events();
    }

    events() {
        this.aboutBtn.addEventListener('click', (e) => this.openContent(e));
        this.printsBtn.addEventListener('click', (e) => this.openContent(e));
        this.closeBtn.addEventListener('click', (e) => this.toggleSection());
    }

    openContent(e) {
        let capsTitle = e.target.innerText;
        let title = capsTitle.charAt(0) + capsTitle.slice(1).toLowerCase();
        let contentTexts = {
            About: `Born in Ontario, raised in Vancouver and living in Montreal. 
Fortunate enough to attend a high school with a darkroom.`,
            Prints: `If you would like to buy prints of my work or have any questions please send me an email via evan.wintschel@gmail.com`
        };
        this.contentSection.style.minHeight = `${this.contentSectionHeight}px`;
        if (
            title === this.contentHeading.innerText &&
            this.contentOverlay.classList.contains('content-overlay--is-visible')
        ) {
            this.toggleSection();
        } else if (!this.contentOverlay.classList.contains('content-overlay--is-visible')) {
            document.addEventListener('keydown', this.contentEscapeBinded);
            this.contentHeading.innerText = title;
            this.contentText.innerText = contentTexts[`${title}`];
            this.toggleSection();
        } else {
            this.contentHeading.innerText = title;
            this.contentText.innerText = contentTexts[`${title}`];
        }
    }
    toggleSection() {
        this.contentOverlay.classList.toggle('content-overlay--is-visible');
        this.albumsList.classList.toggle('content-area__list--is-hidden');
        if (!this.contentOverlay.classList.contains('content-overlay--is-visible')) {
            document.removeEventListener('keydown', this.contentEscapeBinded);
            this.contentHeading.innerText = 'Albums';
        }
    }
}

export default ContentSection;