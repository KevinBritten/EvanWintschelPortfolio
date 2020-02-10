import ImageList from './ImageList.js';
const imageList = new ImageList();

class BackgroundImageChange {
    constructor() {
        this.albumList = imageList.list;
        this.body = document.body;
        this.pauseBtn = document.querySelector('.pause-btn');
        this.albumTitleContainer = document.querySelector('.content-area__list');
        this.totalImages = 3; ///determine number of images dynamically
        this.albumTitles = this.albumTitleContainer.querySelectorAll('.content-area__album');
        this.about = document.querySelector('#about-button');
        this.closeBtn = document.querySelector('.about-overlay__close-button');
        this.aboutOverlay = document.querySelector('.about-overlay');
        this.loadedImages = [];
        this.randomStartImage();
        this.initializeAlbumIds();
        this.events();
        this.bgCycleStarter();
    }

    events() {
        this.pauseBtn.addEventListener('click', () => this.pauseBtnToggle());
        //events for pausing when in album area
        this.albumTitleContainer.addEventListener('mouseenter', () => this.bgCyclePauseAlbum());
        this.albumTitleContainer.addEventListener('mouseleave', () => this.bgCycleUnpauseAlbum());
        //events for pausing when about is open
        this.about.addEventListener('click', () => this.aboutBackground());
        this.closeBtn.addEventListener('click', () => this.aboutBackgroundCloseBtn());
        //display album previews
        for (let title of this.albumTitles) {
            title.addEventListener('mouseenter', (e) => {
                this.albumPreview(e);
            });
        }
    }

    aboutBackground() {
        this.body.classList.toggle('about-background');
        if (this.body.classList.contains('about-background')) {
            this.bgCyclePause();
            this.imageLoader('./assets/images/bg-images/about-background.jpg');
        } else {
            this.bgCycleUnpause();
        }
    }
    aboutBackgroundCloseBtn() {
        this.body.classList.toggle('about-background');
        this.bgCycleUnpause();
    }

    albumPreview(e) {
        let currentAlbum = e.target.getAttribute('album-id');
        this.imageLoader(`./assets/images/bg-images/evman-preview-${currentAlbum}.png`);
    }

    initializeAlbumIds() {
        for (let i = 0; i < this.albumTitles.length; i++) {
            this.albumTitles[i].setAttribute('album-id', i + 1);
        }
    }

    updateImage() {
        this.currentImage++;
        this.imageLoader(`./assets/images/bg-images/evman-album-${this.currentImageIndex}.png`);
    }

    imageLoader(url) {
        if (!this.loadedImages.includes(url)) {
            var img = new Image();
            console.log(img);
            img.src = url;
            console.log('loaded');
            img.onload = () => {
                this.body.style.backgroundImage = "url('" + url + "')";
            };
            this.loadedImages.push(url);
        } else {
            console.log(this.loadedImages);
            this.body.style.backgroundImage = "url('" + url + "')";
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
        }, 5000);
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

    bgCyclePauseAlbum() {
        if (!this.body.classList.contains('fast-transition')) {
            this.body.classList.toggle('fast-transition');
        }
        if (!this.aboutOverlay.classList.contains('about-overlay--is-visible')) {
            this.bgCyclePause();
        }
    }

    bgCycleUnpause() {
        if (!this.pauseBtn.classList.contains('pause-btn--is-paused')) {
            this.updateImage();
            this.bgCycleStarter();
        } else this.displayPausedBg();
    }

    displayPausedBg() {
        this.body.style.backgroundImage =
            "url('./assets/images/bg-images/evman-album-" + this.currentImageIndex + ".png')";
    }

    bgCycleUnpauseAlbum() {
        if (!this.aboutOverlay.classList.contains('about-overlay--is-visible')) {
            this.bgCycleUnpause();
        }
        if (this.body.classList.contains('fast-transition')) {
            //to make first image appear instantly once mouse leaves album area
            setTimeout(() => {
                this.body.classList.toggle('fast-transition');
            }, 10);
        }
    }
    set currentImage(imageNumber) {
        let imageNumberInRange = imageNumber > this.totalImages ? 1 : imageNumber;
        this.currentImageIndex = imageNumberInRange;
    }

    get currentImage() {
        return this.currentImageIndex;
    }
}

export default BackgroundImageChange;