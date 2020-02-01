import '../styles/styles.css';
import BackgroundImageChange from './modules/BackgroundImageChange';

new BackgroundImageChange();

console.log('Hello World from your main file!');

if (module.hot) {
	module.hot.accept();
}
