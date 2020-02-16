import '../styles/styles.css';
import AlbumPopulator from './modules/AlbumPopulator';
import BackgroundImageChange from './modules/BackgroundImageChange';
import AboutSection from './modules/AboutSection';
import PageSetup from './modules/PageSetup';
import EmailCopy from './modules/EmailCopy';
import Lightbox from './modules/Lightbox';

// new AlbumPopulator();
new Lightbox();
new BackgroundImageChange();
new AboutSection();
new PageSetup();
new EmailCopy();

if (module.hot) {
    module.hot.accept();
}