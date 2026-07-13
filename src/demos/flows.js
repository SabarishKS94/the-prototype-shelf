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
        id: 'segment-builder',
        name: 'Segment Builder',
        summary:
            'Prototype variants for surfacing predictive AI attributes inside the Data Cloud segment builder — from grouped panels to natural-language prompts.',
        status: 'in-review',
        lastUpdated: '2026-07-11',
        flows: [
            {
                id: 'ai-models-in-segments',
                title: 'AI models in segments',
                description:
                    'A design exploration for bringing predictive AI attributes — like churn risk, lifetime value, and product affinity — into the Data Cloud segment builder. The prototype tests how marketers should discover, evaluate, and combine ML-powered fields alongside standard attributes when building an audience.',
                status: 'in-review',
                entry: 'https://sabarishks94.github.io/ai-models-in-segments/#/app/segment-builder',
            },
        ],
    },
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
        detail: {
            subtitle:
                'A refresh of the Prepare Variables step in the Cluster Builder. The settings panel opens by default with the first variable selected, adds a searchable variable selector at the top, and shows a type-specific sample outcome so users understand each transformation before applying it.',
            walkthrough: {
                intro:
                    'The prototype lands on Step 3 of the Cluster Builder with the settings panel already open on the right — first variable pre-selected. Use the variable dropdown at the top of the panel to jump between variables, or click any row on the left to swap in place. Switching the transformation updates the Sample outcome preview live, so you can see how the model will see the variable after training.',
            },
            enhancements: [
                {
                    priority: 'Critical',
                    title: 'Right panel open by default',
                    description:
                        'The transformation settings panel is docked and open the moment you land on Step 3, with the first variable pre-selected. No modal to trigger, no empty state to interpret — the settings context is visible immediately, and users can start tuning without a first click.',
                    visuals: [
                        {
                            image: '/projects/variable-settings/enh-1-panel-open.png',
                            caption: 'Step 3 loads with the panel already open and the first variable selected.',
                        },
                    ],
                    anatomy: {
                        intro:
                            'The panel is a stack of five sections, ordered by how often each one is touched during a tuning pass — variable-level context first, then the transformation controls, then the reference data.',
                        parts: [
                            {
                                title: 'Variable selector',
                                description:
                                    'New dropdown at the top. Shows the current variable and lets users jump to any other variable without going back to the list.',
                                tag: 'New',
                            },
                            {
                                title: 'Settings / Alerts tabs',
                                description:
                                    'Segments transformation config from alert thresholds. Settings is the default entry point.',
                                tag: 'Existing',
                            },
                            {
                                title: 'Transformation',
                                description:
                                    'The core control. Options are type-aware — the list of transformations changes based on whether the variable is number, text, or date.',
                                tag: 'Existing',
                            },
                            {
                                title: 'Sample outcome',
                                description:
                                    'New Before/After preview that reflects the selected transformation. Updates live as the transformation changes.',
                                tag: 'New',
                            },
                            {
                                title: 'Distribution',
                                description:
                                    'Read-only reference — min/max for numbers, category counts for text, date range for dates.',
                                tag: 'Existing',
                            },
                        ],
                    },
                },
                {
                    priority: 'Critical',
                    title: 'Searchable variable selector inside the panel',
                    description:
                        'A new dropdown at the top of the panel shows which variable is currently selected and lets you jump to any other variable in one interaction — with search for long lists. The existing pattern of clicking a variable row to open its settings still works; the two entry points coexist so users can navigate whichever way feels faster.',
                    visuals: [
                        {
                            image: '/projects/variable-settings/enh-2-selector-collapsed.png',
                            caption: 'Collapsed — always shows the current variable in context.',
                        },
                        {
                            image: '/projects/variable-settings/enh-2-selector-open.png',
                            caption: 'Expanded — the full variable list, ordered as it appears on the left.',
                        },
                        {
                            image: '/projects/variable-settings/enh-2-selector-search.png',
                            caption: 'Search — filters the list as you type, keeping the current selection at the top.',
                        },
                    ],
                    anatomy: {
                        intro:
                            'A single control with three states. Same trigger, same overlay — the search input is always present so users can filter without a mode switch.',
                        parts: [
                            {
                                title: 'VARIABLE label',
                                description:
                                    'Small caps label above the trigger so the dropdown is scannable inside the busy panel — matches the existing labeling pattern in the rest of the settings panel.',
                                tag: 'New',
                            },
                            {
                                title: 'Trigger (collapsed)',
                                description:
                                    'Full-width button showing the currently selected variable name and a chevron. Acts as the anchor for the overlay.',
                                tag: 'New',
                            },
                            {
                                title: 'Search input',
                                description:
                                    'Focused by default when the overlay opens. Filters the list live as the user types; a clear button resets to the full list.',
                                tag: 'New',
                            },
                            {
                                title: 'Current selection',
                                description:
                                    'The variable already in the panel is highlighted at the top of the list — persists across search so users never lose their place.',
                                tag: 'New',
                            },
                            {
                                title: 'Result list',
                                description:
                                    'Same variable order as the left-hand table. Click a row to switch the panel context; overlay closes on selection.',
                                tag: 'New',
                            },
                        ],
                    },
                },
                {
                    priority: 'High',
                    title: 'Sample outcome preview per variable type',
                    description:
                        'Every transformation now shows a type-aware Before/After preview so users understand the impact upfront — no need to train the model just to see what the reshape looks like. Numbers show missing-row imputation, text shows free-text clustered into categories, and dates show grouping options like by day or by month.',
                    visuals: [
                        {
                            image: '/projects/variable-settings/enh-3-number.png',
                            caption: 'Number — missing rows filled with a sensible default instead of dropped.',
                        },
                        {
                            image: '/projects/variable-settings/enh-3-text.png',
                            caption: 'Text — free-text responses clustered into a small set of categories.',
                        },
                        {
                            image: '/projects/variable-settings/enh-3-date-day.png',
                            caption: 'Date · Group by day — thousands of unique dates collapsed onto a day-level distribution.',
                        },
                        {
                            image: '/projects/variable-settings/enh-3-date-month.png',
                            caption: 'Date · Group by month — the same variable grouped at a coarser cadence.',
                        },
                    ],
                    anatomy: {
                        intro:
                            'A shared frame with type-specific content. The layout and labels are identical across variable types so the pattern is learnable in one look; only the preview data and the explanatory copy change.',
                        parts: [
                            {
                                title: 'Section heading + explainer',
                                description:
                                    '"Sample outcome" title with a one-line explainer — "How the model will see this variable after training." Sets the frame so users read the preview as model behaviour, not raw data.',
                                tag: 'New',
                            },
                            {
                                title: 'Before card',
                                description:
                                    'Shows the current state of the variable — the distribution the model would see with no transformation. Uses the neutral blue bar palette from the existing chart system.',
                                tag: 'New',
                            },
                            {
                                title: 'After card',
                                description:
                                    'Shows the same variable after the selected transformation is applied. Updates live when the transformation dropdown changes; changed bars are highlighted in green so the delta is obvious.',
                                tag: 'New',
                            },
                            {
                                title: 'Card caption',
                                description:
                                    'Plain-language caption under each chart in place of axis labels. Type-specific — imputation copy for numbers, clustering copy for text, grouping copy for dates.',
                                tag: 'New',
                            },
                            {
                                title: 'Type-aware content',
                                description:
                                    'The chart, caption, and copy adapt to the variable type: number (missing-row imputation), text (free-text → categories), date (raw → grouped by day or month). Same anatomy every time.',
                                tag: 'New',
                            },
                        ],
                    },
                },
            ],
            impact: {
                summary:
                    'Together, these three changes remove the guesswork from the Prepare Variables step. Users no longer have to open, tune, apply, and retrain just to see what a transformation does — the outcome is visible up front, and switching between variables takes one interaction inside the panel.',
                metrics: [
                    { label: 'Panel state on landing', before: 'Closed', after: 'Open, first variable selected' },
                    { label: 'Jump to another variable', before: 'Back to list, click row', after: 'Dropdown in panel' },
                    { label: 'Preview reshape pre-commit', before: 'None', after: 'Per-type preview' },
                    { label: 'Variable-type awareness', before: 'Generic', after: 'Number · Text · Date' },
                ],
                categories: [
                    {
                        title: 'Reduced cognitive load',
                        description:
                            'The panel starts in the state most users want it in — open, with a variable selected. Nothing to discover.',
                    },
                    {
                        title: 'Faster navigation',
                        description:
                            'The in-panel dropdown removes the back-and-forth between the variable list and the settings, especially for models with many variables.',
                    },
                    {
                        title: 'Confidence before commit',
                        description:
                            'The type-specific Sample outcome lets users evaluate a transformation with their own eyes instead of running a train cycle to check.',
                    },
                ],
            },
        },
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
            'Model creation flow for cluster models — landing on Semantic grouping vs. Text clustering on the Prepare Variables step.',
        status: 'in-review',
        lastUpdated: '2026-07-11',
        flows: [
            {
                id: 'semantic-clustering-prep',
                title: 'Semantic grouping',
                description:
                    'A new grouping approach for the Prepare Variables step that groups records by meaning instead of exact text — so near-duplicates and paraphrases fold into the same group. This prototype explores how it should surface alongside the existing Text clustering option.',
                status: 'in-review',
                entry: 'https://sabarishks94.github.io/model-builder-flow-semantic-clustering/#/app/aim-cluster/builder?step=3&mode=shelf',
            },
        ],
    },
];
