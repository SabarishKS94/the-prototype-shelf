import { LightningElement, api, track } from 'lwc';
import { projects } from '../../../demos/flows.js';

const BASE_URL = (import.meta.env?.BASE_URL ?? '/').replace(/\/$/, '/');

function resolveAsset(path) {
    if (!path) return path;
    if (/^(?:https?:)?\/\//.test(path)) return path;
    const clean = path.replace(/^\/+/, '');
    return `${BASE_URL}${clean}`;
}

export default class ProjectDetail extends LightningElement {
    @api projectId;
    @track activeTab = '';

    get project() {
        return projects.find((p) => p.id === this.projectId) ?? null;
    }

    get notFound() {
        return !this.project;
    }

    get subtitle() {
        return this.project?.detail?.subtitle ?? this.project?.summary ?? '';
    }

    get pageTitle() {
        return this.project?.detail?.title ?? this.project?.name ?? '';
    }

    get tabs() {
        const detail = this.project?.detail;
        if (!detail) return [];
        const list = [];
        if (detail.walkthrough || (this.project.flows && this.project.flows.length)) {
            list.push({ id: 'walkthrough', label: 'Walkthrough' });
        }
        if (detail.enhancements?.length) {
            list.push({ id: 'enhancements', label: 'Enhancements' });
        }
        if (detail.designSpecs?.length) {
            list.push({ id: 'design-specs', label: 'Design specs' });
        }
        if (detail.findings) {
            list.push({ id: 'findings', label: 'Testing findings' });
        }
        if (detail.impact) {
            list.push({ id: 'impact', label: 'Impact & metrics' });
        }
        return list.map((t) => ({
            ...t,
            class:
                this.activeTab === t.id
                    ? 'tabs__tab is-active'
                    : 'tabs__tab',
            ariaSelected: String(this.activeTab === t.id),
        }));
    }

    get walkthroughFlows() {
        const detail = this.project?.detail;
        const wantedIds = detail?.walkthrough?.flowIds;
        const flows = this.project?.flows ?? [];
        const selected = wantedIds
            ? flows.filter((f) => wantedIds.includes(f.id))
            : flows;
        return selected.map((f, i) => {
            const status = f.status ?? 'draft';
            const guidedUrl = this._appendFlow(f.entry, f.id);
            return {
                ...f,
                indexLabel: String(i + 1).padStart(2, '0'),
                guidedUrl,
                liveUrl: f.entry,
                statusLabel: this._statusLabel(status),
                statusClass: `status status_${status}`,
            };
        });
    }

    get walkthroughIntro() {
        return this.project?.detail?.walkthrough?.intro ?? '';
    }

    get enhancements() {
        const items = this.project?.detail?.enhancements ?? [];
        return items.map((e, i) => {
            const priorityRaw = String(e.priority ?? '').trim().toLowerCase();
            const priorityLabel = priorityRaw
                ? priorityRaw.charAt(0).toUpperCase() + priorityRaw.slice(1)
                : '';
            const visuals = Array.isArray(e.visuals) && e.visuals.length
                ? e.visuals
                : this._legacyBeforeAfter(e);
            const anatomy = e.anatomy
                ? {
                      ...e.anatomy,
                      parts: (e.anatomy.parts ?? []).map((p, pi) => ({
                          ...p,
                          _key: `${i}-a-${pi}`,
                          indexLabel: String(pi + 1).padStart(2, '0'),
                          tagClass: p.tag
                              ? `anatomy__tag anatomy__tag_${p.tag.toLowerCase()}`
                              : 'anatomy__tag',
                      })),
                  }
                : null;
            return {
                ...e,
                priority: priorityLabel,
                indexLabel: `Enhancement · Priority ${i + 1}`,
                priorityClass: priorityRaw
                    ? `priority priority_${priorityRaw}`
                    : 'priority',
                hasAnatomy: Boolean(anatomy && anatomy.parts.length),
                anatomy,
                visuals: visuals.map((v, vi) => ({
                    ...v,
                    image: resolveAsset(v.image),
                    _key: `${i}-${vi}`,
                })),
            };
        });
    }

    _legacyBeforeAfter(e) {
        const out = [];
        if (e.before) out.push({ image: e.before, caption: 'Before' });
        if (e.after) out.push({ image: e.after, caption: 'After' });
        return out;
    }

    get designSpecs() {
        const specs = this.project?.detail?.designSpecs ?? [];
        return specs.map((s) => ({ ...s, image: resolveAsset(s.image) }));
    }

    get findings() {
        return this.project?.detail?.findings ?? null;
    }

    get findingsPersonas() {
        return this.findings?.personas ?? [];
    }

    get findingsAppreciated() {
        return this.findings?.appreciated ?? [];
    }

    get findingsPain() {
        return this.findings?.painPoints ?? [];
    }

    get impact() {
        return this.project?.detail?.impact ?? null;
    }

    get impactMetrics() {
        return this.impact?.metrics ?? [];
    }

    get impactCategories() {
        return this.impact?.categories ?? [];
    }

    get projectStatusLabel() {
        return this._statusLabel(this.project?.status ?? 'iterating');
    }

    get projectStatusClass() {
        return `status status_${this.project?.status ?? 'iterating'}`;
    }

    get sourceUrl() {
        return this.project?.sourceUrl ?? '';
    }

    get hasSourceUrl() {
        return Boolean(this.sourceUrl);
    }

    get sourceRepoLabel() {
        if (!this.sourceUrl) return '';
        try {
            const u = new URL(this.sourceUrl);
            const path = u.pathname.replace(/^\/+|\/+$/g, '');
            return path || u.hostname;
        } catch {
            return this.sourceUrl;
        }
    }

    connectedCallback() {
        const first = this.tabs[0];
        if (first && !this.activeTab) {
            this.activeTab = first.id;
        }
    }

    handleTab = (event) => {
        const id = event.currentTarget?.dataset?.tab;
        if (id) this.activeTab = id;
    };

    handleBack = () => {
        window.location.hash = '';
    };

    get showWalkthrough() {
        return this.activeTab === 'walkthrough';
    }
    get showEnhancements() {
        return this.activeTab === 'enhancements';
    }
    get showDesignSpecs() {
        return this.activeTab === 'design-specs';
    }
    get showFindings() {
        return this.activeTab === 'findings';
    }
    get showImpact() {
        return this.activeTab === 'impact';
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
}
