import ImageList from './ImageList';
const imageList = new ImageList();

class AlbumPopulator {
    constructor() {
        this.albumList = Object.keys(imageList.list);
        this.albumArea = document.querySelector('.content-area__list');
        this.createAlbums();
    }
    createAlbums() {
        this.albumList.forEach((title) => {
            let newAlbumTitle = document.createElement('li');
            newAlbumTitle.setAttribute('class', 'content-area__album');
            newAlbumTitle.innerText = `${title}`;
            this.albumArea.appendChild(newAlbumTitle);
        });
    }
}

export default AlbumPopulator;