    import React from 'react';

    const QuantityControl = ({ quantity, onIncrement, onDecrement }) => {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={onDecrement}>-</button>
          <span style={{ margin: '0 10px' }}>{quantity}</span>
          <button onClick={onIncrement}>+</button>
        </div>
      );
    };


    export default QuantityControl;