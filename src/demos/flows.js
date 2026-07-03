/**
 * Prototype shelf registry.
 *
 * Each project is deployed independently at its own URL. Every flow links out
 * to the guided-demo URL inside that project (with `?flow=<id>` appended).
 *
 * Project fields:
 *   id           — stable slug
 *   name         — display name
 *   summary      — one-line description
 *   status       — 'iterating' | 'in-review' | 'draft' | 'approved' | 'shipped'
 *                  Drives which zone (Active vs. Archive) the project renders in.
 *                  Active:  iterating, in-review, draft
 *                  Archive: approved, shipped
 *   lastUpdated  — ISO date (YYYY-MM-DD) of the most recent deploy or change.
 *                  Used to sort projects newest-first within each zone and to
 *                  render the "Updated Xd ago" label.
 *   flows        — array of guided demos
 *
 * Flow fields:
 *   id           — matches the ?flow=<id> parameter the target repo listens for
 *   title        — shown on the shelf
 *   description  — one line under the title
 *   status       — 'draft' | 'in-review' | 'iterating' | 'approved' | 'shipped'
 *   entry        — absolute URL to the guided demo (with ?flow= already applied
 *                  by the launcher's link builder — you only supply the base URL
 *                  and any pre-existing query params like ?tab=)
 *   fullEntry    — optional: URL to open the project unrestricted. Defaults to
 *                  `entry` stripped of `?flow=`.
 */

export const projects = [
    {
        id: 'nba',
        name: 'Next Best Action',
        summary: 'AI Models NBA card, stages, and settings.',
        status: 'iterating',
        lastUpdated: '2026-06-20',
        flows: [
            {
                id: 'nba-card-lifecycle',
                title: 'NBA card — lifecycle',
                description:
                    'How the Next Best Action card appears on the model detail page and progresses through stages.',
                status: 'iterating',
                entry: 'http://localhost:4363/app/nba-model-detail', // TODO: replace with deployed URL
            },
            {
                id: 'settings-to-feature-manager',
                title: 'Settings tab → Feature Manager',
                description:
                    'How the AI Models Settings tab surfaces the org-level Feature Manager entry point.',
                status: 'draft',
                entry: 'http://localhost:4363/app/nba-model-detail?tab=settings', // TODO
            },
        ],
    },
    {
        id: 'cluster-builder-variable-settings',
        name: 'Variable settings interaction',
        summary:
            'Exploring how per-variable transformation settings surface during model prep in the Cluster Builder.',
        status: 'iterating',
        lastUpdated: '2026-07-03',
        flows: [
            {
                id: 'prepare-variables-settings',
                title: 'Prepare Variables — settings interaction',
                description:
                    'A right-panel pattern for exposing transformation settings on Step 3 of the Cluster Builder, with an inline preview showing how each transformation will reshape the variable before training.',
                status: 'iterating',
                entry: 'https://sabarishks94.github.io/model-builder-flow-starter-kit/',
            },
        ],
    },
    {
        id: 'cluster-builder-semantic',
        name: 'Cluster Builder',
        summary:
            'Model creation flow for cluster models — landing on Semantic vs. Text clustering on the Prepare Variables step.',
        status: 'in-review',
        lastUpdated: '2026-07-02',
        flows: [
            {
                id: 'semantic-clustering-prep',
                title: 'Semantic clustering',
                description:
                    'A new clustering approach for the Prepare Variables step that groups records by meaning instead of exact text — so near-duplicates and paraphrases fold into the same cluster. This prototype explores how it should surface alongside the existing Text clustering option.',
                status: 'in-review',
                entry: 'https://sabarishks94.github.io/model-builder-flow-semantic-clustering/#/app/aim-cluster/builder?step=3&v=2',
            },
        ],
    },
];
