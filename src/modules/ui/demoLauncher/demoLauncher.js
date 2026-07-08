import { LightningElement, track } from 'lwc';
import { projects } from '../../../demos/flows.js';

const ARCHIVE_STATUSES = new Set(['approved', 'shipped']);
const FILTER_STATUSES = ['in-review', 'iterating', 'delivered', 'draft'];
const VALID_FILTERS = new Set(['all', ...FILTER_STATUSES]);

export default class DemoLauncher extends LightningElement {
    @track showArchive = false;
    @track filterStatus = 'all';

    connectedCallback() {
        try {
            const params = new URLSearchParams(window.location.search);
            const f = params.get('filter');
            if (f && VALID_FILTERS.has(f)) {
                this.filterStatus = f;
            }
        } catch {
            /* no-op */
        }
    }

    get zones() {
        const decorated = this._decorateProjects();
        const filtered = this._applyFilter(decorated);
        const filterActive = this.filterStatus !== 'all';
        const active = filtered.filter(
            (p) => !ARCHIVE_STATUSES.has(p.projectStatus)
        );
        const archive = filtered.filter((p) =>
            ARCHIVE_STATUSES.has(p.projectStatus)
        );
        return {
            active,
            archive,
            hasArchive: archive.length > 0 && !filterActive,
            archiveCount: archive.length,
            archiveToggleLabel: this.showArchive
                ? `Hide ${archive.length} archived`
                : `Show ${archive.length} archived`,
            showArchive: this.showArchive,
            hasActive: active.length > 0,
            filterActive,
            emptyLabel: this._emptyLabel(),
        };
    }

    get filters() {
        const counts = this._flowCountsByStatus();
        const total = Object.values(counts).reduce((a, b) => a + b, 0);
        const items = [
            { id: 'all', label: 'All', count: total },
            ...FILTER_STATUSES.map((s) => ({
                id: s,
                label: this._statusLabel(s),
                count: counts[s] ?? 0,
            })),
        ];
        return items.map((f) => {
            const active = this.filterStatus === f.id;
            return {
                ...f,
                class: active
                    ? `filter filter_${f.id} is-active`
                    : `filter filter_${f.id}`,
                ariaPressed: String(active),
                disabled: f.count === 0 && f.id !== 'all',
            };
        });
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

    handleFilter = (event) => {
        const id = event.currentTarget?.dataset?.filter;
        if (!id) return;
        this.filterStatus = id;
        try {
            const url = new URL(window.location.href);
            if (id === 'all') {
                url.searchParams.delete('filter');
            } else {
                url.searchParams.set('filter', id);
            }
            window.history.replaceState({}, '', url.toString());
        } catch {
            /* no-op */
        }
    };

    _applyFilter(decorated) {
        if (this.filterStatus === 'all') return decorated;
        return decorated
            .map((p) => ({
                ...p,
                flows: p.flows.filter((f) => f.status === this.filterStatus),
            }))
            .filter((p) => p.flows.length > 0);
    }

    _flowCountsByStatus() {
        const counts = {};
        for (const p of projects) {
            for (const f of p.flows) {
                const s = f.status ?? 'draft';
                counts[s] = (counts[s] ?? 0) + 1;
            }
        }
        return counts;
    }

    _emptyLabel() {
        if (this.filterStatus === 'all') return '';
        const label = this._statusLabel(this.filterStatus);
        return `No flows are currently ${label.toLowerCase()}.`;
    }

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
            hasDetail: Boolean(p.detail),
            detailHref: p.detail ? `#/project/${p.id}` : null,
            flows: p.flows.map((f) => {
                flowCounter += 1;
                const guidedUrl = this._appendFlow(f.entry, f.id);
                const localGuidedUrl = f.localEntry
                    ? this._appendFlow(f.localEntry, f.id)
                    : null;
                const status = f.status ?? 'draft';
                return {
                    ...f,
                    indexLabel: String(flowCounter).padStart(2, '0'),
                    guidedUrl,
                    absoluteGuidedUrl: guidedUrl,
                    localGuidedUrl,
                    hasLocalEntry: Boolean(localGuidedUrl),
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
                return 'Need review';
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
