class PageSetup {
    constructor() {
        this.setDimensions();
        window.onload = this.pageOpacity;
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
    }
}

export default PageSetup;