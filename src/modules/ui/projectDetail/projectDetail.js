import { LightningElement, api, track } from 'lwc';
import { projects } from '../../../demos/flows.js';

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
            const visuals = Array.isArray(e.visuals) && e.visuals.length
                ? e.visuals
                : this._legacyBeforeAfter(e);
            return {
                ...e,
                indexLabel: `Enhancement · Priority ${i + 1}`,
                priorityClass: `priority priority_${(e.priority ?? '').toLowerCase()}`,
                visuals: visuals.map((v, vi) => ({
                    ...v,
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
        return this.project?.detail?.designSpecs ?? [];
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
