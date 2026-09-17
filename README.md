# React UI Core

Reusable React + TypeScript admin design system with runtime theming, ecommerce patterns and Vite showcase pages.

## Stack
- React 19
- TypeScript
- Vite
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

## Demo pages
```text
http://localhost:5173/              # core overview
http://localhost:5173/advanced.html # advanced components + ecommerce
http://localhost:5173/chat.html     # chat & messaging
```

The main sidebar also exposes **Advanced Components** and **Chat & Messaging** so all showcase areas are discoverable from the overview.

## Workspace
- `packages/ui` — reusable UI library
- `apps/demo` — interactive design-system/admin showcase

## Runtime theme
`ThemeProvider` supports light/dark/system, density, radius, font scale, primary color and boxed/wide/fluid content width.

## Component groups
### Core forms
Input, Textarea, custom Select, Checkbox, Radio, Switch, InputGroup, PasswordInput, NumberInput, SearchInput, FileUpload/Dropzone, SelectableCard.

### Advanced data entry
MultiSelect, Combobox, AsyncSelect, Autocomplete, CreatableSelect, Cascader, DatePicker, Inline DatePicker, DateRangePicker, TimePicker, DateTimePicker, MonthPicker, YearPicker, WeekPicker, preset ranges, dual calendar range, ColorPicker, OTP/PinInput, Rating, CurrencyInput, PercentageInput, MaskedInput, DualRangeSlider, NumberStepper and PasswordStrength.

### Rich content
`RichTextEditor` is powered by Tiptap and keeps the R Core visual language instead of using browser `execCommand`.

### Upload & media
ImageUploader, ImageCropper, AvatarUploader, CoverSelector, upload progress/retry states, MediaManager, LightboxGallery and SortableList.

### Data
Table, Pagination, DataTable and AdvancedDataTable with editable cells, nested rows, expanded details, sticky/resizable/reorderable columns, server-side hooks, filters, saved views, density and fullscreen mode.

### Navigation & overlays
Breadcrumb, Tabs, Accordion, Steps, SegmentedControl, TreeView, NestedNav, HorizontalNav, CommandPalette, Popover, ContextMenu, nested Menu, Sheet, BottomSheet, HoverCard, NotificationCenter, SplitPane, StickyActionFooter and FloatingActionBar.

### Visualization
ChartFrame, Sparkline, KPITrend, ProgressRing, Gauge, MiniBarChart, FunnelChart and Heatmap.

### Ecommerce
ProductVariantEditor, SKUMatrix, PriceInput, InventoryEditor, DiscountConditionBuilder, VoucherRuleBuilder, BannerUploader, ProductPicker, CollectionPicker, CustomerPicker, CategoryTreePicker, OrderStatusTimeline, PaymentStatus and FulfillmentStatus.

### Utilities
CopyButton, ClipboardField, Kbd, CodeBlock, ScrollArea, InfiniteScroll, VirtualList, Collapse, Truncate/ReadMore, RelativeTime, Countdown, QRCodeViewer and BarcodeViewer.

### Chat & Messaging
ChatLayout, ChatConversationList, ChatThread, ChatMessageList, ChatMessageBubble, ChatComposer and ChatTypingIndicator with unread counters, presence, replies, attachments, typing state and message delivery states.

## Design rule
Feature pages should compose core components and theme tokens instead of hardcoding colors, radii, spacing or typography inside business screens.
