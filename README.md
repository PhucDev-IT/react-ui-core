# React UI Core

Reusable React + TypeScript admin design system with runtime theming, reusable primitives, advanced data-entry controls, admin patterns and standalone demos.

## Stack
- React 19
- TypeScript
- Vite demo
- SCSS + CSS custom properties
- pnpm workspace
- Tiptap rich text editor
- No Bootstrap, Tailwind or jQuery runtime dependency

## Run
```bash
pnpm install
pnpm build
pnpm dev
```

Main showcase:
```text
http://localhost:5173/
```

Advanced components:
```text
http://localhost:5173/advanced.html
```

Chat & Messaging:
```text
http://localhost:5173/chat.html
```

## Workspace
- `packages/ui` — reusable UI library
- `apps/demo` — interactive design-system/admin showcase

---

# Component model: Basic vs Advanced

R Core has two levels of reusable UI. This distinction is important for humans and coding agents.

## 1. Basic components

Basic components are small, generic building blocks. They should have a narrow API, minimal business assumptions and be usable in almost every screen.

Examples:
- `Button`
- `Input`
- `Textarea`
- `Select`
- `Checkbox`
- `Radio`
- `Switch`
- `Card`
- `Badge`
- `Modal`
- `Drawer`
- `Tabs`
- `Table`
- `Pagination`
- `DatePicker`

Use a Basic component when the interaction can be expressed without extra workflow/state.

Example:
```tsx
<Input label="Tên sản phẩm" />
<Select label="Trạng thái" options={statusOptions} />
<Button>Lưu</Button>
```

Do not replace a simple `Select` with `Combobox` or `AsyncSelect` unless users genuinely need search or remote loading.

## 2. Advanced components

Advanced components solve a more complex interaction or business workflow. They may compose multiple Basic components and contain richer state, filtering, hierarchy, keyboard behavior, drag/drop or domain-specific logic.

Examples:
- `MultiSelect`
- `Combobox`
- `AsyncSelect`
- `Cascader`
- `DualCalendarRange`
- `ImageUploader`
- `AdvancedDataTable`
- `TreeView`
- `CommandPalette`
- `ProductVariantEditor`
- `VoucherRuleBuilder`
- `ProductPicker`
- `OrderStatusTimeline`

Use an Advanced component only when its richer behavior reduces custom feature code.

### Decision examples

| Requirement | Prefer |
|---|---|
| Choose one fixed value | `Select` |
| Search a local list before selecting | `Combobox` |
| Search an API / large remote list | `AsyncSelect` |
| Choose multiple values | `MultiSelect` |
| Choose hierarchical category | `Cascader` / `CategoryTreePicker` |
| Show a simple table | `Table` / `DataTable` |
| Editable/sticky/resizable/server table | `AdvancedDataTable` |
| One file input | `FileUpload` |
| Product image gallery with preview/reorder | `ImageUploader` |
| Simple date | `DatePicker` |
| Analytics/report period with presets | `DualCalendarRange` / range presets |

The rule is: **use the simplest component that fully satisfies the requirement**.

---

# Advanced component groups and use cases

## Advanced Select
- `MultiSelect` — tags, multiple statuses, multiple collections
- `Combobox` — searchable local datasets
- `AsyncSelect` — customers/products/users loaded from API
- `Autocomplete` — suggestions while typing
- `CreatableSelect` — tags/labels that may be created inline
- `Cascader` — category trees such as `Nữ > Áo > Áo khoác`

## Date & Time
- `TimePicker` — appointment/delivery/opening time
- `DateTimePicker` — scheduled publish/start/end
- `MonthPicker`, `YearPicker`, `WeekPicker` — reporting periods
- range presets — Today / 7 days / 30 days / This month
- `DualCalendarRange` — analytics and order filters

## Advanced Inputs
- `ColorPicker` — theme, product metadata, labels
- `PinInput` — OTP/PIN
- `Rating` — review/admin quality score
- `CurrencyInput` — price, amount
- `PercentageInput` — discount/tax/rate
- `MaskedInput` — phone, CCCD, bank account
- `DualRangeSlider` — min/max filter
- `NumberStepper` — stock/quantity/count
- `PasswordStrength` — password creation feedback

## Upload & Media
- `ImageUploader` — preview + multiple images + reorder
- cropper — banner/avatar/product crop
- avatar / cover selector
- upload progress and retry states
- media manager / file picker
- lightbox gallery

## Advanced Table
Use `AdvancedDataTable` for screens that need expandable rows, nested data, editable cells, sticky/resizable/reorderable columns, server pagination, advanced filters, saved views, export, density and fullscreen.

For a small static table, use the Basic `Table` or `DataTable` instead.

## Navigation & Layout
- `CommandPalette` — global Ctrl/Cmd+K search/actions
- `TreeView` — hierarchical data
- nested/sidebar/horizontal navigation
- `SplitPane` — master/detail workspace
- sticky/floating actions — long forms and bulk operations

## Overlay
- `Popover` — small contextual content
- `ContextMenu` — row/item actions
- nested `Menu`
- `Sheet` / `BottomSheet` — secondary workflows
- `HoverCard` — quick preview
- `NotificationCenter` — notification feed

## Visualization
- `ChartFrame`
- `Sparkline`
- `KPITrend`
- `ProgressRing`
- `Gauge`
- `MiniBarChart`
- `FunnelChart`
- `Heatmap`

These are lightweight UI visualizations. Use a dedicated chart adapter/library when advanced charting, accessibility or large datasets require it.

## Ecommerce patterns
- `ProductVariantEditor`
- `SKUMatrix`
- `PriceInput`
- `InventoryEditor`
- `VoucherRuleBuilder`
- `DiscountConditionBuilder`
- `BannerUploader`
- `CollectionPicker`
- `ProductPicker`
- `CategoryTreePicker`
- `CustomerPicker`
- `OrderStatusTimeline`
- `PaymentStatus`
- `FulfillmentStatus`

These are domain patterns, not primitives. Do not import ecommerce assumptions into generic Basic components.

## Utility / UX
- `CopyButton`
- `ClipboardField`
- `Kbd`
- `CodeBlock`
- `ScrollArea`
- `InfiniteScroll`
- `VirtualList`
- `Collapse`
- `Truncate`
- `RelativeTime`
- `Countdown`
- `PasswordStrength`
- `QRCodeViewer`
- `BarcodeViewer`

---

# Real admin composition examples

## Product form
```text
Tên sản phẩm        -> Input
SKU                  -> Input
Danh mục             -> Cascader / CategoryTreePicker
Thương hiệu          -> Combobox
Tags                 -> MultiSelect / CreatableSelect
Giá                  -> CurrencyInput
Mô tả                -> RichTextEditor
Ảnh                  -> ImageUploader + crop + reorder
Biến thể             -> ProductVariantEditor + SKUMatrix
```

## Order list
```text
Keyword              -> SearchInput
Status               -> MultiSelect
Created date         -> Date range + presets
Customer             -> AsyncSelect
Rows                 -> AdvancedDataTable
Row actions          -> ContextMenu
Status details       -> OrderStatusTimeline
```

## Voucher form
```text
Voucher type         -> SegmentedControl
Value                -> CurrencyInput / PercentageInput
Conditions           -> DiscountConditionBuilder
Products             -> ProductPicker
Categories           -> CategoryTreePicker
Schedule             -> DateTimePicker / range
```

---

# Theme contract

Every reusable component and every demo must support:
- light mode
- dark mode
- system mode
- runtime primary color
- density
- radius
- font scale
- content width

Components must use CSS variables such as:
```text
--ui-bg
--ui-surface
--ui-surface-2
--ui-text
--ui-text-muted
--ui-border
--ui-primary
--ui-font-family
```

Do not hardcode page-specific light backgrounds, text colors, font families or border colors inside reusable components.

`advanced.html` and `chat.html` intentionally remain standalone full-screen demos, but they must visually inherit the same tokens, typography scale and theme behavior as the main showcase.

---

# Design rules

1. Feature pages should compose existing core components before creating new ones.
2. Prefer Basic components for ordinary form/UI needs.
3. Use Advanced components only when the richer interaction is actually required.
4. Do not duplicate a component just because one feature needs different spacing; extend tokens/variants first.
5. No hardcoded colors/radius/typography in feature pages when a token already exists.
6. All states are first-class: hover, focus, active, loading, disabled, empty, error and dark mode.
7. Desktop, tablet and mobile must remain usable.
8. Ecommerce-specific logic stays in ecommerce patterns, not generic primitives.

See `AGENTS.md` for coding-agent rules.
