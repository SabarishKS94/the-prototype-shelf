import { LightningElement } from 'lwc';
import { projects } from '../../../demos/flows.js';

export default class DemoLauncher extends LightningElement {
    get projectGroups() {
        let flowCounter = 0;
        return projects.map((p) => ({
            ...p,
            flows: p.flows.map((f) => {
                flowCounter += 1;
                const guidedUrl = this._appendFlow(f.entry, f.id);
                const fullUrl = f.fullEntry ?? this._stripFlow(f.entry);
                const status = f.status ?? 'draft';
                return {
                    ...f,
                    indexLabel: String(flowCounter).padStart(2, '0'),
                    guidedUrl,
                    fullUrl,
                    absoluteGuidedUrl: guidedUrl,
                    statusLabel: this._statusLabel(status),
                    statusClass: `status status_${status}`,
                };
            }),
        }));
    }

    get today() {
        const d = new Date();
        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }

    _statusLabel(status) {
        switch (status) {
            case 'shipped':
                return 'Shipped';
            case 'approved':
                return 'Approved';
            case 'iterating':
                return 'Iterating';
            case 'in-review':
                return 'In review';
            case 'draft':
            default:
                return 'Draft';
        }
    }

    _appendFlow(entry, flowId) {
        try {
            const url = new URL(entry);
            url.searchParams.set('flow', flowId);
            return url.toString();
        } catch {
            const sep = entry.includes('?') ? '&' : '?';
            return `${entry}${sep}flow=${encodeURIComponent(flowId)}`;
        }
    }

    _stripFlow(entry) {
        try {
            const url = new URL(entry);
            url.searchParams.delete('flow');
            return url.toString();
        } catch {
            return entry;
        }
    }

    handleCopy = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const btn = event.currentTarget;
        const url = btn.dataset.url;
        if (!url) return;
        const original = btn.textContent;
        navigator.clipboard?.writeText(url).then(
            () => {
                btn.textContent = 'Copied';
                btn.classList.add('is-copied');
                setTimeout(() => {
                    btn.textContent = original;
                    btn.classList.remove('is-copied');
                }, 1500);
            },
            () => {
                /* clipboard unavailable — silent */
            }
        );
    };
}
