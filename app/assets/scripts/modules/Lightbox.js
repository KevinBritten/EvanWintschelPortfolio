import ImageList from './ImageList';
const imageList = new ImageList();

class Lightbox {
    constructor() {
        this.list = imageList.list;
        this.albumTitles = document.querySelectorAll('.content-area__album');
        this.lightbox = document.querySelector('.lightbox');
        this.closeButton = this.lightbox.querySelector('.lightbox__close-button');
        this.thumbnailArea = this.lightbox.querySelector('.lightbox__thumbnail-container');
        this.currentImage = this.lightbox.querySelector('.lightbox__current-image');
        this.imageDescription = this.lightbox.querySelector('.lightbox__description');
        this.slideArea = this.lightbox.querySelector('.lightbox__current-slide');
        this.currentImageWrapper = this.lightbox.querySelector('.lightbox__content');
        this.imageNumberField = this.lightbox.querySelector('.lightbox__image-number');
        this.nextSlidebutton = this.lightbox.querySelector('.lightbox__nav--next');
        this.previousSlidebutton = this.lightbox.querySelector('.lightbox__nav--previous');
        this.fullscreenIcon = this.lightbox.querySelector('.lightbox__fullscreen-icon');
        this.slideScrollBinded = this.slideScroll.bind(this);
        this.lightboxEscapeBinded = this.lightboxEscape.bind(this);
        this.thumbnailWatcherFunctionBinded = this.thumbnailWatcherFunction.bind(this);
        this.thumbnailWatcher = new MutationObserver(this.thumbnailWatcherFunctionBinded);
        this.thumbnailWatcher.observe(this.thumbnailArea, { childList: true });
        this.events();
    }

    events() {
        for (let title of this.albumTitles) {
            title.addEventListener('click', (e) => {
                this.openLightbox(e);
            });
        }
        this.closeButton.addEventListener('click', () => this.closeLightbox());
        this.nextSlidebutton.addEventListener('click', () => this.slideScroll(1));
        this.previousSlidebutton.addEventListener('click', () => this.slideScroll(-1));
        this.lightbox.addEventListener('click', () => this.closeLightbox(), false);
        this.currentImageWrapper.addEventListener('click', () => this.closeLightbox(), false);
        this.fullscreenIcon.addEventListener('click', () => this.fullscreenToggle());
        window.addEventListener('keydown', () => this.slideScrollKey());
    }

    slideScrollKey() {
        if (event.keyCode === 39) {
            this.slideScroll(1);
        } else if (event.keyCode === 37) {
            this.slideScroll(-1);
        }
    }

    slideScroll(direction) {
        let nextIndex = parseInt(this.currentImage.getAttribute('slide-id')) + direction;

        if (nextIndex > this.list[this.currentAlbum].length - 1) {
            nextIndex = 0;
        } else if (nextIndex < 0) {
            nextIndex = this.list[this.currentAlbum].length - 1;
        }
        this.displayCurrentImage(nextIndex);
    }

    // nextSlide() {
    //     let nextIndex = parseInt(this.currentImage.getAttribute('slide-id')) + 1;
    //     console.log(this.list[this.currentAlbum].length);
    //     if (nextIndex > this.list[this.currentAlbum].length - 1) {
    //         nextIndex = 0;
    //     }
    //     this.displayCurrentImage(nextIndex);
    // }

    thumbnailWatcherFunction(mutation) {
        if (this.list[this.currentAlbum].length === mutation[0].target.childElementCount) {
            mutation[0].target.classList.add('lightbox__thumbnail-container--is-visible');
            this.highlightCurrentThumbnail();
        } else if (mutation[0].target.childElementCount === 0) {
            mutation[0].target.classList.remove('lightbox__thumbnail-container--is-visible');
            this.slideArea.classList.remove('lightbox__current-slide--is-visible');
        }
    }

    openLightbox(e) {
        this.currentAlbum = e.target.innerText;
        this.lightbox.classList.add('lightbox--is-visible', 'lightbox--is-above');
        document.body.addEventListener('keydown', this.lightboxEscapeBinded);
        this.createThumbnails();
        this.displayCurrentImage();
    }

    displayCurrentImage(currentImageIndex = 0) {
        let album = this.currentAlbum;
        let photo = new Image();
        let url = `./assets/images/albums/${album}/${this.list[album][currentImageIndex]}`;
        photo.onload = () => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    this.currentImage.src = url;
                    this.currentImage.setAttribute('slide-id', currentImageIndex);
                    // this.highlightCurrentThumbnail(e, currentImageIndex);
                    if (!this.slideArea.classList.contains('lightbox__current-slide--is-visible')) {
                        this.slideArea.classList.add('lightbox__current-slide--is-visible');
                    }
                });
            });
        };
        this.highlightCurrentThumbnail(currentImageIndex);
        this.setPhotoDescription(currentImageIndex, album);
        this.imageNumberDisplay(currentImageIndex, album);
        photo.src = url;
    }

    setPhotoDescription(currentImageIndex, album) {
        this.imageDescription.innerText = this.list[album][currentImageIndex];
    }

    imageNumberDisplay(currentImageIndex, album) {
        this.imageNumberField.innerText = `${currentImageIndex + 1}/${this.list[album].length}`;
    }

    highlightCurrentThumbnail(currentImageIndex = 0) {
        console.log(currentImageIndex);
        for (let thumbnail of this.thumbnailArea.children) {
            if (parseInt(thumbnail.getAttribute('slide-id')) === parseInt(currentImageIndex)) {
                thumbnail.classList.add('lightbox__thumbnail--is-current');
            } else {
                thumbnail.classList.remove('lightbox__thumbnail--is-current');
            }
        }
    }
    createThumbnails() {
        let album = this.currentAlbum;
        for (let i = 0; i < this.list[album].length; i++) {
            let url = `./assets/images/albums/${album}/${this.list[album][i]}`;
            let newThumbnail = new Image();
            newThumbnail.classList.add('lightbox__thumbnail');
            newThumbnail.setAttribute('slide-id', i);
            newThumbnail.addEventListener('click', (e) =>
                this.displayCurrentImage(parseInt(e.target.getAttribute('slide-id')))
            );
            newThumbnail.onload = () => {
                if (this.thumbnailArea.children.length === 0) {
                    this.thumbnailArea.appendChild(newThumbnail);
                } else {
                    for (let thumbnail of this.thumbnailArea.children) {
                        if (newThumbnail.getAttribute('slide-id') < thumbnail.getAttribute('slide-id')) {
                            thumbnail.before(newThumbnail);
                            return;
                        } else {
                            this.thumbnailArea.appendChild(newThumbnail);
                        }
                    }
                }
            };
            newThumbnail.src = url;
        }
    }
    fullscreenToggle() {
        this.currentImageWrapper.classList.toggle('lightbox__current-slide--fullscreen');
    }

    removeThumnails() {
        this.thumbnailArea.innerHTML = '';
    }

    closeLightbox() {
        if (event.currentTarget !== event.target) {
            return;
        }
        this.lightbox.classList.remove('lightbox--is-visible');
        setTimeout(() => {
            this.lightbox.classList.remove('lightbox--is-above');
            this.removeThumnails();
            if (this.currentImageWrapper.classList.contains('lightbox__current-slide--fullscreen')) {
                this.fullscreenToggle();
            }
        }, 500); //set timeout length equal to opactiy transition time in _lightbox.css
        document.body.removeEventListener('keydown', this.lightboxEscapeBinded);
    }

    lightboxEscape() {
        if (event.keyCode === 27) {
            this.closeLightbox();
        }
    }

    set currentAlbum(album) {
        this.setCurrentAlbum = album;
    }

    get currentAlbum() {
        return this.setCurrentAlbum;
    }
}
export default Lightbox;