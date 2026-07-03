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
                id: 'nba-card-states',
                title: 'NBA card — state gallery',
                description:
                    'Cycle through every NBA card state — training, activation, inference setup, execution, monitoring — using the state picker in the prototype toolbar. Everything else on the page is locked so the focus stays on the card itself.',
                status: 'delivered',
                entry: 'http://localhost:4363/app/nba-model-detail',
            },
            {
                id: 'nba-onboarding',
                title: 'NBA — onboarding modes',
                description:
                    'Two onboarding paths side by side. Silent auto-enable drops the user straight into the just-enabled card with a kebab menu for refresh/disable. Auto-enable-with-consent surfaces a Continue/Disable pair, opens a terms modal, and only then reveals the training-in-progress card. Toggle between them from the toolbar.',
                status: 'in-review',
                entry: 'http://localhost:4363/app/nba-model-detail',
            },
            {
                id: 'nba-settings',
                title: 'Settings tab → Feature Manager',
                description:
                    'Where NBA and Drift Tracking live on the model\'s Settings tab: feature cards, expandable previews, and the callout that hands off to the org-level Feature Manager. Toggle the previews on and off from the toolbar; both the callout link and the Feature Manager nav item route to the same destination.',
                status: 'in-review',
                entry: 'http://localhost:4363/app/nba-model-detail?tab=settings',
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
