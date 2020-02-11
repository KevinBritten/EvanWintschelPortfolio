import '../styles/styles.css';
import BackgroundImageChange from './modules/BackgroundImageChange';
import AboutSection from './modules/AboutSection';
import SetPageDimensions from './modules/SetPageDimensions';
import EmailCopy from './modules/EmailCopy';
import Lightbox from './modules/Lightbox';
import AlbumPopulator from './modules/AlbumPopulator';

new AlbumPopulator();
new Lightbox();
new BackgroundImageChange();
new AboutSection();
new SetPageDimensions();
new EmailCopy();

if (module.hot) {
    module.hot.accept();
}