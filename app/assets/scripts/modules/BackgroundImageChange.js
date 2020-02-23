import ImageList from './ImageList.js';
const imageList = new ImageList();

class BackgroundImageChange {
    constructor() {
        this.albumList = imageList.list;
        this.pauseBtn = document.querySelector('.pause-btn');
        this.bgImageListCreator();
        this.bgImageListRandomizer();
        this.totalImages = this.bgImageList.length;
        this.about = document.querySelector('#about-button');
        this.closeBtn = document.querySelector('.about-overlay__close-button');
        this.aboutOverlay = document.querySelector('.about-overlay');
        this.albumArea = document.querySelector('.content-area__list');
        this.lightbox = document.querySelector('.lightbox');
        this.lightboxCloseButton = this.lightbox.querySelector('.lightbox__close-button');
        this.lightboxBackgroundEscapeBinded = this.lightboxBackgroundEscape.bind(this);
        this.aboutBackgroundEscapeBinded = this.aboutBackgroundEscape.bind(this);
        this.randomStartImage();
        this.events();
        this.bgCycleStarter();
    }

    events() {
        this.pauseBtn.addEventListener('click', () => this.pauseBtnToggle());
        this.about.addEventListener('click', () => this.aboutBackground());
        this.closeBtn.addEventListener('click', () => this.aboutBackground());
        this.albumArea.addEventListener('click', () => this.lightboxBackground());
        this.lightboxCloseButton.addEventListener('click', () => this.lightboxBackgroundClose());
    }

    bgImageListCreator() {
        this.bgImageList = [];
        let keys = Object.keys(this.albumList);
        for (let key of keys) {
            this.albumList[key].map((image) => {
                if (image.includes('-bg')) {
                    this.bgImageList.push(`./assets/images/albums/${key}/${image}`);
                }
            });
        }
    }

    bgImageListRandomizer() {
        let array = this.bgImageList;
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    aboutBackground() {
        document.body.classList.toggle('about-background');
        if (document.body.classList.contains('about-background')) {
            document.body.classList.toggle('fast-transition');
            document.addEventListener('keydown', this.aboutBackgroundEscapeBinded);
            this.bgCyclePause();
            this.imageLoader('./assets/images/bg-images/about-background.jpg');
        } else {
            document.removeEventListener('keydown', this.aboutBackgroundEscapeBinded);
            this.bgCycleUnpause();
            setTimeout(() => document.body.classList.toggle('fast-transition'), 50);
        }
    }

    aboutBackgroundEscape() {
        if (event.keyCode === 27) {
            this.aboutBackground();
        }
    }

    lightboxBackground() {
        window.addEventListener('keydown', this.lightboxBackgroundEscapeBinded);
        this.bgCyclePause();
    }

    lightboxBackgroundClose() {
        window.removeEventListener('keydown', this.lightboxBackgroundEscapeBinded);
        this.bgCycleStarter();
    }

    aboutBackgroundCloseBtn() {
        document.body.classList.toggle('about-background');
        this.bgCycleUnpause();
    }

    lightboxBackgroundEscape() {
        if (event.keyCode === 27) {
            this.lightboxBackgroundClose();
        }
    }

    updateImage() {
        this.currentImage++;
        this.imageLoader(this.bgImageList[this.currentImageIndex]);
    }

    imageLoader(url) {
        var img = new Image();
        img.onload = function() {
            document.body.style.backgroundImage = `url('${url}')`;
        };
        img.src = url;
    }

    randomStartImage() {
        let randomStart = Math.floor(Math.random() * this.totalImages) + 1;
        this.currentImage = randomStart;
        this.updateImage();
    }

    bgCycleStarter() {
        clearInterval(this.bgCycle);
        this.bgCycle = setInterval(() => {
            this.updateImage();
        }, 7000);
    }

    pauseBtnToggle() {
        this.pauseBtn.classList.toggle('pause-btn--is-paused');
        if (this.pauseBtn.classList.contains('pause-btn--is-paused')) {
            this.bgCyclePause();
        } else if (!document.body.classList.contains('about-background')) {
            this.bgCycleUnpause();
        }
    }

    bgCyclePause() {
        clearInterval(this.bgCycle);
    }

    bgCycleUnpause() {
        if (!this.pauseBtn.classList.contains('pause-btn--is-paused')) {
            this.updateImage();
            this.bgCycleStarter();
        } else this.displayPausedBg();
    }

    displayPausedBg() {
        document.body.style.backgroundImage = `url(${this.bgImageList[this.currentImageIndex]})`;
    }

    set currentImage(imageNumber) {
        let imageNumberInRange = imageNumber > this.totalImages - 1 ? 0 : imageNumber;
        this.currentImageIndex = imageNumberInRange;
    }

    get currentImage() {
        return this.currentImageIndex;
    }
}

export default BackgroundImageChange;