# AI Smart Recruiter Dashboard - Design Documentation

## Overview
A clean, modern dashboard interface with professional styling and optimal user experience.

## Layout Structure

### 1. **Sidebar (Left)**
- **Width**: 256px (w-64)
- **Background**: White
- **Border**: Right border with gray-200
- **Components**:
  - Header: "AI Smart Recruiter" (h-16, aligned with top header)
  - Navigation items with icons:
    - Dashboard (Home icon)
    - Candidates (Users icon)
    - Upload Resumes (FileText icon)
    - Reports (BarChart2 icon)
  - User profile section at bottom: "John Doe - Recruiter"

**Styling**:
- Active state: Blue background (bg-blue-50) with blue text
- Hover state: Light gray background
- Icons: 20px (h-5 w-5)
- Rounded corners on nav items (rounded-lg)
- Consistent padding and spacing

### 2. **Top Header**
- **Height**: 64px (h-16)
- **Background**: White
- **Shadow**: Subtle shadow
- **Components**:
  - Search bar (left side, max-width: 28rem)
  - Notification bell icon (right side)
  - User avatar "JD" (right side)

**Styling**:
- Search bar: Gray background, rounded-lg, border on focus
- Responsive padding: px-4 sm:px-6 lg:px-8
- Icons with hover effects

### 3. **Main Content Area**

#### KPI Cards Row
- **Layout**: 4 cards in a single row (grid-cols-4)
- **Gap**: 20px (gap-5)
- **Responsive**: 1 column on mobile, 2 on tablet, 4 on desktop

**Card Details**:
1. **Total Candidates**: 1,248 (↑12.5%)
   - Icon: Users (blue)
   - Color: bg-blue-100 text-blue-600

2. **Shortlisted**: 342 (↑8.2%)
   - Icon: UserCheck (green)
   - Color: bg-green-100 text-green-600

3. **Avg Resume Score**: 78% (↑3.2%)
   - Icon: Award (purple)
   - Color: bg-purple-100 text-purple-600

4. **Interviews Scheduled**: 24 (↓2.1%)
   - Icon: Calendar (amber)
   - Color: bg-amber-100 text-amber-600

**Card Styling**:
- Background: White
- Border: 1px solid gray-200
- Border radius: 12px (rounded-xl)
- Shadow: Soft shadow (shadow-sm)
- Hover: Increased shadow (shadow-md)
- Padding: 24px (p-6)
- Icon position: Top right
- Value: 30px font size, bold
- Change indicator: Green (up) or Red (down) with arrow

#### Charts Section
- **Layout**: 2 columns (grid-cols-2)
- **Gap**: 24px (gap-6)
- **Responsive**: 1 column on mobile, 2 on desktop

**Left Column - Bar Chart**:
- Title: "Skills vs Candidate Count"
- Height: 320px (h-80)
- 5 colorful bars:
  - React: 45 (Blue #3b82f6)
  - Python: 38 (Green #10b981)
  - AWS: 29 (Amber #f59e0b)
  - Node.js: 32 (Purple #8b5cf6)
  - SQL: 27 (Pink #ec4899)
- Rounded bar tops (radius: 8px)
- Grid lines: Horizontal only
- Tooltip: Modern with shadow

**Right Column - Pie Chart**:
- Title: "Resume Score Distribution"
- Height: 320px (h-80)
- 3 segments:
  - 80-100: 35% (Green #10b981)
  - 60-80: 45% (Blue #3b82f6)
  - 0-50: 20% (Red #ef4444)
- Labels: Percentage inside segments
- Legend: Bottom, horizontal
- Padding between segments: 2px

## Color Palette

### Primary Colors
- **Blue**: #3b82f6 (Primary actions, links)
- **Green**: #10b981 (Success, positive metrics)
- **Purple**: #8b5cf6 (Secondary highlights)
- **Amber**: #f59e0b (Warnings, attention)
- **Red**: #ef4444 (Errors, negative metrics)
- **Pink**: #ec4899 (Accent)

### Neutral Colors
- **Gray-50**: #f9fafb (Background)
- **Gray-100**: #f3f4f6 (Light backgrounds)
- **Gray-200**: #e5e7eb (Borders)
- **Gray-600**: #4b5563 (Secondary text)
- **Gray-700**: #374151 (Primary text)
- **Gray-900**: #111827 (Headings)

## Typography

### Font Family
- **Primary**: Inter (sans-serif)
- **Fallback**: System fonts

### Font Sizes
- **Headings**: 
  - H1: 24px (text-2xl)
  - H2: 18px (text-lg)
  - H3: 30px (text-3xl) for KPI values
- **Body**: 14px (text-sm)
- **Small**: 12px (text-xs)

### Font Weights
- **Bold**: 700 (font-bold)
- **Semibold**: 600 (font-semibold)
- **Medium**: 500 (font-medium)
- **Regular**: 400 (font-normal)

## Spacing & Sizing

### Container
- **Max Width**: 1280px (max-w-7xl)
- **Padding**: 
  - Mobile: 16px (px-4)
  - Tablet: 24px (px-6)
  - Desktop: 32px (px-8)
- **Vertical**: 32px (py-8)

### Component Spacing
- **Between sections**: 32px (mb-8)
- **Between cards**: 20px (gap-5)
- **Between charts**: 24px (gap-6)
- **Card padding**: 24px (p-6)

### Border Radius
- **Cards**: 12px (rounded-xl)
- **Buttons**: 8px (rounded-lg)
- **Inputs**: 8px (rounded-lg)
- **Avatars**: 9999px (rounded-full)

## Shadows

### Elevation Levels
- **Level 1** (Cards at rest): `shadow-sm`
  - `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **Level 2** (Cards on hover): `shadow-md`
  - `0 4px 6px -1px rgba(0, 0, 0, 0.1)`
- **Level 3** (Tooltips): Custom
  - `0 10px 15px -3px rgba(0, 0, 0, 0.1)`

## Responsive Breakpoints

- **Mobile**: < 768px (1 column layouts)
- **Tablet**: 768px - 1024px (2 column layouts)
- **Desktop**: > 1024px (4 column KPIs, 2 column charts)

## Accessibility

- **ARIA labels**: All interactive elements
- **Keyboard navigation**: Full support
- **Focus states**: Visible ring on all interactive elements
- **Color contrast**: WCAG AA compliant
- **Screen reader**: Semantic HTML structure

## Performance Optimizations

- **Dynamic imports**: Charts loaded client-side only
- **No SSR**: Charts rendered client-side to avoid hydration issues
- **Optimized images**: SVG icons for scalability
- **Minimal re-renders**: Memoized components where needed

## Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions
