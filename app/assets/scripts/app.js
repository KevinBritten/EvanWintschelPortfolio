import '../styles/styles.css';
import BackgroundImageChange from './modules/BackgroundImageChange';
import AboutSection from './modules/AboutSection';
import SetPageDimensions from './modules/SetPageDimensions';

new BackgroundImageChange();
new AboutSection();
new SetPageDimensions();

if (module.hot) {
    module.hot.accept();
}