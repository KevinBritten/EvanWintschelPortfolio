import ImageList from './ImageList';
const imageList = new ImageList();

class Lightbox {
    constructor() {
        this.list = imageList.list;
        console.log(this.list);
    }
}

export default Lightbox;