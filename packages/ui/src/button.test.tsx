import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { Button, buttonVariants } from './button.jsx';

describe('Button', () => {
  it('renders a button element by default', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button.tagName).toBe('BUTTON');
  });

  it('fires onClick handler', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('renders as child element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link button</a>
      </Button>
    );
    const link = screen.getByRole('link', { name: 'Link button' });
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('applies disabled attribute', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Styled</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('has displayName "Button"', () => {
    expect(Button.displayName).toBe('Button');
  });

  it('generates expected class strings for different variants', () => {
    const defaultClasses = buttonVariants({ variant: 'default' });
    expect(defaultClasses).toContain('bg-primary');

    const destructiveClasses = buttonVariants({ variant: 'destructive' });
    expect(destructiveClasses).toContain('bg-destructive');

    const outlineClasses = buttonVariants({ variant: 'outline' });
    expect(outlineClasses).toContain('border');

    const ghostClasses = buttonVariants({ variant: 'ghost' });
    expect(ghostClasses).not.toContain('bg-primary');

    const smClasses = buttonVariants({ size: 'sm' });
    expect(smClasses).toContain('h-8');

    const lgClasses = buttonVariants({ size: 'lg' });
    expect(lgClasses).toContain('h-10');
  });
});
