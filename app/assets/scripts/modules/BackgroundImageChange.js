class BackgroundImageChange {
	constructor() {
		this.body = document.body;
		this.pauseBtn = document.querySelector('#pause');
		this.albumTitle = document.querySelector('.content-area__box');
		this.totalImages = 3; ///determine number of images dynamically
		this.randomStartImage();
		this.events();
		this.bgCycleStarter();
	}

	events() {
		console.log(this.bgCycle);
		this.pauseBtn.addEventListener('click', () => this.pauseBtnToggle());
		this.albumTitle.addEventListener('mouseenter', () => this.bgCyclePause());
		this.albumTitle.addEventListener('mouseleave', () => this.bgCycleUnpause());
	}

	updateImage() {
		this.currentImage++;
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
		}, 3000);
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
