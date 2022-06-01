import React from 'react';

function CashPayment() {
  return (
    <>
      <div className='fs-4'>
        Su orden llegara en aproximadamente 50 minutos. Recuerde tener el cambio
        necesario para pagar por su pedido.
      </div>
      <div className='d-f mt-2'>
        <button className='btn btn--danger btn--left'>Regresar</button>
      </div>
    </>
  );
}

export default CashPayment;
