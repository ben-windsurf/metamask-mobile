import { useState, useCallback } from 'react';

interface UseFormOptions<T> {
  initialFormData: T;
  validateForm: (data: T) => Record<string, string>;
}

interface UseFormReturn<T> {
  formData: T;
  errors: Record<string, string>;
  handleChange: (field: keyof T, value: string) => void;
  validateFormData: () => boolean;
}

/**
 * Custom hook for managing form state, validation, and user interactions
 * Provides form data management with real-time validation and error handling
 * @param options - Configuration options for the form hook
 * @param options.initialFormData - Initial data for the form fields
 * @param options.validateForm - Function to validate form data and return errors
 * @returns Object containing form state and handlers for form interactions
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useForm = <T extends Record<string, any>>({
  initialFormData,
  validateForm,
}: UseFormOptions<T>): UseFormReturn<T> => {
  const [formData, setFormData] = useState<T>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = useCallback(
    (field: keyof T, value: string) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));

      // Clear the error for this field when user starts typing
      if (errors[field as string]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: '',
        }));
      }
    },
    [errors],
  );

  const validateFormData = useCallback((): boolean => {
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateForm]);

  return {
    formData,
    errors,
    handleChange,
    validateFormData,
  };
};
