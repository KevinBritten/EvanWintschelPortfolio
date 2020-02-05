import '../styles/styles.css';
import BackgroundImageChange from './modules/BackgroundImageChange';
// import AboutSection from './modules/AboutSection';

new BackgroundImageChange();
// new AboutSection();

if (module.hot) {
	module.hot.accept();
}
