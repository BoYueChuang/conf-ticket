import { useCallback } from 'react';
import { PaymentData, PaymentReadyState } from '../types/payment';
import { SUPPORTED_NETWORKS } from '../constants/payment';

declare global {
  interface Window {
    TPDirect: any;
  }
}

export const usePaymentMethods = (
  paymentData: PaymentData,
  updatePaymentReady: (updates: Partial<PaymentReadyState>) => void,
  setPaymentStatus: (status: 'form' | 'success' | 'false') => void
) => {
  const processPayment = useCallback(
    async (prime: string, lastFour: string, amount: number) => {
      try {
        console.log('✅ 付款中');

        const response = await fetch(
          'https://confgive.thehope.app/api/payment',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              prime,
              amount,
              cardholder: {
                last_four: lastFour,
                name: 'sss',
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `HTTP Error: ${response.status} ${response.statusText}`
          );
        }

        const result = await response.json();

        if (result.status === 0) {
          console.log('✅ 付款成功');
          setPaymentStatus('success');
          return { success: true, data: result };
        } else {
          console.log('❌ 付款失敗:', result);
          setPaymentStatus('false');
          return { success: false, error: result.message || '付款失敗' };
        }
      } catch (error) {
        console.log('❌ 錯誤：', error);
        setPaymentStatus('false');
        return { success: false, error };
      }
    },
    [setPaymentStatus]
  );

  const setupGooglePay = useCallback(() => {
    if (!paymentData) return;

    updatePaymentReady({ isGooglePayReady: true });

    const paymentRequest = {
      allowedNetworks: SUPPORTED_NETWORKS.COMMON,
      price: paymentData.summary.totalAmount.toString(),
      currency: 'TWD',
    };

    window.TPDirect.googlePay.setupPaymentRequest(
      paymentRequest,
      function (err: any, result: any) {
        if (err) {
          console.error('Google Pay setup error:', err);
          return;
        }

        if (result.canUseGooglePay) {
          window.TPDirect.googlePay.getPrime(function (err: any, prime: any) {
            if (err) {
              console.error('Google Pay getPrime error:', err);
              alert('此裝置不支援 Google Pay');
              setPaymentStatus('false');
              return;
            }
            processPayment(prime, '', paymentData.summary.totalAmount).catch(
              error => {
                console.error('Google Pay processPayment error:', error);
              }
            );
          });
        }
      }
    );
  }, [paymentData, updatePaymentReady, processPayment, setPaymentStatus]);

  const setupApplePay = useCallback(async () => {
    if (!paymentData) return;

    updatePaymentReady({ isApplePayReady: true });

    const paymentRequest = {
      supportedNetworks: SUPPORTED_NETWORKS.COMMON,
      supportedMethods: ['apple_pay'],
      displayItems: [
        {
          label: 'TapPay',
          amount: {
            currency: 'TWD',
            value: paymentData.summary.totalAmount.toString(),
          },
        },
      ],
      total: {
        label: '付給 TapPay',
        amount: {
          currency: 'TWD',
          value: paymentData.summary.totalAmount.toString(),
        },
      },
    };

    const result: {
      browserSupportPaymentRequest: boolean;
      canMakePaymentWithActiveCard: boolean;
    } = await new Promise(resolve => {
      window.TPDirect.paymentRequestApi.setupPaymentRequest(
        paymentRequest,
        resolve
      );
    });

    if (!result.browserSupportPaymentRequest) {
      updatePaymentReady({ isApplePayReady: false });
      alert('此裝置不支援 Apple Pay');
      return;
    }

    if (!result.canMakePaymentWithActiveCard) {
      updatePaymentReady({ isApplePayReady: false });
      alert('此裝置沒有支援的卡片可以付款');
      return;
    }

    setTimeout(() => {
      const button = document.querySelector('#apple-pay-button-container');
      if (button) {
        button.innerHTML = '';
        window.TPDirect.paymentRequestApi.setupTappayPaymentButton(
          '#apple-pay-button-container',
          (getPrimeResult: any) => {
            processPayment(
              getPrimeResult.prime,
              getPrimeResult.card.lastfour,
              paymentData.summary.totalAmount
            ).catch(error => {
              console.error('Apple Pay processPayment error:', error);
            });
          }
        );
      }
    }, 100);
  }, [paymentData, updatePaymentReady, processPayment, setPaymentStatus]);

  const setupSamsungPay = useCallback(() => {
    if (!paymentData) return;

    updatePaymentReady({ isSamsungPayReady: true });

    const paymentRequest = {
      supportedNetworks: SUPPORTED_NETWORKS.SAMSUNG_LIMITED,
      total: {
        label: 'The Hope',
        amount: {
          currency: 'TWD',
          value: paymentData.summary.totalAmount.toString(),
        },
      },
    };

    window.TPDirect.samsungPay.setupPaymentRequest(paymentRequest);
    window.TPDirect.samsungPay.getPrime(function (result: any) {
      if (result.status !== 0) {
        console.error('Samsung Pay error:', result);
        alert('此裝置不支援 Samsung Pay');
        setPaymentStatus('false');
        return;
      }

      processPayment(
        result.prime,
        result.card.lastfour,
        paymentData.summary.totalAmount
      ).catch(error => {
        console.error('Samsung Pay processPayment error:', error);
      });
    });
  }, [paymentData, updatePaymentReady, processPayment, setPaymentStatus]);

  return {
    setupGooglePay,
    setupApplePay,
    setupSamsungPay,
  };
};
