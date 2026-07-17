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
        sourceUrl: 'https://git.soma.salesforce.com/sabarish-ks/ai-models-in-segments',
        detail: {
            subtitle:
                'A design exploration for bringing predictive AI attributes — churn risk, lifetime value, product affinity — into the Data Cloud segment builder. Tests how marketers should discover, evaluate, and combine ML-powered fields alongside standard attributes when building an audience.',
            walkthrough: {
                intro:
                    'The prototype opens on the Data Cloud segment builder with predictive AI attributes surfaced alongside standard fields. Explore how marketers discover, evaluate, and combine ML-powered attributes when building an audience.',
            },
        },
        flows: [
            {
                id: 'ai-models-in-segments',
                title: 'AI models in segments',
                description:
                    'A design exploration for bringing predictive AI attributes — like churn risk, lifetime value, and product affinity — into the Data Cloud segment builder. The prototype tests how marketers should discover, evaluate, and combine ML-powered fields alongside standard attributes when building an audience.',
                status: 'in-review',
                entry: 'https://git.soma.salesforce.com/pages/sabarish-ks/ai-models-in-segments/#/app/segment-builder',
            },
        ],
    },
    {
        id: 'nba',
        name: 'Next Best Action',
        summary: 'AI Models NBA card, stages, and settings.',
        status: 'iterating',
        lastUpdated: '2026-06-20',
        sourceUrl: 'https://git.soma.salesforce.com/sabarish-ks/next-best-action-nba',
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
                entry: 'https://git.soma.salesforce.com/pages/sabarish-ks/next-best-action-nba/#/app/nba-model-detail',
                localEntry: 'http://localhost:4363/app/nba-model-detail',
            },
            {
                id: 'nba-onboarding',
                title: 'NBA — onboarding modes',
                description:
                    'Two onboarding paths side by side. Silent auto-enable drops the user straight into the just-enabled card with a kebab menu for refresh/disable. Auto-enable-with-consent surfaces a Continue/Disable pair, opens a terms modal, and only then reveals the training-in-progress card. Toggle between them from the toolbar.',
                status: 'in-review',
                entry: 'https://git.soma.salesforce.com/pages/sabarish-ks/next-best-action-nba/#/app/nba-model-detail',
                localEntry: 'http://localhost:4363/app/nba-model-detail',
            },
            {
                id: 'nba-settings',
                title: 'Settings tab → Feature Manager',
                description:
                    'Where NBA and Drift Tracking live on the model\'s Settings tab: feature cards, expandable previews, and the callout that hands off to the org-level Feature Manager. Toggle the previews on and off from the toolbar; both the callout link and the Feature Manager nav item route to the same destination.',
                status: 'in-review',
                entry: 'https://git.soma.salesforce.com/pages/sabarish-ks/next-best-action-nba/?tab=settings#/app/nba-model-detail',
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
        sourceUrl: 'https://git.soma.salesforce.com/sabarish-ks/eou-version-comparison',
        detail: {
            subtitle:
                'A post-training review flow for cluster models. Reviewers compare up to three trained versions side by side — overall score, quality & confidence, structure & coverage, operational cost, and label + SHAP distributions — with a recommended winner at the top so activation is a confident call.',
            walkthrough: {
                intro:
                    'Open the comparison view to see all three trained versions in one pass. The recommended winner is called out at the top; every other section — metrics, structure, cost, distributions — supports or challenges that recommendation.',
            },
        },
        flows: [
            {
                id: 'compare-model-versions',
                title: 'Compare model versions',
                description:
                    'A side-by-side comparison of up to three trained cluster model versions. Surfaces overall score, quality & confidence metrics, structure & coverage, operational cost, and label + SHAP distributions — with a recommended winner called out at the top so reviewers can activate with confidence.',
                status: 'in-review',
                entry: 'https://git.soma.salesforce.com/pages/sabarish-ks/eou-version-comparison/#/compare-versions',
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
        sourceUrl:
            'https://git.soma.salesforce.com/sabarish-ks/model-builder-flow-settings-interaction',
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
                entry: 'https://git.soma.salesforce.com/pages/sabarish-ks/model-builder-flow-settings-interaction/#/app/aim-cluster/builder?mode=shelf&step=3&variant=g',
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
        sourceUrl: 'https://git.soma.salesforce.com/sabarish-ks/model-builder-flow-starter-training-in-progress-screen',
        detail: {
            subtitle:
                'A redesigned in-flight state for cluster model training. Turns the empty "training…" screen into a clear status view — showing which stage the pipeline is in, when it started, and when it should finish — so users can leave the page and come back without losing context.',
            walkthrough: {
                intro:
                    'The prototype opens on the training-in-progress state, mid-pipeline. Note the current stage, start time, and expected finish — a status view users can trust enough to walk away from.',
            },
        },
        flows: [
            {
                id: 'training-in-progress',
                title: 'Training in progress — status view',
                description:
                    'A redesigned in-flight state for cluster model training. Turns the empty "training…" screen into a clear status view — showing which stage the pipeline is in, when it started, and when it should finish — so users can leave the page with confidence instead of hovering over a spinner.',
                status: 'in-review',
                entry: 'https://git.soma.salesforce.com/pages/sabarish-ks/model-builder-flow-starter-training-in-progress-screen/#/nba-model-detail',
            },
        ],
    },
    {
        id: 'cluster-builder-semantic',
        name: 'Semantic grouping — Cluster Builder',
        summary:
            'Model creation flow for cluster models — landing on Semantic grouping vs. Text clustering on the Prepare Variables step.',
        status: 'in-review',
        lastUpdated: '2026-07-16',
        sourceUrl:
            'https://git.soma.salesforce.com/sabarish-ks/model-builder-flow-semantic-clustering',
        detail: {
            subtitle:
                'A new transformation for long-text variables on the Prepare Variables step. Text clustering breaks down on free-form fields like descriptions or notes because it matches on exact patterns — Semantic grouping folds near-duplicates and paraphrases into the same group by understanding meaning, so long-text variables become usable in a cluster model.',
            walkthrough: {
                intro:
                    'The prototype lands on Step 3 of the Cluster Builder with Semantic grouping already enabled and auto-applied to the most relevant long-text variables. Toggle the Use semantic grouping card at the top to compare before/after, hover the info icon on any disabled long-text row to see the limit message, or open the Transformation dropdown on a long-text variable to switch between None and Semantic Grouping.',
            },
            enhancements: [
                {
                    title: 'Enable semantic transformation card',
                    priority: 'critical',
                    description:
                        'A new card at the top of Prepare Variables that turns Semantic grouping on for the whole model. When enabled, it auto-applies the transformation to the most relevant long-text variables (1 or 2, subject to tech feasibility) so users get a working default instead of an empty state.',
                    visuals: [
                        {
                            image: '/projects/semantic-grouping/enh-1-enable-card.png',
                            caption:
                                '"Use semantic grouping" — a single card with a NEW pill, a plain-English one-liner, and an Active toggle. Enabling it auto-selects Semantic grouping on the highest-signal long-text variable(s).',
                        },
                    ],
                    anatomy: {
                        intro:
                            'The card sits above the variables list so it reads as a model-level setting, not a per-row control.',
                        parts: [
                            {
                                title: 'Sparkle icon',
                                tag: 'New',
                                description:
                                    'Signals that this is an AI-powered / intelligent transformation. Uses the same magic-wand mark used across model-generation features.',
                            },
                            {
                                title: '"Use semantic grouping" label',
                                tag: 'New',
                                description:
                                    'Plain-English name that matches the transformation option in the per-variable dropdown below, so users can trace enable → applied.',
                            },
                            {
                                title: 'NEW pill',
                                tag: 'Existing',
                                description:
                                    'Standard SLDS pill used to flag newly released capabilities — reused so it looks like every other new feature in the product.',
                            },
                            {
                                title: 'Info icon',
                                tag: 'Existing',
                                description:
                                    'On hover, explains what "group by meaning" means in one line and points to docs. Uses the standard info-icon pattern.',
                            },
                            {
                                title: 'Description line',
                                tag: 'New',
                                description:
                                    '"Group long text fields by meaning instead of patterns." Names the trade-off in the same sentence so users understand why this exists.',
                            },
                            {
                                title: 'Active toggle',
                                tag: 'Existing',
                                description:
                                    'Standard on/off toggle. Turning it on triggers auto-apply; turning it off clears Semantic grouping from every variable and returns them to None.',
                            },
                        ],
                    },
                },
                {
                    title: 'Long text tag on variables',
                    priority: 'high',
                    description:
                        'A new "Long text" tag next to variable names so users can spot which fields are actually free-form text — the ones Semantic grouping was built for. Without this, long-text variables look identical to short strings in the list.',
                    visuals: [
                        {
                            image: '/projects/semantic-grouping/enh-2-long-text-tag.png',
                            caption:
                                'The "Long text" pill sits next to the variable name, before any applied-transformation chip on the right. Makes long-text variables scannable at a glance.',
                        },
                    ],
                    anatomy: {
                        intro:
                            'Reuses the existing type-tag pattern used elsewhere in Prepare Variables, so it feels like the same system, just with a new value.',
                        parts: [
                            {
                                title: 'Type icon',
                                tag: 'Existing',
                                description:
                                    'The Aa monogram that already sits next to text-type variables — kept unchanged so the row structure stays consistent.',
                            },
                            {
                                title: 'Variable name',
                                tag: 'Existing',
                                description:
                                    'Clickable link to the variable detail — unchanged.',
                            },
                            {
                                title: '"Long text" pill',
                                tag: 'New',
                                description:
                                    'A neutral-grey pill that marks the variable as long-form free text. Only appears on variables the system classifies as long text — short strings, IDs, and picklist-like fields don\'t get it.',
                            },
                            {
                                title: 'Applied-transformation chip',
                                tag: 'Existing',
                                description:
                                    'The blue "Semantic Grouping" outline chip on the right — shown when the transformation is applied to this variable. Standard pattern reused from Text clustering.',
                            },
                            {
                                title: 'Row delete',
                                tag: 'Existing',
                                description:
                                    'Standard row-level remove control — unchanged.',
                            },
                        ],
                    },
                },
                {
                    title: 'Semantic Grouping in the transformation dropdown',
                    priority: 'high',
                    description:
                        'The per-variable Transformation dropdown now lists Semantic Grouping alongside None. When Semantic grouping is enabled at the model level, it pre-selects on auto-applied variables; users can also switch it on manually for any long-text variable up to the limit.',
                    visuals: [
                        {
                            image: '/projects/semantic-grouping/enh-3-transformation-list.png',
                            caption:
                                'Opening the Transformation dropdown on a long-text variable shows Semantic Grouping as a first-class option — same UI pattern as every other per-variable transformation.',
                        },
                    ],
                    anatomy: {
                        intro:
                            'The dropdown itself is unchanged — the new option is just a new item slotted into the existing list, following the same select pattern.',
                        parts: [
                            {
                                title: '"Transformation" label',
                                tag: 'Existing',
                                description:
                                    'Standard field label — unchanged.',
                            },
                            {
                                title: 'Info icon',
                                tag: 'Existing',
                                description:
                                    'Reused help-icon pattern that explains the transformation options in a tooltip.',
                            },
                            {
                                title: 'Select control',
                                tag: 'Existing',
                                description:
                                    'Standard SLDS combobox — unchanged shape, unchanged interaction.',
                            },
                            {
                                title: '"None" option',
                                tag: 'Existing',
                                description:
                                    'Default no-transformation option — kept in the same position at the top of the list.',
                            },
                            {
                                title: '"Semantic Grouping" option',
                                tag: 'New',
                                description:
                                    'New list item — appears only for long-text variables. Selecting it counts against the model-level Semantic grouping limit; if the limit is reached, the option remains visible on selected rows but is disabled on new ones (see enhancement 4).',
                            },
                        ],
                    },
                },
                {
                    title: 'Limit-reached state on extra long-text variables',
                    priority: 'medium',
                    description:
                        'When Semantic grouping has already been applied to the maximum number of variables, remaining long-text rows are disabled with a "Limit reached" chip and an info icon that explains why in a tooltip — so users understand what changed and how to fix it.',
                    visuals: [
                        {
                            image: '/projects/semantic-grouping/enh-4-limit-reached.png',
                            caption:
                                'A disabled long-text row: the checkbox is greyed out, and a "Limit reached" chip with an info icon replaces the applied-transformation chip on the right.',
                        },
                        {
                            image: '/projects/semantic-grouping/enh-4-limit-tooltip.png',
                            caption:
                                'Hovering the info icon reveals the reason: "Only 2 fields can use Semantic Grouping. Remove one to enable this variable." Names the constraint and the recovery action in one sentence.',
                        },
                    ],
                    anatomy: {
                        intro:
                            'A soft-blocked state rather than a hard error — the row still shows the variable and its type so users can decide whether to swap this one in.',
                        parts: [
                            {
                                title: 'Disabled checkbox',
                                tag: 'Existing',
                                description:
                                    'Standard disabled-checkbox state — signals that the row can\'t be included in the current model config.',
                            },
                            {
                                title: 'Muted variable name',
                                tag: 'Existing',
                                description:
                                    'Name text uses the disabled colour token so the whole row reads as inactive at a glance.',
                            },
                            {
                                title: '"Long text" pill',
                                tag: 'New',
                                description:
                                    'Still shown so users know this variable is a candidate — the tag doesn\'t disappear just because the row is disabled.',
                            },
                            {
                                title: '"Limit reached" chip',
                                tag: 'New',
                                description:
                                    'Italic label with an inline info icon. Replaces the applied-transformation chip on rows that hit the cap. Compact enough to sit in the existing column without a layout change.',
                            },
                            {
                                title: 'Tooltip on info icon',
                                tag: 'New',
                                description:
                                    'Dark tooltip pinned above the icon. Explains the fixed limit and the exact action needed to recover — "Remove one to enable this variable."',
                            },
                        ],
                    },
                },
                {
                    title: 'Applied-transformation counter chip',
                    priority: 'medium',
                    description:
                        'A small chip above the variables list that shows how many Semantic groupings are currently applied against the cap — "Semantic transformations · 2 of 2". A single at-a-glance indicator that tells users the model-level state so they don\'t have to scan the list to work out why new rows are getting soft-blocked.',
                    visuals: [
                        {
                            image: '/projects/semantic-grouping/enh-4-counter-chip.png',
                            caption:
                                'The counter chip: type icon + label + separator + count. Same shape across all states — the count is the only thing that changes as users add or remove Semantic Grouping from variables.',
                        },
                    ],
                    anatomy: {
                        intro:
                            'Reuses the type-tag chip shape used elsewhere in Prepare Variables. Placed near the enable card / list header so it reads as a model-level summary, not a per-row signal.',
                        parts: [
                            {
                                title: 'Type icon',
                                tag: 'Existing',
                                description:
                                    'The Aa monogram used on long-text variables — anchors the chip visually to the class of fields it counts.',
                            },
                            {
                                title: '"Semantic transformations" label',
                                tag: 'New',
                                description:
                                    'Plain-English label naming what\'s being counted. Uses "transformations" (matching the dropdown label) rather than "groupings" so the vocabulary stays consistent across the flow.',
                            },
                            {
                                title: 'Middle-dot separator',
                                tag: 'Existing',
                                description:
                                    'Standard bullet separator used across the product to divide label + value inside a single chip.',
                            },
                            {
                                title: 'Usage count',
                                tag: 'New',
                                description:
                                    'The "X of Y" pair. X increments each time a user selects Semantic Grouping on a variable; Y is the fixed model-level cap. The chip stays visible in every state — 0 of 2, 1 of 2, 2 of 2 — so users always know where they are relative to the limit.',
                            },
                        ],
                    },
                },
            ],
            impact: {
                summary:
                    'Together, these five changes make long-text variables usable in Cluster Builder for the first time — users get a working Semantic grouping default on the highest-signal fields, a clear signal of which variables qualify, a visible usage counter, and a soft-blocked state that names the constraint instead of failing silently.',
                metrics: [
                    {
                        label: 'Long-text variables usable in a cluster model',
                        before: '0 — Text clustering fails on free-form fields',
                        after: 'Up to the Semantic grouping cap',
                    },
                    {
                        label: 'Setup for the default happy path',
                        before: 'User picks the right transformation per variable',
                        after: 'One toggle auto-applies to the top variable(s)',
                    },
                    {
                        label: 'Understanding why a variable is disabled',
                        before: 'Silently skipped or unclear',
                        after: '"Limit reached" chip + one-line explainer tooltip',
                    },
                ],
                categories: [
                    {
                        title: 'New capability',
                        description:
                            'Semantic grouping unlocks long-text variables that were previously incompatible with Cluster Builder — a whole class of fields (descriptions, notes, logs, feedback) becomes usable in a cluster model.',
                    },
                    {
                        title: 'Faster time-to-first-result',
                        description:
                            'The auto-apply behaviour on the enable card means users don\'t have to reason about which of their long-text variables is the best candidate — the system picks a working default they can override.',
                    },
                    {
                        title: 'Constraint clarity',
                        description:
                            'The "Limit reached" state names the cap and the recovery action in the same tooltip, so users don\'t have to guess why a row is disabled or where to change it.',
                    },
                ],
            },
        },
        flows: [
            {
                id: 'semantic-clustering-prep',
                title: 'Semantic grouping',
                description:
                    'A new grouping approach for the Prepare Variables step that groups records by meaning instead of exact text — so near-duplicates and paraphrases fold into the same group. This prototype explores how it should surface alongside the existing Text clustering option.',
                status: 'in-review',
                entry: 'https://git.soma.salesforce.com/pages/sabarish-ks/model-builder-flow-semantic-clustering/#/app/aim-cluster/builder?step=3&mode=shelf',
            },
        ],
    },
];
