import ImageList from './ImageList';
const imageList = new ImageList();

class Lightbox {
    constructor() {
        this.list = imageList.list;
        this.albumTitles = document.querySelectorAll('.content-area__album');
        this.lightbox = document.querySelector('.lightbox');
        this.closeButton = this.lightbox.querySelector('.lightbox__close-button');
        this.thumbnailArea = this.lightbox.querySelector('.lightbox__thumbnail-container');
        this.currentImage = document.querySelector('.lightbox__current-image');
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
    }

    thumbnailWatcherFunction(mutation) {
        if (this.list[this.currentAlbum].length === mutation[0].target.childElementCount) {
            mutation[0].target.classList.add('lightbox__thumbnail-container--is-visible');
        } else if (mutation[0].target.childElementCount === 0) {
            mutation[0].target.classList.remove('lightbox__thumbnail-container--is-visible');
        }
    }

    openLightbox(e) {
        this.currentAlbum = e.target.innerText;
        this.lightbox.classList.add('lightbox--is-visible', 'lightbox--is-above');
        window.addEventListener('keydown', this.lightboxEscapeBinded);
        this.createThumbnails(this.currentAlbum);
        this.displayCurrentImage(this.currentAlbum);
    }

    displayCurrentImage(currentAlbum, currentImage = 0) {
        let url = `./assets/images/albums/${currentAlbum}/${this.list[currentAlbum][currentImage]}`;
        this.currentImage.src = url;
    }
    createThumbnails(currentAlbum) {
        for (let i = 0; i < this.list[currentAlbum].length; i++) {
            let url = `./assets/images/albums/${currentAlbum}/${this.list[currentAlbum][i]}`;
            let newThumbnail = new Image();
            newThumbnail.classList.add('lightbox__thumbnail');
            newThumbnail.setAttribute('slide-id', i);
            newThumbnail.onload = () => {
                console.log(this.thumbnailArea.children);
                if (this.thumbnailArea.children.length === 0) {
                    this.thumbnailArea.appendChild(newThumbnail);
                } else {
                    for (let thumbnail of this.thumbnailArea.children) {
                        // console.log(thumbnail);
                        if (newThumbnail.getAttribute('slide-id') < thumbnail.getAttribute('slide-id')) {
                            thumbnail.before(newThumbnail);
                            return;
                        } else {
                            this.thumbnailArea.appendChild(newThumbnail);
                        }
                    }
                    // this.thumbnailArea.appendChild(newThumbnail);
                    // newThumbnail.setAttribute('slide-id', this.thumbnailArea.childElementCount);
                }
            };
            newThumbnail.src = url;

            // this.thumbnailArea.classList.add('lightbox__thumbnail-container--is-visible', );
        }
    }

    removeThumnails() {
        this.thumbnailArea.innerHTML = '';
    }

    closeLightbox() {
        this.lightbox.classList.remove('lightbox--is-visible');
        setTimeout(() => {
            this.lightbox.classList.remove('lightbox--is-above');
            this.removeThumnails();
        }, 500); //set timeout length equal to opactiy transition time in _lightbox.css
        window.removeEventListener('keydown', this.lightboxEscapeBinded);
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