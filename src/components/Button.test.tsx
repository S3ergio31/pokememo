import { render, screen, fireEvent } from '@testing-library/react';
import Button from 'components/Button';

describe('Button', () => {
    it('renders its children as label', () => {
        render(<Button>Play</Button>);
        expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const onClick = vi.fn();
        render(<Button onClick={onClick}>Click me</Button>);
        fireEvent.click(screen.getByRole('button'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not throw when clicked without an onClick prop', () => {
        render(<Button>Safe</Button>);
        expect(() => fireEvent.click(screen.getByRole('button'))).not.toThrow();
    });
});
