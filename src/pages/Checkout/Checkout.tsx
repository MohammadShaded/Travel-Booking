import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
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

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state as CheckoutLocationState | undefined;

  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    paymentMethod: 'creditCard',
    specialRequests: '',
  });

  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { number: 1, title: 'Personal Details', icon: FaUser },
    { number: 2, title: 'Payment Method', icon: FaCreditCard },
    { number: 3, title: 'Review & Confirm', icon: FaClipboardList },
  ];

  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: (data) => {
      navigate(`/confirmation/${data.confirmationNumber}`, {
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

  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutFormData> = {};

    if (currentStep === 1 || currentStep === 3) {
      if (!formData.customerName.trim()) {
        newErrors.customerName = 'Name is required';
      }

      if (!formData.customerEmail.trim()) {
        newErrors.customerEmail = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
        newErrors.customerEmail = 'Invalid email format';
      }

      if (!formData.customerPhone.trim()) {
        newErrors.customerPhone = 'Phone number is required';
      }
    }

    if (currentStep === 2 || currentStep === 3) {
      if (!formData.paymentMethod) {
        newErrors.paymentMethod = 'Payment method is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleConfirmBooking = async () => {
    if (!validateForm()) {
      return;
    }

    const bookingRequest: BookingRequest = {
      customerName: formData.customerName,
      hotelName: bookingData.hotelName,
      roomNumber: bookingData.roomNumber,
      roomType: bookingData.roomType,
      checkInDate: bookingData.checkInDate,
      checkOutDate: bookingData.checkOutDate,
      totalCost: bookingData.totalCost,
      paymentMethod: formData.paymentMethod,
    };

    bookingMutation.mutate(bookingRequest);
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
                  formData={formData}
                  errors={errors}
                  onChange={(field: keyof CheckoutFormData, value: string) =>
                    setFormData((prev) => ({ ...prev, [field]: value }))
                  }
                />
              )}

              {currentStep === 2 && (
                <PaymentMethodForm
                  selectedMethod={formData.paymentMethod}
                  error={errors.paymentMethod}
                  onChange={(method: string) =>
                    setFormData((prev) => ({ ...prev, paymentMethod: method }))
                  }
                />
              )}

              {currentStep === 3 && (
                <>
                  <ReviewSection formData={formData} />

                  <SpecialRequestsForm
                    value={formData.specialRequests || ''}
                    onChange={(value: string) =>
                      setFormData((prev) => ({ ...prev, specialRequests: value }))
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
