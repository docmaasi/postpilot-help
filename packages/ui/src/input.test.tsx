import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { Input } from './input.jsx';

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text').tagName).toBe('INPUT');
  });

  it('passes type prop', () => {
    render(<Input type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('applies disabled attribute', () => {
    render(<Input disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
  });

  it('has displayName "Input"', () => {
    expect(Input.displayName).toBe('Input');
  });
});
