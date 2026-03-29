'use client';
import { useState } from 'react';
import {
  CartSectionV2,
  Button,
  Payments,
  PaymentsV2,
  CartSection,
} from 'ecommerce-mxtech';
import { useRouter } from 'next/navigation';
import { FaChevronLeft } from 'react-icons/fa';
import { pageName } from '@/data';
import { useLanguage } from '@/i18n/language-provider';

const validDiscountCode = ['CAPAPAY10', 'CAPAPAY20'];
const colorRed = '#F73939';

const CartSectionComponent = () => {
  const [step, setStep] = useState('cart'); // cart | payment
  const [isValidDiscount, setIsValidDiscount] = useState(false);
  const [authError, setAuthError] = useState('');
  const router = useRouter();
  const { t } = useLanguage();

  const onChangeDiscount = (value) => {
    setIsValidDiscount(validDiscountCode.includes(value));
  };

  const handleGoToPayment = () => {
    const storedUser =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('lexer:auth-user')
        : null;

    if (!storedUser) {
      setAuthError(t('cart.authRequired'));
      router.push('/access?redirect=/my-cart?step=payment');
      return;
    }

    setAuthError('');
    setStep('payment');
  };

  return (
    <div className='w-full flex justify-center mt-10 mb-20'>
      <div className='container px-4'>
        <Button
          value={t('cart.back')}
          type='default'
          onClick={() => {
            if (step === 'payment') {
              setStep('cart');
              return;
            }
            router.push('/#products');
          }}
          icon={<FaChevronLeft />}
          iconPosition='start'
          className='flex items-center mb-5 w-28'
        >
          {t('cart.back')}
        </Button>
        <div className='flex flex-col gap-5'>
          {authError && <p className='text-sm text-destructive'>{authError}</p>}

          {step === 'cart' && (
            <CartSectionV2
              variant='table'
              gridColumns={1}
              withDetails
              inputProps={{
                onInput: (e) => onChangeDiscount(e.target.value),
              }}
              isValidDiscountCode={isValidDiscount}
              totalDiscount={isValidDiscount ? 10 : 0}
              buttonCheckoutProps={{
                onClick: handleGoToPayment,
                label: t('cart.goToPay'),
                className: 'bg-red-400 text-white w-full',
                style: {
                  color: 'white',
                  backgroundColor: colorRed,
                },
              }}
            />
          )}

          {step === 'payment' && (
            <PaymentsV2
              pageName={pageName}
              withCardPay
              isValidDiscountCode={isValidDiscount}
              handleChangeDiscountCode={onChangeDiscount}
              buttonBuyMoreProps={{
                label: t('cart.buyMore'),
                onClick: () => router.push('/#products'),
              }}
              buttonGoHomeProps={{
                label: t('cart.goHome'),
                onClick: () => router.push('/'),
              }}
              totalDiscount={isValidDiscount ? 10 : 0}
              buttonBackProps={{
                className: 'text-black',
                label: t('cart.back'),
              }}
              buttonNextProps={{
                className: 'bg-red-500 text-white',
                style: {
                  color: 'white',
                  backgroundColor: colorRed,
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSectionComponent;
