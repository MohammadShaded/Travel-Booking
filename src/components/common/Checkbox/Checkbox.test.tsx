import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox label="Accept terms" checked={false} onChange={() => {}} />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('renders checked state', () => {
    render(<Checkbox label="Checked" checked={true} onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('renders unchecked state', () => {
    render(<Checkbox label="Unchecked" checked={false} onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('calls onChange when clicked', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    
    render(<Checkbox label="Click me" checked={false} onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('calls onChange with false when unchecking', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    
    render(<Checkbox label="Uncheck me" checked={true} onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it('renders disabled state', () => {
    render(<Checkbox label="Disabled" checked={false} onChange={() => {}} disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('does not call onChange when disabled', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    
    render(<Checkbox label="Disabled" checked={false} onChange={handleChange} disabled />);
    
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Checkbox label="Custom" checked={false} onChange={() => {}} className="custom-class" />
    );
    const label = container.firstChild as HTMLElement;
    expect(label.className).toContain('custom-class');
  });

  it('applies name attribute', () => {
    render(<Checkbox label="Named" checked={false} onChange={() => {}} name="terms" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('name', 'terms');
  });

  it('can be clicked via label', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    
    render(<Checkbox label="Click label" checked={false} onChange={handleChange} />);
    
    await user.click(screen.getByText('Click label'));
    
    expect(handleChange).toHaveBeenCalledWith(true);
  });
});
