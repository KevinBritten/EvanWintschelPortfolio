import ImageList from './ImageList.js';
const imageList = new ImageList();

class BackgroundImageChange {
    constructor() {
        this.currentBgImage = document.querySelector('.bg-image--current');
        this.albumList = imageList.list;
        this.pauseBtn = document.querySelector('.pause-btn');
        this.bgImageListCreator();
        this.bgImageListRandomizer();
        this.totalImages = this.bgImageList.length;
        this.albumArea = document.querySelector('.content-area__list');
        this.lightbox = document.querySelector('.lightbox');
        this.lightboxImageWrapper = this.lightbox.querySelector('.lightbox__content');
        this.lightboxCloseButton = this.lightbox.querySelector('.lightbox__close-button');
        this.lightboxBackgroundEscapeBinded = this.lightboxBackgroundEscape.bind(this);
        this.randomStartImage();
        this.events();
        this.bgCycleStarter();
    }

    events() {
        this.pauseBtn.addEventListener('click', () => this.pauseBtnToggle());
        this.albumArea.addEventListener('click', () => this.lightboxBackground());
        this.lightboxCloseButton.addEventListener('click', () => this.lightboxBackgroundClose());
        this.lightbox.addEventListener('click', () => this.lightboxBackgroundMouseClose(), false);
        this.lightboxImageWrapper.addEventListener('click', () => this.lightboxBackgroundMouseClose(), false);
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

    lightboxBackground() {
        window.addEventListener('keydown', this.lightboxBackgroundEscapeBinded);
        this.bgCyclePause();
    }

    lightboxBackgroundClose() {
        window.removeEventListener('keydown', this.lightboxBackgroundEscapeBinded);
        if (!this.pauseBtn.classList.contains('pause-btn--is-paused')) {
            this.bgCycleStarter();
        } else {
            this.bgCycleUnpause();
        }
    }

    lightboxBackgroundEscape() {
        if (event.keyCode === 27) {
            this.lightboxBackgroundClose();
        }
    }

    lightboxBackgroundMouseClose() {
        if (event.currentTarget !== event.target) {
            return;
        } else {
            this.lightboxBackgroundClose();
        }
    }

    updateImage() {
        this.currentImage++;
        this.imageLoader(this.bgImageList[this.currentImageIndex]);
    }

    bgImageToggle() {
        this.bgDivs.forEach((div) => {
            div.classList.toggle('bg-image--current');
        });
    }

    imageLoader(url) {
        var img = new Image();
        img.onload = function() {
            if (!document.querySelector('#bg-image-container').classList.contains('initialized')) {
                document.querySelector('.bg-image--current').src = `${url}`;
                document.querySelector('#bg-image-container').classList.add('initialized');
                return;
            }
            let bgDivs = [...document.querySelector('#bg-image-container').children];
            bgDivs.forEach((image) => image.classList.toggle('bg-image--current'));
            document.querySelector('.bg-image--current').src = `${url}`;

            // image.classList.toggle('bg-image--current'));
            // bgImageToggle();
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
        }
        this.bgCycleUnpause();
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
        this.currentBgImage.src = `${this.bgImageList[this.currentImageIndex]}`;
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