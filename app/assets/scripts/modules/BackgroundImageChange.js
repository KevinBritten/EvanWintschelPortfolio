import ImageList from './ImageList.js';
const imageList = new ImageList();

class BackgroundImageChange {
	constructor() {
		this.albumList = imageList.list;
		this.body = document.body;
		this.pauseBtn = document.querySelector('#pause');
		this.albumTitleContainer = document.querySelector('.content-area__box');
		this.totalImages = 3; ///determine number of images dynamically
		this.albumTitles = this.albumTitleContainer.querySelectorAll('.content-area__album');
		this.about = document.querySelector('#about-button');
		this.randomStartImage();
		this.initializeAlbumIds();
		this.events();
		this.bgCycleStarter();
	}

	events() {
		this.pauseBtn.addEventListener('click', () => this.pauseBtnToggle());
		this.albumTitleContainer.addEventListener('mouseenter', () => this.bgCyclePauseAlbum());
		this.albumTitleContainer.addEventListener('mouseleave', () => this.bgCycleUnpauseAlbum());
		this.about.addEventListener('click', () => this.aboutBackground());
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
		} else {
			this.bgCycleUnpause();
		}
	}

	albumPreview(e) {
		let currentAlbum = e.target.getAttribute('album-id');
		document.body.style.backgroundImage = "url('./assets/images/bg-images/evman-preview-" + currentAlbum + ".png')";
	}

	initializeAlbumIds() {
		for (let i = 0; i < this.albumTitles.length; i++) {
			this.albumTitles[i].setAttribute('album-id', i + 1);
		}
	}

	updateImage() {
		this.currentImage++;
		this.body.style.backgroundImage =
			"url('./assets/images/bg-images/evman-album-" + this.currentImageIndex + ".png')";
	}

	displayPausedBg() {
		this.body.style.backgroundImage =
			"url('./assets/images/bg-images/evman-album-" + this.currentImageIndex + ".png')";
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
		this.bgCyclePause();
	}

	bgCycleUnpause() {
		if (!this.pauseBtn.classList.contains('pause-btn--is-paused')) {
			this.updateImage();
			this.bgCycleStarter();
		} else this.displayPausedBg();
	}

	bgCycleUnpauseAlbum() {
		// this.updateImage();
		// this.bgCycleStarter();

		this.bgCycleUnpause();
		if (this.body.classList.contains('fast-transition')) {
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
