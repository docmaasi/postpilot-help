import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from './label.jsx';

describe('Label', () => {
  it('renders with text content', () => {
    render(<Label>Username</Label>);
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Label className="custom-label">Email</Label>);
    expect(screen.getByText('Email')).toHaveClass('custom-label');
  });
});
