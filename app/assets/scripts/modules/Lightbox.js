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

    thumbnailWatcherFunction(mutation) {
        if (this.list[this.currentAlbum].length === mutation[0].target.childElementCount) {
            mutation[0].target.classList.add('lightbox__thumbnail-container--is-visible');
            mutation[0].target.firstElementChild.classList.add('lightbox__thumbnail--first');
            mutation[0].target.lastElementChild.classList.add('lightbox__thumbnail--last');
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
        this.deviceFullscreenToggle()

    }

    displayCurrentImage(currentImageIndex = 0) {
        let album = this.currentAlbum;
        let photo = new Image();
        let url = `./app/assets/images/albums/${album}/${window.device}/${window.device}-${this.list[album][currentImageIndex]}`;
        photo.onload = () => {
            // requestAnimationFrame(() => {
            //     requestAnimationFrame(() => {
            this.currentImage.src = url;
            this.currentImage.setAttribute('slide-id', currentImageIndex);
            if (!this.slideArea.classList.contains('lightbox__current-slide--is-visible')) {
                this.slideArea.classList.add('lightbox__current-slide--is-visible');
            }
        };
        // );
        // }
        // );
        // };
        this.highlightCurrentThumbnail(currentImageIndex);
        this.setPhotoDescription(currentImageIndex, album);
        this.imageNumberDisplay(currentImageIndex, album);
        photo.src = url;
    }

    setPhotoDescription(currentImageIndex, album) {
        let description = this.list[album][currentImageIndex].replace(/(-bg)?(.jpg|.jpeg|.png)/gi, '');
        this.imageDescription.innerText = description;
    }

    imageNumberDisplay(currentImageIndex, album) {
        this.imageNumberField.innerText = `${currentImageIndex + 1}/${this.list[album].length}`;
    }

    highlightCurrentThumbnail(currentImageIndex = 0) {
        for (let thumbnail of this.thumbnailArea.children) {
            if (parseInt(thumbnail.getAttribute('slide-id')) === parseInt(currentImageIndex)) {
                thumbnail.classList.add('lightbox__thumbnail--is-current');
                let leftPos = thumbnail.offsetLeft;
                let thumbnailAreaLeft = this.thumbnailArea.getBoundingClientRect().left;

                this.thumbnailArea.scrollLeft =
                    leftPos - thumbnailAreaLeft - this.thumbnailArea.offsetWidth / 2 + thumbnail.offsetWidth / 2;
            } else {
                thumbnail.classList.remove('lightbox__thumbnail--is-current');
            }
        }
    }
    createThumbnails() {
        let album = this.currentAlbum;
        for (let i = 0; i < this.list[album].length; i++) {
            let extention = `${this.list[album][i]}`.slice(`${this.list[album][i]}`.lastIndexOf('.'));
            let imageName = `${this.list[album][i]}`.replace(`${extention}`, '');
            let url = `./app/assets/images/albums/${album}/thumbnails/${imageName}-thumb${extention}`;
            let newThumbnail = new Image();
            newThumbnail.classList.add('lightbox__thumbnail');
            newThumbnail.setAttribute('slide-id', i);
            newThumbnail.addEventListener('click', (e) =>
                this.displayCurrentImage(parseInt(e.target.getAttribute('slide-id')))
            );
            newThumbnail.onload = () => {
                //wait for image to render in firefox
                // requestAnimationFrame(() => {
                //     requestAnimationFrame(() => {
                if (this.thumbnailArea.children.length === 0) {
                    this.thumbnailArea.appendChild(newThumbnail);
                } else {
                    for (let thumbnail of this.thumbnailArea.children) {
                        if (
                            parseInt(newThumbnail.getAttribute('slide-id')) <
                            parseInt(thumbnail.getAttribute('slide-id'))
                        ) {
                            thumbnail.before(newThumbnail);
                            return;
                        } else {
                            this.thumbnailArea.appendChild(newThumbnail);
                        }
                    }
                }
            };
            // );
            // }
            // );
            // };

            newThumbnail.src = url;
        }
    }

    fullscreenToggle() {
        let lightboxIcons = [
            this.fullscreenIcon,
            this.previousSlidebutton,
            this.nextSlidebutton,
            this.imageNumberField
        ];
        let itemsToHide = [
            this.imageDescription,
            this.thumbnailArea,
            document.querySelector('#bg-image-container'),
            document.querySelector('.content-area'),
            document.querySelector('.site-header'),
        ]
        let navButtons = [this.previousSlidebutton, this.nextSlidebutton];
        lightboxIcons.forEach((icon) => {
            icon.classList.toggle('lightbox--fullscreen-overlay');
        });
        navButtons.forEach((button) => button.classList.toggle('lightbox__nav--fullscreen'));
        itemsToHide.forEach(item => item.classList.toggle('lightbox--fullscreen-hidden'))
        // itemsToHide.forEach(item => item.style.display = item.style.display === 'none' ? 'initial' : 'none')
        this.fullscreenIcon.classList.toggle('lightbox__fullscreen-icon--fullscreen');
        this.currentImageWrapper.classList.toggle('lightbox__content--fullscreen');
        this.currentImage.classList.toggle('lightbox__current-image--fullscreen');
        if (window.device === 'mobile') {
        } }
    
            deviceFullscreenToggle(){
                let elem = document.documentElement
                // if (this.currentImageWrapper.classList.contains('lightbox__content--fullscreen')) {
                if (this.lightbox.classList.contains('lightbox--is-visible')) {
                    
                    // document.addEventListener('backbutton', () => this.fullscreenToggle(), false)
                    if (elem.requestFullscreen) {
                      elem.requestFullscreen();
                    } else if (elem.mozRequestFullScreen) { /* Firefox */
                      elem.mozRequestFullScreen();
                    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                      elem.webkitRequestFullscreen();
                    } else if (elem.msRequestFullscreen) { /* IE/Edge */
                      elem.msRequestFullscreen();
                    }
                  }
                 else {
                    // document.removeEventListener('backbutton', () => this.fullscreenToggle(), false)
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                      } else if (document.mozCancelFullScreen) { /* Firefox */
                        document.mozCancelFullScreen();
                      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                        document.webkitExitFullscreen();
                      } else if (document.msExitFullscreen) { /* IE/Edge */
                        document.msExitFullscreen();
                      }
                    }
                } 
            

    removeThumbnails() {
        this.thumbnailArea.innerHTML = '';
    }

    closeLightbox() {
        if (event.currentTarget !== event.target) {
            return;
        }
        if (this.currentImageWrapper.classList.contains('lightbox__content--fullscreen')) {
            this.fullscreenToggle();
        } else {
            this.lightbox.classList.remove('lightbox--is-visible');
            setTimeout(() => {
                this.lightbox.classList.remove('lightbox--is-above');
                this.removeThumbnails();
                if (this.currentImageWrapper.classList.contains('lightbox__content--fullscreen')) {
                    this.fullscreenToggle();
                }
                this.currentImage.src = '';
            }, 500); //set timeout length equal to opactiy transition time in _lightbox.css
            document.body.removeEventListener('keydown', this.lightboxEscapeBinded);
        }
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