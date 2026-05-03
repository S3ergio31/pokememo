import { render, screen } from '@testing-library/react';
import Body from 'components/Body';

describe('Body', () => {
    it('renders its children', () => {
        render(<Body><span>content</span></Body>);
        expect(screen.getByText('content')).toBeInTheDocument();
    });

    it('wraps children in a div with class "body"', () => {
        const { container } = render(<Body><span /></Body>);
        expect(container.firstChild).toHaveClass('body');
    });
});
