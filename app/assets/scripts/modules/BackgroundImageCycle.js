const bgImgs = require.context('../../images/bg-images/');
const fs = require('fs')
const imgFolder = '../../images/bg-images';



class BackgroundImageCycle {
    constructor() {   
        this.bodyImg = document.getElementById('bg')
        this.getImgArr()
        this.bgCycle()
    }

    getImgArr() {
        fs.readdirSync(imgFolder).forEach(file => {
            console.log(file);
          });
    }

    
    bgCycle() {
        this.bodyImg.style.backgroundImage = "url('./assets/images/bg-images/evman-album-1.png')"
        console.log("hi")
        console.log(bgImgs)
    }


}

export default BackgroundImageCycle