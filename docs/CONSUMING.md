# Consuming React UI Core

Sarae currently uses this repository as the single source of truth for reusable Admin UI.

## Recommended now: Git submodule

For Sarae applications that are developed together with this repository, prefer a Git submodule pinned to an exact commit.

Example layout:

```text
sarae-web-admin/
├── src/
├── vendor/
│   └── react-ui-core/      # git submodule
└── package.json
```

Add the submodule:

```bash
git submodule add -b dev git@github.com:PhucDev-IT/react-ui-core.git vendor/react-ui-core
git submodule update --init --recursive
```

Consume the package from the submodule:

```json
{
  "dependencies": {
    "@sarae/ui": "file:vendor/react-ui-core/packages/ui"
  }
}
```

Then import:

```ts
import { Button, ThemeProvider } from '@sarae/ui'
import '@sarae/ui/styles'
```

The package intentionally exports source files for this mode. Vite/TypeScript compile the local source while the consuming application remains pinned to the submodule commit.

## Updating UI Core in a consuming app

Do not let a consuming repository silently follow the latest `dev`.

Update deliberately:

```bash
cd vendor/react-ui-core
git fetch origin
git checkout dev
git pull
cd ../..
git add vendor/react-ui-core
git commit -m "chore(ui): update react-ui-core"
```

The parent repository commit records the exact UI Core commit used by that application.

## CI requirement

Checkout must include submodules:

```yaml
- uses: actions/checkout@v4
  with:
    submodules: recursive
```

For private repositories under the same GitHub account/installation, make sure the workflow token or configured credential can read the submodule repository.

## Why submodule is the current default

Advantages for Sarae now:

- one real source repository;
- no duplicated components in feature repos;
- exact commit pinning;
- easy local inspection and debugging;
- core and Admin can evolve together;
- no registry/token/version publishing workflow is required yet.

Trade-offs:

- developers must initialize/update submodules;
- CI must checkout submodules;
- a feature repo can intentionally pin an older core commit;
- changing core from inside the nested repository still requires a core commit first, then a parent-repo pointer update.

## Future option: published package

Publishing `@sarae/ui` becomes preferable when:

- several applications consume the core independently;
- different teams release on different schedules;
- semantic versions and changelogs become important;
- consumers should install UI Core without Git access;
- CI should depend only on a package registry rather than nested repositories.

Before publishing, switch package exports from source to built `dist` files, remove `private: true`, define `files`/publish config, and publish immutable semantic versions.

## Rule

Whether consumed by submodule or package registry, feature applications must not copy components out of UI Core.

If a reusable domain-neutral primitive is missing, add or improve it here first, then update the consuming application's pinned core version. Business/domain compositions remain in the consuming application.
