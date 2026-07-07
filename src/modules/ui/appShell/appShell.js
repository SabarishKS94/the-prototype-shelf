import { LightningElement, track } from 'lwc';

export default class AppShell extends LightningElement {
    @track route = { view: 'shelf', projectId: null };

    connectedCallback() {
        this._onHashChange();
        window.addEventListener('hashchange', this._onHashChange);
    }

    disconnectedCallback() {
        window.removeEventListener('hashchange', this._onHashChange);
    }

    _onHashChange = () => {
        const hash = window.location.hash || '';
        const match = hash.match(/^#\/project\/([^/?#]+)/);
        if (match) {
            this.route = { view: 'detail', projectId: match[1] };
            window.scrollTo(0, 0);
        } else {
            this.route = { view: 'shelf', projectId: null };
        }
    };

    get showShelf() {
        return this.route.view === 'shelf';
    }

    get showDetail() {
        return this.route.view === 'detail';
    }

    get projectId() {
        return this.route.projectId;
    }
}
