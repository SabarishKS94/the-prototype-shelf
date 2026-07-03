import { createElement } from 'lwc';
import DemoLauncher from 'ui/demoLauncher';

const el = createElement('ui-demo-launcher', { is: DemoLauncher });
document.querySelector('#app').appendChild(el);
