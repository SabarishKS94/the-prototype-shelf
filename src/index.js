import { createElement } from 'lwc';
import AppShell from 'ui/appShell';

const el = createElement('ui-app-shell', { is: AppShell });
document.querySelector('#app').appendChild(el);
