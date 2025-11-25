import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FaUser, FaCreditCard, FaClipboardList } from 'react-icons/fa';
import { createBooking } from '@/api/bookingService';
import type { BookingRequest } from '@/types';
import PersonalDetailsForm from './components/PersonalDetailsForm';
import PaymentMethodForm from './components/PaymentMethodForm';
import SpecialRequestsForm from './components/SpecialRequestsForm';
import ReviewSection from './components/ReviewSection';
import BookingSummary from './components/BookingSummary';
import Button from '@/components/common/Button';
import styles from './Checkout.module.css';
import type { CheckoutLocationState, CheckoutFormData } from '@/types';

const checkoutValidationSchema = yup.object({
  customerName: yup.string().required('Name is required').trim(),
  customerEmail: yup
    .string()
    .required('Email is required')
    .email('Invalid email format')
    .trim(),
  customerPhone: yup.string().required('Phone number is required').trim(),
  paymentMethod: yup.string().required('Payment method is required'),
  specialRequests: yup.string(),
});

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state as CheckoutLocationState | undefined;

  const [currentStep, setCurrentStep] = useState(1);

  const formik = useFormik<CheckoutFormData>({
    initialValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      paymentMethod: 'creditCard',
      specialRequests: '',
    },
    validationSchema: checkoutValidationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      if (!bookingData) return;

      const bookingRequest: BookingRequest = {
        customerName: values.customerName,
        hotelName: bookingData.hotelName,
        roomNumber: bookingData.roomNumber,
        roomType: bookingData.roomType,
        checkInDate: bookingData.checkInDate,
        checkOutDate: bookingData.checkOutDate,
        totalCost: bookingData.totalCost,
        paymentMethod: values.paymentMethod,
      };

      bookingMutation.mutate(bookingRequest);
    },
  });

  const steps = [
    { number: 1, title: 'Personal Details', icon: FaUser },
    { number: 2, title: 'Payment Method', icon: FaCreditCard },
    { number: 3, title: 'Review & Confirm', icon: FaClipboardList },
  ];

  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: (data) => {
      navigate(`/confirmation/${data.confirmationNumber ? data.confirmationNumber : '1'}`, {
        state: data,
      });
    },
    onError: () => {
      alert('Booking failed. Please try again.');
    },
  });

  // Redirect if no booking data
  if (!bookingData) {
    navigate('/');
    return null;
  }

  const validateCurrentStep = async (): Promise<boolean> => {
    const errors = await formik.validateForm();
    
    // Mark relevant fields as touched based on current step
    const touchedFields: Partial<Record<keyof CheckoutFormData, boolean>> = {};
    
    if (currentStep === 1) {
      touchedFields.customerName = true;
      touchedFields.customerEmail = true;
      touchedFields.customerPhone = true;
    } else if (currentStep === 2) {
      touchedFields.paymentMethod = true;
    } else if (currentStep === 3) {
      // Mark all fields as touched for final review
      touchedFields.customerName = true;
      touchedFields.customerEmail = true;
      touchedFields.customerPhone = true;
      touchedFields.paymentMethod = true;
    }
    
    formik.setTouched(touchedFields as Record<keyof CheckoutFormData, boolean>);
    
    // Check if there are errors in the current step's fields
    const hasErrors = Object.keys(touchedFields).some((field) => 
      errors[field as keyof CheckoutFormData]
    );
    
    return !hasErrors;
  };

  const handleNext = async () => {
    if (await validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission is handled by Formik
  };

  const handleConfirmBooking = async () => {
    // Validate all fields before final submission
    const errors = await formik.validateForm();
    
    // Mark all fields as touched
    formik.setTouched({
      customerName: true,
      customerEmail: true,
      customerPhone: true,
      paymentMethod: true,
      specialRequests: true,
    });
    
    // If no errors, submit the form
    if (Object.keys(errors).length === 0) {
      formik.submitForm();
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header with lock icon */}
        <div className={styles.headerSection}>
          <h1 className={styles.title}>Complete Your Booking</h1>
          <p className={styles.subtitle}>Fill in your details to confirm your reservation</p>
        </div>

        {/* Progress Steps */}
        <div className={styles.progressSteps}>
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = currentStep >= step.number;
            const isCurrent = currentStep === step.number;

            return (
              <div key={step.number} className={styles.stepWrapper}>
                <div
                  className={`${styles.step} ${
                    isActive ? styles.stepActive : ''
                  } ${isCurrent ? styles.stepCurrent : ''}`}
                >
                  <div className={styles.stepIcon}>
                    <StepIcon />
                  </div>
                  <span className={styles.stepTitle}>{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`${styles.stepLine} ${
                      currentStep > step.number ? styles.stepLineActive : ''
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.layout}>
          <div className={styles.formSection}>
            <form onSubmit={handleSubmit} className={styles.form}>
              {currentStep === 1 && (
                <PersonalDetailsForm
                  formData={formik.values}
                  errors={formik.errors}
                  onChange={(field: keyof CheckoutFormData, value: string) =>
                    formik.setFieldValue(field, value)
                  }
                />
              )}

              {currentStep === 2 && (
                <PaymentMethodForm
                  selectedMethod={formik.values.paymentMethod}
                  error={formik.errors.paymentMethod}
                  onChange={(method: string) =>
                    formik.setFieldValue('paymentMethod', method)
                  }
                />
              )}

              {currentStep === 3 && (
                <>
                  <ReviewSection formData={formik.values} />

                  <SpecialRequestsForm
                    value={formik.values.specialRequests || ''}
                    onChange={(value: string) =>
                      formik.setFieldValue('specialRequests', value)
                    }
                  />
                </>
              )}

              <div className={styles.actions}>
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleBack}
                    disabled={bookingMutation.isPending}
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCancel}
                  disabled={bookingMutation.isPending}
                >
                  Cancel
                </Button>
                {currentStep < 3 ? (
                  <Button type="button" variant="primary" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="primary"
                    disabled={bookingMutation.isPending}
                    onClick={handleConfirmBooking}
                  >
                    {bookingMutation.isPending ? 'Processing...' : 'Confirm Booking'}
                  </Button>
                )}
              </div>
            </form>
          </div>

          <div className={styles.summarySection}>
            <BookingSummary bookingData={bookingData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
