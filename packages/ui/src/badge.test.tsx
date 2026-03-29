import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './badge.jsx';

describe('Badge', () => {
  it('renders with text content', () => {
    render(<Badge>Status</Badge>);
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Badge className="custom-badge">Tag</Badge>);
    expect(screen.getByText('Tag')).toHaveClass('custom-badge');
  });

  it('renders as a div element', () => {
    render(<Badge>Info</Badge>);
    expect(screen.getByText('Info').tagName).toBe('DIV');
  });
});
