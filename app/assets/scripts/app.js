import '../styles/styles.css';
import BackgroundImageChange from './modules/BackgroundImageChange';
import ContentSection from './modules/ContentSection';
import PageSetup from './modules/PageSetup';
import EmailCopy from './modules/EmailCopy';
import Lightbox from './modules/Lightbox';

new PageSetup();
new Lightbox();
new BackgroundImageChange();
new ContentSection();

new EmailCopy();

const images = require.context('../images/', true, /\.(jpe?g|png)$/i);
if (module.hot) {
    module.hot.accept();
}