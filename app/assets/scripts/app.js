import '../styles/styles.css'
import BackgroundImageCycle from './modules/BackgroundImageCycle'

new BackgroundImageCycle()

console.log("Hello World from your main file!");

if (module.hot) {
    module.hot.accept()
}
