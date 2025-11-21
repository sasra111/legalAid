# Legal Search Feature - Visual Design Guide

## 🎨 UI Layout & Design

### Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│  ⚖️  Legal Case Search                                      │
│  Search through legal judgements and case law using         │
│  AI-powered semantic search                                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 🔍 Search Query                                       │  │
│  │ Enter keywords or phrases to search relevant cases   │  │
│  │ ┌──────────────────────────────────┬───────────┐    │  │
│  │ │ e.g., fundamental violation...   │ 🔍 Search │    │  │
│  │ └──────────────────────────────────┴───────────┘    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 📊 Search Results          Total Chunks: 22          │  │
│  │ 5 matches found            Query: "fundamental..."   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │║ 📄 Test  [Doc: 1]  [Chunk: 2]  🟢 5.23%  📋 Copy   │  │
│  │║ Result #1                                           │  │
│  │║ ─────────────────────────────────────────────────── │  │
│  │║ [6] At approximately 2:00 p.m. on the same day...  │  │
│  │║ the Petitioner arrived at the Police Station...    │  │
│  │║ [Full case text displayed here...]                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │║ 📄 Test  [Doc: 1]  [Chunk: 20]  🟡 4.03%  📋 Copy  │  │
│  │║ Result #2                                           │  │
│  │║ ─────────────────────────────────────────────────── │  │
│  │║ In support of this contention, the Petitioner...   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Component Breakdown

### 1. Header Section

```
┌─────────────────────────────────────────────┐
│  ┌───┐                                      │
│  │⚖️ │  Legal Case Search                  │
│  └───┘  Search through legal judgements... │
└─────────────────────────────────────────────┘

Elements:
- Icon: Scale (Justice symbol) in blue circle background
- Title: "Legal Case Search" (3xl, bold, blue-800)
- Subtitle: Description text (gray-600)
```

### 2. Search Card

```
┌───────────────────────────────────────────────┐
│ 🔍 Search Query                               │
│ Enter keywords or phrases...                  │
│ ┌─────────────────────────────┬──────────┐   │
│ │ [Search input field]        │ [Button] │   │
│ └─────────────────────────────┴──────────┘   │
│                                                │
│ ⚠️ [Error message if any]                     │
└───────────────────────────────────────────────┘

Styling:
- White background with shadow
- Blue border accent
- Rounded corners (xl)
- Large input height (h-12)
- Blue action button
```

### 3. Loading State

```
┌───────────────────────────────────────────────┐
│ ████████████░░░░░░░░░░░░                     │ ← Skeleton
│ ████████░░░░░░░░                             │
│ ████████████████░░░░░░░░░░░░░░░░░░░░░░░░   │
│ ████████████████████░░░░░░░░░░░░░░░░░░░░   │
└───────────────────────────────────────────────┘

Features:
- 3 skeleton cards
- Animated pulse effect
- Gray background (primary/10)
- Rounded corners
```

### 4. Results Summary Card

```
┌───────────────────────────────────────────────┐
│ 📖 Search Results    │  Total Chunks: 22      │
│ 5 matches found      │                        │
│ ─────────────────────────────────────────────│
│ Query: "fundamental violation"                │
└───────────────────────────────────────────────┘

Styling:
- Gradient background (blue-50 to indigo-50)
- Two-column layout
- Border accent (blue-200)
- Clear typography hierarchy
```

### 5. Result Card (Detailed)

```
┌────────────────────────────────────────────────┐
│║ ┌──────────────────────────────────────────┐ │
│║ │ 📄 Test  [Doc: 1]  [Chunk: 2]           │ │
│║ │                        🟢 Relevance: 5.23% │ │
│║ │                        📋 Copy            │ │
│║ └──────────────────────────────────────────┘ │
│║                                               │
│║ Result #1                                     │
│║                                               │
│║ ┌──────────────────────────────────────────┐ │
│║ │ [6] At approximately 2:00 p.m. on the    │ │
│║ │ same day, the Petitioner arrived at      │ │
│║ │ the Police Station accompanied by the    │ │
│║ │ said Attorney...                         │ │
│║ │ [Full case text...]                      │ │
│║ └──────────────────────────────────────────┘ │
└────────────────────────────────────────────────┘

Components:
- Blue left border (4px)
- Badge row: Title, Doc ID, Chunk ID
- Relevance score badge (color-coded)
- Copy button with icon
- Gray text box with case content
- Hover shadow effect
```

## 🎨 Color Palette

### Primary Colors

```
Blue-50:  #EFF6FF  (Light backgrounds)
Blue-100: #DBEAFE  (Cards, accents)
Blue-200: #BFDBFE  (Borders)
Blue-500: #3B82F6  (Interactive elements)
Blue-600: #2563EB  (Buttons, primary actions)
Blue-700: #1D4ED8  (Hover states)
Blue-800: #1E40AF  (Headers, emphasis)
```

### Semantic Colors

```
Green-50:  #F0FDF4  (High relevance background)
Green-200: #BBF7D0  (High relevance border)
Green-600: #16A34A  (High relevance text)

Yellow-50:  #FEFCE8  (Medium relevance background)
Yellow-200: #FEF08A  (Medium relevance border)
Yellow-600: #CA8A04  (Medium relevance text)

Orange-50:  #FFF7ED  (Low relevance background)
Orange-200: #FED7AA  (Low relevance border)
Orange-600: #EA580C  (Low relevance text)

Red-50:  #FEF2F2  (Error background)
Red-200: #FECACA  (Error border)
Red-700: #B91C1C  (Error text)
```

### Neutral Colors

```
Gray-50:  #F9FAFB  (Light backgrounds)
Gray-100: #F3F4F6  (Card backgrounds)
Gray-200: #E5E7EB  (Borders)
Gray-600: #4B5563  (Secondary text)
Gray-700: #374151  (Primary text)
Gray-800: #1F2937  (Emphasis text)
```

## 📐 Spacing & Sizing

### Container Spacing

```
max-w-7xl      - Maximum width for main container
mx-auto        - Center alignment
space-y-6      - Vertical spacing between sections
```

### Card Padding

```
p-6            - Standard card padding
pt-6           - Top padding for card content
gap-3          - Gap between flex items
gap-4          - Gap between major sections
```

### Typography Scale

```
text-3xl       - Main page title (30px)
text-2xl       - Section titles (24px)
text-xl        - Card titles (20px)
text-base      - Body text (16px)
text-sm        - Metadata, descriptions (14px)
text-xs        - Badges, small text (12px)
```

### Border Radius

```
rounded-xl     - Cards, major containers (12px)
rounded-lg     - Buttons, medium elements (8px)
rounded-md     - Badges, small elements (6px)
```

## 🔤 Typography

### Font Weights

```
font-bold       - Headers, emphasis (700)
font-semibold   - Subheaders, labels (600)
font-medium     - Buttons, navigation (500)
font-normal     - Body text (400)
```

### Line Heights

```
leading-none    - Tight spacing for titles
leading-relaxed - Comfortable reading for body text
```

## 🎭 Interactive States

### Button States

```
Default:        bg-blue-600, shadow
Hover:          bg-blue-700, enhanced shadow
Disabled:       opacity-50, no pointer events
Loading:        Spinner icon, disabled
```

### Card States

```
Default:        border, shadow
Hover:          shadow-xl (enhanced)
Active:         (no special state)
```

### Input States

```
Default:        border-input, shadow-sm
Focus:          ring-1, ring-ring, outline-none
Disabled:       opacity-50, cursor-not-allowed
Error:          (shown via separate error message)
```

## 🌟 Special Effects

### Animations

```
Loader:         rotate animation (spin)
Pulse:          opacity animation (loading skeletons)
Transitions:    all, shadow, colors (150-300ms)
```

### Shadows

```
shadow-sm       - Subtle (inputs)
shadow          - Standard (cards)
shadow-lg       - Elevated (search card)
shadow-xl       - Interactive hover (result cards)
```

## 📱 Responsive Behavior

### Mobile (< 768px)

```
- Full width containers
- Single column layout
- Smaller text sizes
- Stacked buttons if needed
- Touch-friendly targets (min 44px)
```

### Tablet (768px - 1024px)

```
- Medium containers
- Flexible grid layouts
- Standard text sizes
- Side-by-side buttons
```

### Desktop (> 1024px)

```
- Max width containers (7xl = 1280px)
- Full grid layouts
- Optimal text sizes
- Hover states active
```

## 🔍 Icon Usage

### Icons by Context

```
Search functionality:    Search icon
Legal theme:            Scale icon
Results/Documentation:  BookOpen icon
Document metadata:      FileText icon
Copy action:           Copy icon
Success confirmation:   Check icon
Warnings/Errors:       AlertCircle icon
Loading:               Loader2 icon (animated)
```

### Icon Sizing

```
h-3 w-3    - Extra small (inline with text)
h-4 w-4    - Small (buttons)
h-5 w-5    - Medium (standard)
h-6 w-6    - Large (headers)
h-12 w-12  - Extra large (empty states)
```

## 📋 Component Variants

### Badge Variants

```
outline (default)  - Outlined with background
secondary          - Gray background
default            - Blue background
```

### Button Variants

```
default (primary)  - Blue background
ghost              - No background, hover effect
outline            - Border, no background
```

## ✨ Best Practices Applied

1. **Accessibility**

   - Proper color contrast ratios
   - Semantic HTML elements
   - Keyboard navigation support
   - Screen reader friendly

2. **Consistency**

   - Uniform spacing system
   - Consistent color usage
   - Standard component patterns
   - Predictable interactions

3. **User Experience**

   - Clear visual hierarchy
   - Informative feedback
   - Helpful error messages
   - Smooth transitions

4. **Performance**
   - Efficient re-renders
   - Optimized images/icons
   - Minimal DOM operations
   - Fast API responses

---

**Design System**: Tailwind CSS + shadcn/ui
**Theme**: Professional Legal (Blue-based)
**Accessibility**: WCAG 2.1 AA compliant
