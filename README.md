# The prototype shelf

Landing page listing in-flight design prototypes. Each entry links out to a guided demo in the project's own repo/deploy.

## Run locally

```bash
npm install
npm run dev
```

Opens at http://localhost:4400.

## Add a project

Edit `src/demos/flows.js`. Add an object to `projects[]`:

```js
{
    id: 'my-project',
    name: 'My project',
    summary: 'One-line summary.',
    flows: [
        {
            id: 'flow-a',                       // matches ?flow=flow-a in the target repo
            title: 'Flow title',
            description: 'One line under the title.',
            status: 'draft',                     // 'draft' | 'in-review' | 'iterating' | 'approved' | 'shipped'
            entry: 'https://my-project.example.com/app/page',
        },
    ],
}
```

The launcher will append `?flow=<id>` when the viewer clicks **Start demo**. The target repo needs to have `demoModeOverlay` wired up and a matching flow registered in its own `flows.js` for the mask to activate.

## Statuses

| Status       | Color   | Notes                                 |
|--------------|---------|---------------------------------------|
| `draft`      | Grey    | Early, not ready for feedback         |
| `in-review`  | Amber   | Actively collecting feedback          |
| `iterating`  | Purple  | Reworking based on feedback (pulses)  |
| `approved`   | Blue    | Signed off, ready for engineering     |
| `shipped`    | Green   | Live in the product                   |

## Deploy

```bash
npm run build              # → dist/
npm run deploy             # → GitHub Pages (uses gh-pages branch)
```
