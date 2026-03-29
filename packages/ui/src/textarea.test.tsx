import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { Textarea } from './textarea.jsx';

describe('Textarea', () => {
  it('renders a textarea element', () => {
    render(<Textarea placeholder="Write here" />);
    expect(screen.getByPlaceholderText('Write here').tagName).toBe('TEXTAREA');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('handles onChange', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<Textarea onChange={handleChange} placeholder="Type" />);
    await user.type(screen.getByPlaceholderText('Type'), 'hello');
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies disabled attribute', () => {
    render(<Textarea disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
  });
});
