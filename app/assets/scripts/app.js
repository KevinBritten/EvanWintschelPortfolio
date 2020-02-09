import '../styles/styles.css';
import BackgroundImageChange from './modules/BackgroundImageChange';
import AboutSection from './modules/AboutSection';
import SetPageDimensions from './modules/SetPageDimensions';
import EmailCopy from './modules/EmailCopy';

new BackgroundImageChange();
new AboutSection();
new SetPageDimensions();
new EmailCopy();

if (module.hot) {
    module.hot.accept();
}