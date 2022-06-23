import React from 'react';
import { Link } from 'react-router-dom';

function Sales() {
  return (
    <div className='py-6'>
      <div className='d-f px-3 my-2'>
        <h1 className='fs-2 my-auto ml-0'>Ventas</h1>
        <button className='btn btn--dark btn--right fw-500'>Actualizar</button>
      </div>
      <div className='dash-card dash-card--h-auto'>
        <div className='dash-card__header px-2'>
          <h5 className='h5'>Detalles</h5>
          <div className='dash-card__period ml-auto mr-0'>
            <select name='period' id='period' className='dash-card__select'>
              <option value='d'>Dia</option>
              <option value='w'>Semana</option>
              <option value='m'>Mes</option>
            </select>
          </div>
        </div>
        <div className='dash-card__content card card--noshadow'>
          <div className='card__row'>
            <div className='card__concept'>Ventas Pendientes (Entrega)</div>
            <div className='card__value text-warning'>4</div>
          </div>
          <div className='card__row'>
            <div className='card__concept'>Ventas Completadas</div>
            <div className='card__value text-success'>8</div>
          </div>
          <div className='card__row'>
            <div className='card__concept'>Ventas Totales</div>
            <div className='card__value'>12</div>
          </div>
          <hr className='card__separator' />
          <div className='card__row'>
            <div className='card__concept'>Ingresos</div>
            <div className='card__value text-success'>$4,120.00</div>
          </div>
          <div className='card__row'>
            <div className='card__concept'>Venta Promedio</div>
            <div className='card__value'>$120.59</div>
          </div>
          <div className='card__row'>
            <div className='card__concept'>Maximo de Venta</div>
            <div className='card__value'>$812.00</div>
          </div>
          <div className='card__row'>
            <div className='card__concept'>Minimo de Venta</div>
            <div className='card__value'>$52.00</div>
          </div>
          <hr className='card__separator' />
          <h4 className='card__title'>Por producto</h4>
          <div className='card__row'>
            <div className='card__concept'>Burrito de Deshebrada</div>
            <div className='card__value'>5</div>
          </div>
          <div className='card__row'>
            <div className='card__concept'>Burrito de Deshebrada</div>
            <div className='card__value'>5</div>
          </div>
          <div className='card__row'>
            <div className='card__concept'>Burrito de Deshebrada</div>
            <div className='card__value'>5</div>
          </div>
          <div className='card__row'>
            <div className='card__concept'>Burrito de Deshebrada</div>
            <div className='card__value'>5</div>
          </div>
          <Link to='/admin/products' className='dash-card__see-more'>
            Ver todos los productos &raquo;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sales;
