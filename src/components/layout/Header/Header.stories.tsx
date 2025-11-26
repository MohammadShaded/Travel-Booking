import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Navigation Header Component**

A sticky header with logo, navigation links, and profile menu. Features:
- Sticky positioning (stays visible on scroll)
- Active route highlighting
- Logo links to home page
- ProfileMenu with currency, help, and user actions
- Responsive design ready
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default header view on home page
 */
export const Default: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <div>
          <Story />
          <div style={{ padding: '2rem', minHeight: '40vh', background: '#f8f9fa' }}>
            <h2>Page Content Below Header</h2>
            <p>The header stays fixed at the top as you scroll.</p>
          </div>
        </div>
      </MemoryRouter>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Default header state with Home link active (highlighted).',
      },
    },
  },
};



/**
 * Demonstrates sticky scroll behavior
 */
export const StickyScrollBehavior: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/hotels']}>
        <div>
          <Story />
          <div style={{ padding: '2rem', background: 'linear-gradient(to bottom, #f8f9fa, #e8eef3)' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Scroll Down ⬇️</h1>
            <p style={{ fontSize: '1.125rem', marginBottom: '2rem' }}>
              The header will stay fixed at the top as you scroll through this content.
            </p>
            
            {/* Generate lots of content to enable scrolling */}
            {Array.from({ length: 15 }).map((_, i) => (
              <div 
                key={i} 
                style={{
                  padding: '1.5rem',
                  marginBottom: '1rem',
                  background: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}
              >
                <h3 style={{ marginTop: 0, color: '#1a202c' }}>Content Block {i + 1}</h3>
                <p style={{ margin: 0, color: '#666' }}>
                  This is sample content to demonstrate the sticky header behavior. 
                  Keep scrolling to see how the header remains visible at the top of the viewport.
                </p>
              </div>
            ))}
          </div>
        </div>
      </MemoryRouter>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the sticky positioning - scroll down to see the header stay at the top.',
      },
    },
  },
};

