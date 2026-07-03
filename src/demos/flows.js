/**
 * Prototype shelf registry.
 *
 * Each project is deployed independently at its own URL. Every flow links out
 * to the guided-demo URL inside that project (with `?flow=<id>` appended).
 *
 * Project fields:
 *   id       — stable slug
 *   name     — display name
 *   summary  — one-line description
 *   flows    — array of guided demos
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
    // Add other projects here. Example:
    // {
    //     id: 'model-builder',
    //     name: 'Model builder',
    //     summary: 'Guided flow for creating and configuring models.',
    //     flows: [
    //         {
    //             id: 'semantic-clustering',
    //             title: 'Semantic clustering',
    //             description: 'How users choose and configure the clustering step.',
    //             status: 'in-review',
    //             entry: 'https://model-builder.example.com/app/create',
    //         },
    //     ],
    // },
];
