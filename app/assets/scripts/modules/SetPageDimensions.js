class SetPageDimensions {
    constructor() {
        console.log(window.screen.height);
        this.setDimensions();
    }

    setDimensions() {
        let windowHeight = window.screen.height;
        document.body.style.minHeight = `${windowHeight}px`;
    }
}

export default SetPageDimensions;