import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from 'components/Modal';

// Modal uses ReactDOM.createPortal targeting #root
let root;
beforeEach(() => {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
});
afterEach(() => root.remove());

describe('Modal', () => {
    describe('visibility', () => {
        it('renders nothing when show=false', () => {
            render(<Modal show={false} title="Hidden" />);
            expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
        });

        it('renders the modal when show=true', () => {
            render(<Modal show={true} title="Hello" />);
            expect(screen.getByText('Hello')).toBeInTheDocument();
        });

        it('becomes visible when show transitions from false to true', () => {
            const { rerender } = render(<Modal show={false} title="Delayed" />);
            expect(screen.queryByText('Delayed')).not.toBeInTheDocument();

            rerender(<Modal show={true} title="Delayed" />);
            expect(screen.getByText('Delayed')).toBeInTheDocument();
        });
    });

    describe('content', () => {
        it('renders children inside the modal body', () => {
            render(<Modal show={true} title="T"><p>body text</p></Modal>);
            expect(screen.getByText('body text')).toBeInTheDocument();
        });
    });

    describe('closing', () => {
        it('calls onAccept and hides the modal when the X button is clicked', () => {
            const onAccept = vi.fn();
            render(<Modal show={true} title="Close me" onAccept={onAccept} />);

            fireEvent.click(screen.getByText('X'));

            expect(onAccept).toHaveBeenCalledTimes(1);
            expect(screen.queryByText('Close me')).not.toBeInTheDocument();
        });

        it('calls onAccept and hides the modal when the Accept button is clicked', () => {
            const onAccept = vi.fn();
            render(<Modal show={true} title="Accept me" onAccept={onAccept} />);

            fireEvent.click(screen.getByText('Accept'));

            expect(onAccept).toHaveBeenCalledTimes(1);
            expect(screen.queryByText('Accept me')).not.toBeInTheDocument();
        });
    });
});
