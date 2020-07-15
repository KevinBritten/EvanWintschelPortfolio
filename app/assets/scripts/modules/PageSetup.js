class PageSetup {
    constructor() {
        this.setDimensions();
        this.disableKeyScroll();
        window.onload = this.pageOpacity;
        window.onresize = this.setDimensions
        this.determineScreen()
    }
    determineScreen() {
        let windowWidth = window.screen.width * window.devicePixelRatio
        let windowHeight = window.screen.height * window.devicePixelRatio
        let device = ""
        if (windowWidth >= 2400 && windowWidth > windowHeight) {
         device = "desktophidpi"
      } 
        else if (windowWidth >= 1200 && windowWidth > windowHeight) {
        device = "desktop"
     } 
     else {
        device = "mobile"}
    window.device = device
       }

    disableKeyScroll() {
        window.addEventListener(
            'keydown',
            function(e) {
                // space and arrow keys
                if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                    e.preventDefault();
                }
            },
            false
        );
    }

    pageOpacity() {
        let pageHider = document.querySelector('.site-reveal');
        pageHider.style.opacity = 0;
        document.querySelector('.page-content').style.opacity = 1;
    }
    setDimensions() {
        let windowHeight = window.screen.height;
        let windowWidth = window.screen.width;
        document.body.style.minHeight = `${windowHeight}px`;
        document.body.style.minWidth = `${windowWidth}px`;
        document.body.style.height = `${windowHeight}px`;
        document.body.style.width = `${windowWidth}px`;
      
    }
}

export default PageSetup;