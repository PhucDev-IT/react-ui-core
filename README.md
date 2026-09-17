# React UI Core

Reusable React + TypeScript admin design system with runtime theming and a Vite demo application.

## Stack
- React 19
- TypeScript
- Vite demo
- SCSS + CSS custom properties
- pnpm workspace
- No Bootstrap, Tailwind or jQuery runtime dependency

## Run
```bash
pnpm install
pnpm build
pnpm dev
```

## Workspace
- `packages/ui` — reusable UI library
- `apps/demo` — interactive design-system/admin showcase

## Runtime theme
`ThemeProvider` supports light/dark/system, density, radius, font scale, primary color and boxed/wide/fluid content width.

## Component groups
### Forms & data entry
Input, Textarea, Select, Checkbox, Radio, Switch, InputGroup, PasswordInput, NumberInput, SearchInput, FileUpload/Dropzone, SelectableCard.

### Feedback & overlays
Alert, Modal, Drawer, Toast, ConfirmModal, LoadingOverlay, Spinner, Skeleton, Progress, Tooltip, EmptyState.

### Navigation
Breadcrumb, Tabs, Accordion, Steps, SegmentedControl, responsive/collapsible AppShell.

### Data
Table, Pagination and generic DataTable with search, sorting, row selection, column visibility and pagination.

### Admin patterns
FilterBar, SettingsSection, ActivityFeed, PageHeader, StatCard and responsive admin layouts.

## Design rule
Feature pages should use core components and theme tokens instead of hardcoded colors, radii, spacing or typography.


## Advanced data-entry additions
This build also includes a custom non-native Select, DatePicker, Inline DatePicker, DateRangePicker, RangeInput, TagsInput, RichTextEditor and ImageCheck (radio/checkbox) components. All are theme-token driven and responsive.
