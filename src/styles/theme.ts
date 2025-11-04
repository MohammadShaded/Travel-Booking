/**
 * Design System - TypeScript Theme Constants
 * Use these constants in TypeScript/React components
 */

export const colors = {
    // Primary Colors - Dark Ocean Gradient
    primary: {
        dark: '#0f2027',
        mid: '#203a43',
        light: '#2c5364',
    },

    // Accent Colors
    accent: {
        cyan: '#00d4ff',
        blue: '#3f5efb',
        pink: '#fc466b',
    },

    // Gradients
    gradients: {
        primary: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        button: 'linear-gradient(135deg, #2c5364 0%, #0f2027 100%)',
        danger: 'linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)',
        text: 'linear-gradient(135deg, #fff 0%, #00d4ff 100%)',
        background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
    },

    // Text Colors
    text: {
        primary: '#1a202c',
        secondary: '#2d3748',
        tertiary: '#718096',
        light: '#a0aec0',
        white: '#ffffff',
    },

    // Background Colors
    background: {
        white: '#ffffff',
        light: '#f7fafc',
        lighter: '#edf2f7',
        gray: '#e2e8f0',
    },

    // Border Colors
    border: {
        light: '#e2e8f0',
        medium: '#cbd5e1',
        dark: '#94a3b8',
    },

    // Status Colors
    status: {
        success: '#48bb78',
        successLight: '#c6f6d5',
        error: '#e53e3e',
        errorLight: '#fc8181',
        errorBg: '#fff5f5',
        warning: '#ed8936',
        info: '#4299e1',
    },
} as const;

export const typography = {
    // Font Families
    fontFamily: {
        primary:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
    },

    // Font Sizes
    fontSize: {
        xs: '12px',
        sm: '13px',
        base: '14px',
        md: '15px',
        lg: '16px',
        xl: '18px',
        '2xl': '24px',
        '3xl': '28px',
        '4xl': '32px',
        '5xl': '36px',
        '6xl': '48px',
    },

    // Font Weights
    fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
    },

    // Line Heights
    lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.6,
        loose: 2,
    },

    // Letter Spacing
    letterSpacing: {
        tight: '-0.5px',
        normal: '0',
        wide: '0.2px',
        wider: '0.3px',
    },
} as const;

export const spacing = {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '40px',
    '5xl': '48px',
    '6xl': '60px',
} as const;

export const borderRadius = {
    sm: '6px',
    md: '8px',
    lg: '10px',
    xl: '12px',
    '2xl': '14px',
    '3xl': '16px',
    round: '50%',
} as const;

export const shadows = {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.15)',

    // Button Shadows
    button: {
        primary: '0 4px 12px rgba(44, 83, 100, 0.3)',
        primaryHover: '0 6px 20px rgba(44, 83, 100, 0.4)',
        danger: '0 4px 12px rgba(252, 70, 107, 0.3)',
        dangerHover: '0 6px 20px rgba(252, 70, 107, 0.4)',
    },

    // Focus Shadows
    focus: {
        primary: '0 0 0 4px rgba(44, 83, 100, 0.1)',
        error: '0 0 0 4px rgba(245, 101, 101, 0.1)',
    },
} as const;

export const transitions = {
    fast: '0.15s ease',
    base: '0.2s ease',
    slow: '0.3s ease',
    smooth: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export const zIndex = {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
} as const;

export const breakpoints = {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
} as const;

// Export default theme object
export const theme = {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
    transitions,
    zIndex,
    breakpoints,
} as const;

export default theme;

// Type exports for TypeScript usage
export type Theme = typeof theme;
export type Colors = typeof colors;
export type Typography = typeof typography;
export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type Shadows = typeof shadows;
export type Transitions = typeof transitions;
export type ZIndex = typeof zIndex;
export type Breakpoints = typeof breakpoints;
