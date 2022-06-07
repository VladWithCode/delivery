import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../../context/Cart/CartContext';
import OrderContext from '../../context/Order/OrderContext';
import ToastContext from '../../context/Toast/ToastContext';
import CartService from '../../services/CartService';
import SaleService from '../../services/SaleService';

function CashPayment() {
  const { customerInfo, setCheckoutStep } = useContext(OrderContext);
  const { displaySuccessToast, displayErrorToast } = useContext(ToastContext);
  const { resetCart, subtotal, tax, shipment, items } = useContext(CartContext);
  const navigate = useNavigate();

  const handleGoBackClick = () => {
    setCheckoutStep('PAYMENT_METHOD_SELECTION');
  };

  const handleConfirmClick = async () => {
    const saveRes = await SaleService.saveCashSale({
      cart: {
        subtotal,
        tax,
        shipment,
        items,
      },
      customer: customerInfo,
    });

    if (saveRes.status !== 'OK') {
      displayErrorToast(
        saveRes.message ||
          'Ocurrio un error en el servidor. Su orden ha sido cancela'
      );
      return;
    }

    const resetRes = await CartService.resetCart();

    if (resetRes.status !== 'OK')
      console.error(resetRes.error || resetRes.message);

    resetCart();
    displaySuccessToast('Pago exitoso. ¡Su orden esta en camino!');
    navigate('/orden/' + saveRes.sale._id);
  };

  return (
    <>
      <p className='fs-4 mb-3'>
        Su orden llegara en aproximadamente 50 minutos. Recuerde tener el cambio
        necesario para pagar por su pedido.
      </p>
      <div className='d-f mt-2'>
        <button
          className='btn btn--danger btn--left'
          onClick={handleGoBackClick}>
          Regresar
        </button>
        <button
          className='btn btn--submit btn--right'
          onClick={handleConfirmClick}>
          Confirmar
        </button>
      </div>
    </>
  );
}

export default CashPayment;
