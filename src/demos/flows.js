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
 *   detail       — optional. When present, the project name links to
 *                  #/project/<id> and the detail page renders. See below.
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
 *
 * Detail block (optional; every field inside is optional too — only sections
 * with content render as tabs):
 *   subtitle          — short line under the project title on the detail page
 *   walkthrough       — { intro, flowIds[] } — a walkthrough tab that reuses
 *                       the flow cards from the shelf. flowIds defaults to all.
 *   enhancements      — [{ priority: 'Critical' | 'High' | 'Medium',
 *                          title, description,
 *                          before: '/projects/<id>/foo-before.png',
 *                          after: '/projects/<id>/foo-after.png' }]
 *   designSpecs       — [{ title, description, image }]
 *   findings          — { personas: [{ name, role, note }],
 *                         appreciated: [string],
 *                         painPoints: [string] }
 *   impact            — { summary, metrics: [{ label, before, after }],
 *                         categories: [{ title, description }] }
 */

export const projects = [
    {
        id: 'nba',
        name: 'Next Best Action',
        summary: 'AI Models NBA card, stages, and settings.',
        status: 'iterating',
        lastUpdated: '2026-06-20',
        detail: {
            subtitle:
                'Bringing Next Best Action into the AI Models experience — from onboarding, through training and activation, all the way to feature-manager settings.',
            walkthrough: {
                intro:
                    'Three guided flows walk through the NBA experience end to end. Start with the card state gallery, then the two onboarding paths, then the Settings tab entry point.',
            },
            enhancements: [
                {
                    priority: 'Critical',
                    title: 'Consolidated NBA card',
                    description:
                        'One card that carries the model through every state — training, activation, inference setup, execution, monitoring — replacing the old multi-card strip. Keeps the surface stable so users always know where to look.',
                    before: '/projects/nba/enhancement-1-before.png',
                    after: '/projects/nba/enhancement-1-after.png',
                },
                {
                    priority: 'Critical',
                    title: 'Onboarding: silent vs. consent',
                    description:
                        'Two entry paths for turning NBA on. Silent auto-enable drops the user into the just-enabled card. Auto-enable-with-consent shows a Continue/Disable pair, opens a terms modal, then reveals training-in-progress. Product picks per-org.',
                    before: '/projects/nba/enhancement-2-before.png',
                    after: '/projects/nba/enhancement-2-after.png',
                },
                {
                    priority: 'High',
                    title: 'Feature Manager handoff',
                    description:
                        'A callout on the model Settings tab links out to the org-level Feature Manager instead of duplicating controls locally. Same destination as the left-nav item — one source of truth for enable/disable.',
                    before: '/projects/nba/enhancement-3-before.png',
                    after: '/projects/nba/enhancement-3-after.png',
                },
            ],
            designSpecs: [
                {
                    title: 'NBA card — state map',
                    description:
                        'All six card states with the transitions between them. Toolbar state picker in the prototype maps 1:1 to this spec.',
                    image: '/projects/nba/spec-state-map.png',
                },
                {
                    title: 'Settings tab layout',
                    description:
                        'Feature cards on the Settings tab with expandable previews. Callout link and left-nav item both route to Feature Manager.',
                    image: '/projects/nba/spec-settings.png',
                },
            ],
            findings: {
                personas: [
                    {
                        name: 'Admin — first-time setup',
                        role: 'Enables NBA for their org',
                        note:
                            'Prefers silent enable when they already trust the model; wants the consent modal only for regulated data.',
                    },
                    {
                        name: 'Data scientist — monitoring',
                        role: 'Watches accuracy and drift',
                        note:
                            'Uses the state gallery to spot models stuck in training or activation; jumps to Feature Manager to disable when needed.',
                    },
                ],
                appreciated: [
                    'Single card that stays put through every state',
                    'Consent path is optional, not forced',
                    'Feature Manager is one link away, not buried',
                ],
                painPoints: [
                    'State picker toolbar is prototype-only — needs a real trigger before ship',
                    'Terms modal copy still placeholder — legal review pending',
                    'No empty state yet for orgs that never enabled NBA',
                ],
            },
            impact: {
                summary:
                    'Consolidating the NBA surface removes two full-page navigations from the daily monitoring loop and cuts the enable path to a single click for trusted orgs.',
                metrics: [
                    { label: 'Clicks to enable NBA', before: '4', after: '1' },
                    { label: 'Card surfaces to learn', before: '3', after: '1' },
                    { label: 'Settings duplicated in-page', before: 'Yes', after: 'No' },
                ],
                categories: [
                    {
                        title: 'Reduced cognitive load',
                        description:
                            'One consolidated card replaces three; state transitions happen in place instead of by navigating between screens.',
                    },
                    {
                        title: 'User control & flexibility',
                        description:
                            'Two onboarding paths — silent and consent — so orgs can match the experience to their risk posture.',
                    },
                    {
                        title: 'Reliability & confidence',
                        description:
                            'Single source of truth in Feature Manager; no more drift between the model page and the org-level control.',
                    },
                ],
            },
        },
        flows: [
            {
                id: 'nba-card-states',
                title: 'NBA card — state gallery',
                description:
                    'Cycle through every NBA card state — training, activation, inference setup, execution, monitoring — using the state picker in the prototype toolbar. Everything else on the page is locked so the focus stays on the card itself.',
                status: 'delivered',
                entry: 'https://sabarishks94.github.io/next-best-action-nba/#/app/nba-model-detail',
                localEntry: 'http://localhost:4363/app/nba-model-detail',
            },
            {
                id: 'nba-onboarding',
                title: 'NBA — onboarding modes',
                description:
                    'Two onboarding paths side by side. Silent auto-enable drops the user straight into the just-enabled card with a kebab menu for refresh/disable. Auto-enable-with-consent surfaces a Continue/Disable pair, opens a terms modal, and only then reveals the training-in-progress card. Toggle between them from the toolbar.',
                status: 'in-review',
                entry: 'https://sabarishks94.github.io/next-best-action-nba/#/app/nba-model-detail',
                localEntry: 'http://localhost:4363/app/nba-model-detail',
            },
            {
                id: 'nba-settings',
                title: 'Settings tab → Feature Manager',
                description:
                    'Where NBA and Drift Tracking live on the model\'s Settings tab: feature cards, expandable previews, and the callout that hands off to the org-level Feature Manager. Toggle the previews on and off from the toolbar; both the callout link and the Feature Manager nav item route to the same destination.',
                status: 'in-review',
                entry: 'https://sabarishks94.github.io/next-best-action-nba/?tab=settings#/app/nba-model-detail',
                localEntry: 'http://localhost:4363/app/nba-model-detail?tab=settings',
            },
        ],
    },
    {
        id: 'version-comparison',
        name: 'Version Comparison',
        summary:
            'Post-training review flow for cluster models — comparing quality, structure, and operational metrics across versions to decide which one to activate.',
        status: 'in-review',
        lastUpdated: '2026-07-08',
        flows: [
            {
                id: 'compare-model-versions',
                title: 'Compare model versions',
                description:
                    'A side-by-side comparison of up to three trained cluster model versions. Surfaces overall score, quality & confidence metrics, structure & coverage, operational cost, and label + SHAP distributions — with a recommended winner called out at the top so reviewers can activate with confidence.',
                status: 'in-review',
                entry: 'https://sabarishks94.github.io/eou-version-comparison/',
            },
        ],
    },
    {
        id: 'cluster-builder-variable-settings',
        name: 'Variable settings interaction',
        summary:
            'Exploring how per-variable transformation settings surface during model prep in the Cluster Builder.',
        status: 'in-review',
        lastUpdated: '2026-07-08',
        flows: [
            {
                id: 'prepare-variables-settings',
                title: 'Prepare Variables — settings interaction',
                description:
                    'A right-panel pattern for exposing transformation settings on Step 3 of the Cluster Builder, with an inline preview showing how each transformation will reshape the variable before training.',
                status: 'in-review',
                entry: 'https://sabarishks94.github.io/model-builder-flow-settings-interaction/#/app/aim-cluster/builder?mode=shelf&step=3',
            },
        ],
    },
    {
        id: 'model-training-in-progress',
        name: 'Model Training in Progress',
        summary:
            'A redesigned in-flight state for cluster model training — surfacing pipeline stage, start time, and expected finish so users can leave the page with confidence.',
        status: 'in-review',
        lastUpdated: '2026-07-08',
        flows: [
            {
                id: 'training-in-progress',
                title: 'Training in progress — status view',
                description:
                    'A redesigned in-flight state for cluster model training. Turns the empty "training…" screen into a clear status view — showing which stage the pipeline is in, when it started, and when it should finish — so users can leave the page with confidence instead of hovering over a spinner.',
                status: 'in-review',
                entry: 'https://sabarishks94.github.io/model-builder-flow-starter-training-in-progress-screen/',
            },
        ],
    },
    {
        id: 'cluster-builder-semantic',
        name: 'Cluster Builder',
        summary:
            'Model creation flow for cluster models — landing on Semantic vs. Text clustering on the Prepare Variables step.',
        status: 'in-review',
        lastUpdated: '2026-07-11',
        flows: [
            {
                id: 'semantic-clustering-prep',
                title: 'Semantic clustering',
                description:
                    'A new clustering approach for the Prepare Variables step that groups records by meaning instead of exact text — so near-duplicates and paraphrases fold into the same cluster. This prototype explores how it should surface alongside the existing Text clustering option.',
                status: 'in-review',
                entry: 'https://sabarishks94.github.io/model-builder-flow-semantic-clustering/#/app/aim-cluster/builder?step=3&mode=shelf',
            },
        ],
    },
];
