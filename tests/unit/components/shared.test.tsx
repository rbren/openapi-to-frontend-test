import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoadingSpinner } from '../../../components/shared/LoadingSpinner';
import { ErrorDisplay } from '../../../components/shared/ErrorDisplay';
import { Pagination } from '../../../components/shared/Pagination';

describe('LoadingSpinner', () => {
  it('should render with default size', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('status', { hidden: true });
    expect(spinner).toBeInTheDocument();
  });

  it('should render with custom size', () => {
    render(<LoadingSpinner size="lg" />);
    const spinner = screen.getByRole('status', { hidden: true });
    expect(spinner).toHaveClass('w-12', 'h-12');
  });

  it('should apply custom className', () => {
    render(<LoadingSpinner className="custom-class" />);
    const container = screen.getByRole('status', { hidden: true }).parentElement;
    expect(container).toHaveClass('custom-class');
  });
});

describe('ErrorDisplay', () => {
  it('should display error message', () => {
    render(<ErrorDisplay error="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('should display Error object message', () => {
    const error = new Error('Test error');
    render(<ErrorDisplay error={error} />);
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('should show retry button when onRetry is provided', () => {
    const onRetry = vi.fn();
    render(<ErrorDisplay error="Error" onRetry={onRetry} />);
    
    const retryButton = screen.getByText('Try again');
    expect(retryButton).toBeInTheDocument();
    
    fireEvent.click(retryButton);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('should not show retry button when onRetry is not provided', () => {
    render(<ErrorDisplay error="Error" />);
    expect(screen.queryByText('Try again')).not.toBeInTheDocument();
  });
});

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    onPageChange: vi.fn(),
  };

  beforeEach(() => {
    defaultProps.onPageChange.mockClear();
  });

  it('should render page info', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText('Page')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should disable Previous button on first page', () => {
    render(<Pagination {...defaultProps} />);
    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  it('should disable Next button on last page', () => {
    render(<Pagination {...defaultProps} currentPage={5} />);
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('should call onPageChange when clicking Next', () => {
    render(<Pagination {...defaultProps} />);
    const nextButton = screen.getByText('Next');
    
    fireEvent.click(nextButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange when clicking Previous', () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    const prevButton = screen.getByText('Previous');
    
    fireEvent.click(prevButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange when clicking page number', () => {
    render(<Pagination {...defaultProps} />);
    const pageButton = screen.getByRole('button', { name: '3' });
    
    fireEvent.click(pageButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(3);
  });
});