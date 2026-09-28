# AGENTS.md

This repository is a reusable React + TypeScript UI library. Coding agents must keep every exported component domain-neutral and reusable across unrelated applications.

## Before creating UI
1. Read `README.md` and `COMPONENT_INVENTORY.md`.
2. Search `packages/ui/src/components` for an existing component before creating a new one.
3. Use the simplest component that fully satisfies the requirement.
4. Prefer composition over feature-specific duplication.

## Component selection

### Basic components
Use Basic components for ordinary interactions with small APIs and little business logic.

Examples: `Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Card`, `Badge`, `Modal`, `Tabs`, `Table`, `Pagination`, `DatePicker`.

Examples:
- one fixed option -> `Select`
- simple text field -> `Input`
- static/simple table -> `Table` / `DataTable`
- one date -> `DatePicker`

### Advanced components
Use Advanced components only when richer behavior is necessary.

Examples:
- multiple values -> `MultiSelect`
- searchable local options -> `Combobox`
- remote/API search -> `AsyncSelect`
- hierarchical category -> `Cascader` / `TreeView`
- editable/resizable/server table -> `AdvancedDataTable`
- image preview/reorder/crop workflow -> `ImageUploader` / Media components
- report range -> range presets / `DualCalendarRange`

Do not use an Advanced component merely because it looks more sophisticated.

### Domain boundary
Core must not contain application/business components such as Product, Order, Inventory, Promotion, Voucher, Customer or Sarae-specific workflows.

Allowed:
- generic inputs, overlays, navigation, media, data-display and layout primitives;
- advanced interactions that remain domain-neutral.

Not allowed:
- ProductVariantEditor / SKUMatrix with product rules;
- voucher/promotion builders;
- order/payment/fulfillment status components;
- product/customer/category pickers named or shaped around one business domain;
- feature validation or server/business assumptions.

Large feature compositions belong in the consuming app or demo app and should be built locally from Core primitives.

## Theme rules
Every new reusable component must work in light, dark and system mode.

Use design tokens:
- `var(--ui-bg)`
- `var(--ui-surface)`
- `var(--ui-surface-2)`
- `var(--ui-surface-3)`
- `var(--ui-text)`
- `var(--ui-text-muted)`
- `var(--ui-text-subtle)`
- `var(--ui-border)`
- `var(--ui-primary)`
- `var(--ui-font-family)`
- radius/shadow/font-size tokens

Do not hardcode white page backgrounds, black text, arbitrary font families or one-off radii when tokens exist.

## Visual consistency
- Match the main showcase typography and spacing scale.
- Controls should normally align to the shared control height.
- Use SVG icons/chevrons instead of text glyphs such as `v`, `⌄`, `>` when alignment matters.
- Respect runtime density, radius and font-size settings.
- Implement hover, focus, active, disabled, loading, empty and error states.
- Keep desktop/tablet/mobile responsive.

## Demo requirements
When adding a Core component:
1. Export it from `packages/ui/src/index.ts`.
2. Include its SCSS in `packages/ui/src/theme/index.scss` when needed.
3. Demonstrate the primitive in a useful scenario.
4. Update `COMPONENT_INVENTORY.md`.
5. Keep standalone demos on the same theme contract.

Demo applications may build large example screens, but those compositions must stay inside `apps/demo`; never move them into `packages/ui` merely for reuse by the demo.

## Build requirement
Before considering work complete, the workspace must pass:
```bash
pnpm install
pnpm build
```

GitHub Actions also runs the build for `dev`/`main`. Do not claim completion if CI is failing.


## Loading-state rules

Do not invent feature-specific loaders when a core pattern exists.

Selection:
- submit/action -> `Button loading`
- small refresh -> `InlineLoader`
- section fetch -> `SectionLoader`
- blocking mutation -> `LoadingOverlay`
- predictable page/list/table/card fetch -> matching Skeleton component
- unknown route/bootstrap -> `PageLoader`
- loading/error/empty/success lifecycle -> `LoadingState`
- fast request where loader could flash -> `DelayedLoader` or `useDelayedLoading`
- measurable upload/import/export -> `Progress`

Prefer skeletons over spinners for predictable data layouts. Do not replace visible content with a full-page loader during small background refreshes.


## Consumption contract

- `packages/ui` is the only public UI package and is named `@sarae/ui`.
- Sarae feature repositories currently consume this repository through a Git submodule pinned to an exact commit.
- Do not copy Core primitives into consuming repositories. Feature/domain compositions belong in consuming repositories.
- Keep source exports compatible with the submodule workflow.
- Keep `pnpm --filter @sarae/ui build` healthy so the same package can move to registry publishing later.
- When making a breaking public API change, update `docs/CONSUMING.md` and call it out explicitly before consumers update their submodule pointer.
