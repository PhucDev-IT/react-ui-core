# AGENTS.md

This repository is a reusable React + TypeScript admin design system. Coding agents must preserve the separation between generic Basic components, Advanced interaction components and ecommerce-specific patterns.

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
- hierarchical category -> `Cascader` / `CategoryTreePicker`
- editable/resizable/server table -> `AdvancedDataTable`
- image preview/reorder/crop workflow -> `ImageUploader` / Media components
- report range -> range presets / `DualCalendarRange`

Do not use an Advanced component merely because it looks more sophisticated.

### Ecommerce patterns
Components such as `ProductVariantEditor`, `SKUMatrix`, `VoucherRuleBuilder`, `ProductPicker`, `CategoryTreePicker`, `OrderStatusTimeline`, `PaymentStatus` and `FulfillmentStatus` are domain patterns.

Do not move ecommerce assumptions into generic Basic primitives.

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
When adding a component:
1. Export it from `packages/ui/src/index.ts`.
2. Include its SCSS in `packages/ui/src/theme/index.scss` when needed.
3. Add a useful demo, not just a static placeholder.
4. Update `COMPONENT_INVENTORY.md` when adding a new public component group.
5. Ensure standalone demos (`advanced.html`, `chat.html`) inherit the same theme contract and typography as the main showcase.

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
