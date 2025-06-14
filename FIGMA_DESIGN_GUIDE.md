# Amogh Van/Bus Services - Figma Design System Guide

## 🎨 Color Palette

### Primary Colors

```
School Bus Yellow: #F59E0B
- Hover: #D97706
- Light: #FEF3C7
- 50: #FFFBEB
- 100: #FEF3C7
- 500: #F59E0B (Primary)
- 600: #D97706

Trust Blue: #3B82F6
- Hover: #2563EB
- Light: #DBEAFE
- 50: #EFF6FF
- 100: #DBEAFE
- 500: #3B82F6 (Primary)
- 600: #2563EB

Safety Green: #22C55E
- Light: #DCFCE7
- 700: #15803D

Alert Red: #EF4444
- Light: #FEE2E2
```

### Neutral Colors

```
White: #FFFFFF
Gray 50: #F9FAFB
Gray 100: #F3F4F6
Gray 200: #E5E7EB
Gray 300: #D1D5DB
Gray 400: #9CA3AF
Gray 500: #6B7280
Gray 600: #4B5563
Gray 700: #374151
Gray 800: #1F2937
Gray 900: #111827
```

### Background Gradients

```
Main Background: Linear gradient 180° from #EFF6FF to #FFFFFF
Hero Section: Linear gradient 135° from #FFFBEB to #EFF6FF
CTA Section: Linear gradient 135° from #F59E0B to #3B82F6
```

## 📝 Typography

### Font Families

- **Primary**: Inter (Google Fonts)
- **Secondary**: Manrope (Google Fonts)

### Text Styles

```
H1 (Hero Heading):
- Font: Manrope
- Size: 60px
- Weight: 700 (Bold)
- Line Height: 64px
- Color: #111827

H2 (Section Headers):
- Font: Manrope
- Size: 36px
- Weight: 700 (Bold)
- Line Height: 40px
- Color: #111827

H3 (Card Titles):
- Font: Manrope
- Size: 24px
- Weight: 700 (Bold)
- Line Height: 28px
- Color: #111827

H4 (Sub Headers):
- Font: Inter
- Size: 18px
- Weight: 600 (Semi-bold)
- Line Height: 24px
- Color: #111827

Body Large:
- Font: Inter
- Size: 20px
- Weight: 400 (Regular)
- Line Height: 28px
- Color: #4B5563

Body Regular:
- Font: Inter
- Size: 16px
- Weight: 400 (Regular)
- Line Height: 24px
- Color: #4B5563

Body Small:
- Font: Inter
- Size: 14px
- Weight: 400 (Regular)
- Line Height: 20px
- Color: #6B7280

Caption:
- Font: Inter
- Size: 12px
- Weight: 600 (Semi-bold)
- Line Height: 16px
- Color: #6B7280
```

## 🧩 Component Specifications

### Navigation Bar

```
Height: 64px
Background: #FFFFFF
Shadow: 0 1px 2px rgba(0,0,0,0.05)
Padding: 0 32px
Max Width: 1280px
Position: Sticky top

Logo Container:
- Background: #F59E0B
- Size: 40x40px
- Border Radius: 12px
- Icon: Bus icon (24x24px) in white

Company Name:
- Font: Manrope Bold 20px
- Color: #111827
- Margin Left: 12px

Nav Links:
- Font: Inter Regular 16px
- Color: #4B5563
- Spacing: 32px between items
- Hover: #3B82F6

Primary Button:
- Background: #F59E0B
- Color: White
- Padding: 12px 24px
- Border Radius: 12px
- Font: Inter Semi-bold 16px
- Shadow: 0 10px 15px rgba(0,0,0,0.1)
```

### Hero Section

```
Background: Linear gradient 135° from #FFFBEB to #EFF6FF
Padding: 80px 32px
Max Width: 1280px
Grid: 2 columns with 48px gap

Left Column:
- Badge: Green background #DCFCE7, Green text #15803D
- Main Heading: 60px Manrope Bold
- Description: 20px Inter Regular
- Button Container: Flex row, 16px gap
- Stats Grid: 3 columns, equal width

Right Column:
- Card: White background, 32px padding
- Border Radius: 24px
- Shadow: 0 25px 50px rgba(0,0,0,0.25)
- Transform: rotate(3deg)
- Animation: Float (up/down 20px over 6s)
```

### Service Cards

```
Card Container:
- Background: #FFFFFF
- Border Radius: 12px
- Padding: 32px
- Shadow: 0 10px 15px rgba(0,0,0,0.1)
- Hover: Transform translateY(-8px), Shadow 0 25px 50px rgba(0,0,0,0.25)

Icon Container:
- Size: 64x64px
- Border Radius: 50%
- Background: Light color variants
- Icon: 32x32px

Title:
- Font: Manrope Bold 20px
- Color: #111827
- Margin: 16px 0 8px 0

Description:
- Font: Inter Regular 16px
- Color: #6B7280
- Margin Bottom: 16px

Feature List:
- Check icons: 16x16px green
- Text: Inter Regular 14px
- Color: #6B7280
- Spacing: 8px between items
```

### Buttons

#### Primary Button

```
Background: #F59E0B
Hover Background: #D97706
Color: #FFFFFF
Padding: 12px 24px
Border Radius: 12px
Font: Inter Semi-bold 16px
Shadow: 0 10px 15px rgba(0,0,0,0.1)
Hover Shadow: 0 25px 50px rgba(0,0,0,0.25)
Transition: All 200ms ease
```

#### Secondary Button

```
Background: #3B82F6
Hover Background: #2563EB
Color: #FFFFFF
Padding: 12px 24px
Border Radius: 12px
Font: Inter Semi-bold 16px
Shadow: 0 10px 15px rgba(0,0,0,0.1)
```

#### Outline Button

```
Background: Transparent
Border: 1px solid #3B82F6
Color: #3B82F6
Hover Background: #EFF6FF
Padding: 12px 24px
Border Radius: 12px
Font: Inter Semi-bold 16px
```

### Testimonial Cards

```
Background: #FFFFFF
Border Radius: 12px
Padding: 24px
Shadow: 0 10px 15px rgba(0,0,0,0.1)
Hover: Transform translateY(-8px)

Star Rating:
- Icons: 20x20px
- Color: #FBBF24 (filled)
- Margin Bottom: 16px

Quote Text:
- Font: Inter Regular 16px
- Color: #6B7280
- Margin Bottom: 16px

Author Name:
- Font: Inter Semi-bold 16px
- Color: #111827

Author Title:
- Font: Inter Regular 14px
- Color: #9CA3AF
```

## 📐 Layout Specifications

### Container Widths

```
Max Width: 1280px
Padding: 32px (desktop), 16px (mobile)
Margin: 0 auto
```

### Grid Systems

```
Hero Section: 2 columns, 48px gap
Services: 3 columns, 32px gap
Testimonials: 3 columns, 32px gap
Footer: 4 columns, 32px gap
```

### Spacing Scale

```
4px, 8px, 12px, 16px, 20px, 24px, 32px, 48px, 64px, 80px
```

### Border Radius

```
Small: 8px
Medium: 12px
Large: 24px
Full: 9999px
```

## 📱 Responsive Breakpoints

```
Mobile: 0 - 768px
- Single column layouts
- Reduced padding (16px)
- Smaller font sizes
- Stack navigation items

Tablet: 768px - 1024px
- 2 column grids
- Medium padding (24px)

Desktop: 1024px+
- Full grid layouts
- Maximum padding (32px)
- All interactive states
```

## 🎭 Animations

### Hover Effects

```
Cards: Transform translateY(-8px) over 300ms ease
Buttons: Shadow increase over 200ms ease
Links: Color change over 150ms ease
```

### Loading Animations

```
Float: translateY(0 to -20px) over 6s infinite ease-in-out
Spin: rotate(360deg) over 1s infinite linear
Pulse: opacity(1 to 0.5) over 2s infinite
```

## 📦 Asset Requirements

### Icons

- Bus icon (main logo)
- Shield, Clock, MapPin, Star, Phone, Mail, CheckCircle
- Users, Calendar, Navigation, Heart, Award, ArrowRight
- All icons should be 24x24px base size (scale as needed)

### Images

- Hero illustration/placeholder (400x300px)
- Testimonial avatars (40x40px, circular)
- Background patterns (optional)

## 🛠️ Figma Recreation Steps

1. **Set up Color Styles**: Create all color variables listed above
2. **Set up Text Styles**: Create all typography styles
3. **Create Components**:
   - Button variants (Primary, Secondary, Outline)
   - Card component with variants
   - Badge component
   - Icon set
4. **Build Layouts**:
   - Start with Navigation
   - Hero Section
   - Services Section
   - Safety Section
   - Testimonials
   - Footer
5. **Add Interactions**: Hover states for cards and buttons
6. **Create Responsive Variants**: Mobile, Tablet, Desktop
7. **Set up Auto Layout**: Use Figma's auto layout for flexible components

## 📋 Component Checklist

- [ ] Navigation Bar
- [ ] Hero Section with floating card
- [ ] Service Cards (3 variants)
- [ ] Safety Feature Grid
- [ ] Testimonial Cards
- [ ] CTA Section with gradient
- [ ] Footer with 4 columns
- [ ] Button Components (3 variants)
- [ ] Badge Component
- [ ] Form Input Components (for registration page)

This guide provides everything needed to recreate the Amogh Van/Bus Services website design in Figma with pixel-perfect accuracy.
