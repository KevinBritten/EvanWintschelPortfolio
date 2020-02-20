import ImageList from './ImageList';
const imageList = new ImageList();

class Lightbox {
    constructor() {
        this.list = imageList.list;
        this.albumTitles = document.querySelectorAll('.content-area__album');
        this.lightbox = document.querySelector('.lightbox');
        this.lightboxCloseButton = this.lightbox.querySelector('.lightbox__close-button');
        this.lightboxEscape = function() {
            if (event.keyCode === 27) {
                this.closeLightbox();
            }
        };
        this.lightboxEscapeBinded = this.lightboxEscape.bind(this);
        this.events();
    }

    events() {
        for (let title of this.albumTitles) {
            title.addEventListener('click', (e) => {
                this.openLightbox(e);
            });
        }
        this.lightboxCloseButton.addEventListener('click', () => this.closeLightbox());
    }
    openLightbox(e) {
        let currentAlbum = e.target.innerText;
        this.lightbox.classList.add('lightbox--is-visible', 'lightbox--is-above');
        window.addEventListener('keydown', this.lightboxEscapeBinded);
    }

    closeLightbox() {
        this.lightbox.classList.remove('lightbox--is-visible');
        setTimeout(() => {
            this.lightbox.classList.remove('lightbox--is-above');
        }, 500); //set timeout length equal to opactiy transition time in _lightbox.css
        console.log('jelskfe');
        window.removeEventListener('keydown', this.lightboxEscapeBinded);
    }
}

export default Lightbox;