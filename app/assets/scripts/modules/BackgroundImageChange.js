import ImageList from './ImageList.js';
const imageList = new ImageList();

class BackgroundImageChange {
    constructor() {
        this.albumList = imageList.list;
        this.pauseBtn = document.querySelector('.pause-btn');
        this.bgImageList = [];
        this.bgImageListCreator();
        console.log(this.bgImageList);
        this.totalImages = this.bgImageList.length;
        this.about = document.querySelector('#about-button');
        this.closeBtn = document.querySelector('.about-overlay__close-button');
        this.aboutOverlay = document.querySelector('.about-overlay');
        this.loadedImages = [];
        this.randomStartImage();
        this.events();
        this.bgCycleStarter();
    }

    events() {
        this.pauseBtn.addEventListener('click', () => this.pauseBtnToggle());
        this.about.addEventListener('click', () => this.aboutBackground());
        this.closeBtn.addEventListener('click', () => this.aboutBackgroundCloseBtn());
    }

    bgImageListCreator() {
        let keys = Object.keys(this.albumList);
        for (let key of keys) {
            this.albumList[key].map((image) => {
                if (image.includes('-bg')) {
                    this.bgImageList.push(`./assets/images/albums/${key}/${image}`);
                }
            });
        }
    }
    aboutBackground() {
        document.body.classList.toggle('about-background');
        if (document.body.classList.contains('about-background')) {
            this.bgCyclePause();
            this.imageLoader('./assets/images/bg-images/about-background.jpg');
        } else {
            this.bgCycleUnpause();
        }
    }
    aboutBackgroundCloseBtn() {
        document.body.classList.toggle('about-background');
        this.bgCycleUnpause();
    }

    updateImage() {
        this.currentImage++;
        this.imageLoader(this.bgImageList[this.currentImageIndex]);
        console.log(this.bgImageList[this.currentImageIndex]);
    }

    imageLoader(url) {
        if (!this.loadedImages.includes(url)) {
            var img = new Image();
            img.onload = function() {
                document.body.style.backgroundImage = `url('${url}')`;
            };
            img.src = url;
            this.loadedImages.push(url);
            console.log('hi');
        } else {
            document.body.style.backgroundImage = `url('${url}')`;
        }
    }

    randomStartImage() {
        let randomStart = Math.floor(Math.random() * this.totalImages) + 1;
        this.currentImage = randomStart;
        this.updateImage();
    }

    bgCycleStarter() {
        this.bgCycle = setInterval(() => {
            this.updateImage();
        }, 7000);
    }

    pauseBtnToggle() {
        this.pauseBtn.classList.toggle('pause-btn--is-paused');
        if (this.pauseBtn.classList.contains('pause-btn--is-paused')) {
            this.bgCyclePause();
        } else {
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