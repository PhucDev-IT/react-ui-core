# Consuming React UI Core

Saraé projects may consume this repository without publishing it to a package registry.

## Recommended now: Git submodule

For first-party Saraé applications, add this repository as a submodule and alias the package source directly:

```bash
git submodule add -b dev git@github.com:PhucDev-IT/react-ui-core.git vendor/react-ui-core
git submodule update --init --recursive
```

Vite:

```ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@sarae/ui': fileURLToPath(new URL('./vendor/react-ui-core/packages/ui/src/index.ts', import.meta.url)),
      '@sarae/ui/styles': fileURLToPath(new URL('./vendor/react-ui-core/packages/ui/src/theme/index.scss', import.meta.url)),
    },
  },
})
```

TypeScript:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@sarae/ui": ["vendor/react-ui-core/packages/ui/src/index.ts"],
      "@sarae/ui/styles": ["vendor/react-ui-core/packages/ui/src/theme/index.scss"]
    }
  }
}
```

App entry:

```ts
import '@sarae/ui/styles'
```

Because UI Core uses SCSS, the consuming application must have `sass` available in devDependencies.

## Why submodule works well for Saraé now

- UI Core and applications are private first-party repositories.
- Each consuming app pins an exact UI Core commit.
- UI changes can be developed and tested before a registry release.
- No package-registry credentials are required in local development or CI.
- The UI Core repository remains independently versioned.

Always commit the submodule pointer after updating UI Core. Do not point production branches at a floating branch without reviewing the resulting commit change.

## When to publish

Move to a private/public package registry when:

- several independent applications consume the library;
- consumers need semantic-version ranges instead of pinned Git commits;
- release notes, changelogs and automated upgrades become important;
- CI should install a compiled artifact instead of compiling UI Core source;
- external teams consume the design system.

The package name is already reserved internally as `@sarae/ui`, so moving from submodule to a registry later should only change dependency resolution, not application imports.

## Dependency ownership

UI Core declares React/ReactDOM as peer dependencies. Advanced components have library dependencies such as Tiptap, QRCode and JsBarcode. A source-level submodule consumer must make those packages resolvable in its build environment.

Long-term registry builds should emit a distributable `dist` package with JS, types and CSS. That is intentionally separate from the current source-level submodule workflow.
