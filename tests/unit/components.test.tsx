import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../setup/testUtils';
import { GenericForm, GenericFormField } from '../../components/generic/GenericForm';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';
import { ErrorDisplay } from '../../components/shared/ErrorDisplay';

describe('GenericForm', () => {
  const mockSubmit = vi.fn();
  const mockCancel = vi.fn();

  const fields: GenericFormField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'active', label: 'Active', type: 'checkbox' },
  ];

  beforeEach(() => {
    mockSubmit.mockClear();
    mockCancel.mockClear();
  });

  it('should render all fields', () => {
    render(
      <GenericForm
        fields={fields}
        onSubmit={mockSubmit}
        onCancel={mockCancel}
      />
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/active/i)).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    mockSubmit.mockResolvedValueOnce(undefined);

    render(
      <GenericForm
        fields={fields}
        onSubmit={mockSubmit}
        onCancel={mockCancel}
      />
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.click(screen.getByLabelText(/active/i));

    fireEvent.click(screen.getByText(/submit/i));

    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      active: true,
    });
  });

  it('should display error on submission failure', async () => {
    const error = new Error('Submission failed');
    mockSubmit.mockRejectedValueOnce(error);

    render(
      <GenericForm
        fields={fields}
        onSubmit={mockSubmit}
        onCancel={mockCancel}
      />
    );

    fireEvent.click(screen.getByText(/submit/i));

    expect(await screen.findByText(/submission failed/i)).toBeInTheDocument();
  });
});

describe('LoadingSpinner', () => {
  it('should render with default size', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('status', { hidden: true });
    expect(spinner).toHaveClass('w-8', 'h-8');
  });

  it('should render with custom size', () => {
    render(<LoadingSpinner size="sm" />);
    const spinner = screen.getByRole('status', { hidden: true });
    expect(spinner).toHaveClass('w-4', 'h-4');
  });
});

describe('ErrorDisplay', () => {
  it('should display error message', () => {
    render(<ErrorDisplay error="Something went wrong" />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('should display error object message', () => {
    const error = new Error('Test error');
    render(<ErrorDisplay error={error} />);
    expect(screen.getByText(/test error/i)).toBeInTheDocument();
  });

  it('should call onRetry when retry button is clicked', () => {
    const mockRetry = vi.fn();
    render(<ErrorDisplay error="Error" onRetry={mockRetry} />);
    
    fireEvent.click(screen.getByText(/retry/i));
    expect(mockRetry).toHaveBeenCalled();
  });
});