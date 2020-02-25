import ImageList from './ImageList.js';
const imageList = new ImageList();

class BackgroundImageChange {
    constructor() {
        this.albumList = imageList.list;
        this.pauseBtn = document.querySelector('.pause-btn');
        this.bgImageListCreator();
        this.bgImageListRandomizer();
        this.totalImages = this.bgImageList.length;
        this.albumArea = document.querySelector('.content-area__list');
        this.lightbox = document.querySelector('.lightbox');
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
        this.bgCycleStarter();
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