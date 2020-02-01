class About {
	constructor() {
		this.about = document.querySelector('#about-btn');
		this.closebtn = document.querySelector('#close-btn');
		this.contentSection = document.querySelector('.content-area__box');
		this.events();
	}

	events() {
		this.about.addEventListener('click', () => this.toggleAboutSection());
	}

	toggleAboutSection() {}

	closeAbout() {}
}
