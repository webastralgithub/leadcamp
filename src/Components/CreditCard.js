import React from 'react';

import { useCreditCardValidator,images } from 'react-creditcard-validator';

const CreditCard = ({handleChange}) => {
  function expDateValidate(month, year) {
    if (Number(year) > 2035) {
      return 'Expiry Date Year cannot be greater than 2035';
    }
    return;
  }

  const {
    getCardNumberProps,
    getCardImageProps,
    getCVCProps,
    getExpiryDateProps,
    meta: { erroredInputs }
  } = useCreditCardValidator({ expiryDateValidator: expDateValidate });

//   const handleCardNumberChange = (e) => {
//     const cardNumber = e.target.value;
//     onCreditCardChange('cardNumber', cardNumber);
//   };
  return (
<>
    

      <div className="input-group">
        <svg {...getCardImageProps({ images })} />
        <label>Card Number</label>
        <input {...getCardNumberProps({ onChange: handleChange })}  name="number"/>
      </div>
      <small>{erroredInputs.cardNumber && erroredInputs.cardNumber}</small>

      <div className="multi-input">
        <div className="input-group">
          <label>Valid Till</label>
          <input {...getExpiryDateProps({onChange: handleChange})} name="expiryDate"/>
          <small>{erroredInputs.expiryDate && erroredInputs.expiryDate}</small>
        </div>

        <div className="input-group">
          <label>CVC</label>
          <input {...getCVCProps({ onChange: handleChange })} name="cvc"  />
          <small>{erroredInputs.cvc && erroredInputs.cvc}</small>
        </div>
      </div>
      </>
  );
};

export default CreditCard;
