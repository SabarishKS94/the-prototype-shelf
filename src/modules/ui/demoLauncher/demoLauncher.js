import { LightningElement, track } from 'lwc';
import { projects } from '../../../demos/flows.js';

const ARCHIVE_STATUSES = new Set(['approved', 'shipped']);

export default class DemoLauncher extends LightningElement {
    @track showArchive = false;

    get zones() {
        const decorated = this._decorateProjects();
        const active = decorated.filter(
            (p) => !ARCHIVE_STATUSES.has(p.projectStatus)
        );
        const archive = decorated.filter((p) =>
            ARCHIVE_STATUSES.has(p.projectStatus)
        );
        return {
            active,
            archive,
            hasArchive: archive.length > 0,
            archiveCount: archive.length,
            archiveToggleLabel: this.showArchive
                ? `Hide ${archive.length} archived`
                : `Show ${archive.length} archived`,
            showArchive: this.showArchive,
        };
    }

    get today() {
        const d = new Date();
        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }

    handleToggleArchive = () => {
        this.showArchive = !this.showArchive;
    };

    _decorateProjects() {
        let flowCounter = 0;
        const withDates = projects.map((p) => ({
            ...p,
            projectStatus: p.status ?? 'iterating',
            _sortKey: this._sortKey(p.lastUpdated),
        }));
        withDates.sort((a, b) => b._sortKey - a._sortKey);
        return withDates.map((p) => ({
            ...p,
            updatedLabel: this._relativeLabel(p.lastUpdated),
            flows: p.flows.map((f) => {
                flowCounter += 1;
                const guidedUrl = this._appendFlow(f.entry, f.id);
                const status = f.status ?? 'draft';
                return {
                    ...f,
                    indexLabel: String(flowCounter).padStart(2, '0'),
                    guidedUrl,
                    absoluteGuidedUrl: guidedUrl,
                    statusLabel: this._statusLabel(status),
                    statusClass: `status status_${status}`,
                };
            }),
        }));
    }

    _sortKey(iso) {
        if (!iso) return 0;
        const t = Date.parse(iso);
        return Number.isNaN(t) ? 0 : t;
    }

    _relativeLabel(iso) {
        if (!iso) return '';
        const then = Date.parse(iso);
        if (Number.isNaN(then)) return '';
        const now = Date.now();
        const diffMs = now - then;
        const day = 24 * 60 * 60 * 1000;
        const diffDays = Math.floor(diffMs / day);
        if (diffDays <= 0) return 'Updated today';
        if (diffDays === 1) return 'Updated 1d ago';
        if (diffDays < 7) return `Updated ${diffDays}d ago`;
        const diffWeeks = Math.floor(diffDays / 7);
        if (diffWeeks === 1) return 'Updated 1w ago';
        if (diffWeeks < 5) return `Updated ${diffWeeks}w ago`;
        const diffMonths = Math.floor(diffDays / 30);
        if (diffMonths === 1) return 'Updated 1mo ago';
        if (diffMonths < 12) return `Updated ${diffMonths}mo ago`;
        const diffYears = Math.floor(diffDays / 365);
        return diffYears === 1
            ? 'Updated 1y ago'
            : `Updated ${diffYears}y ago`;
    }

    _statusLabel(status) {
        switch (status) {
            case 'shipped':
                return 'Shipped';
            case 'delivered':
                return 'Delivered';
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
        navigator.clipboard?.writeText(url).then(
            () => {
                btn.classList.add('is-copied');
                btn.setAttribute('aria-label', 'Link copied');
                setTimeout(() => {
                    btn.classList.remove('is-copied');
                    btn.setAttribute('aria-label', 'Copy demo link');
                }, 1500);
            },
            () => {
                /* clipboard unavailable — silent */
            }
        );
    };
}
