import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import styles from './FormSection.module.scss';
import { Alert, Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { PAYMENTS_METHODS } from '@/constants/payments.constants';
import latLng from '@/services/latLng.service';
import { useOrder } from '@/stores/order.store';
import { maskCurrency } from '@/helpers/currency.helper';
import orderService from '@/services/order.service';

const FormSection = ({ userStore }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [priceValue, setPriceValue] = useState('');

  const { orders, findOrderByUserStore } = useOrder();

  useEffect(() => {
    findOrderByUserStore(userStore?.uuid);
  }, [findOrderByUserStore]);

  const validationSchema = Yup.object().shape({
    orderNumber: Yup.number().required('Numero do pedido é obrigatório'),
    // .test('numberOrder-validation', 'Não pode ser igual', function (value) {
    //   const orderNumbers = orders.map(order => order.orderNumber);
    //   return !orderNumbers.includes(value);
    // }),

    address: Yup.string()
      .required('Endereço é obrigatório')
      .matches(/\d/, 'Digite um endereço com o número.'),

    nameClient: Yup.string()
      .required('Nome é obrigatório')
      .test('nameClient-validation', 'Não pode ser vazio.', function (value) {
        return value.trim() !== '';
      }),
    price: Yup.string().required('Valor é obrigatório'),
    typePayment: Yup.string().required('Escolha a forma de pagamento'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, reset, setValue } =
    useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async data => {
    try {
      const latLngResult = await latLng(data?.address);

      const formObj = {
        storeUuid: userStore?.uuid,
        orderNumber: data.orderNumber,
        price: parseFloat(data.price.replace(/[^\d,]/g, '').replace(',', '.')),
        clientName: data.nameClient,
        address: data.address,
        typePayment: data.typePayment,
        latLngAddress: JSON.stringify(latLngResult),
      };

      try {
        await orderService.createOrderByUserStore(formObj);
        findOrderByUserStore(userStore?.uuid);
        reset();
      } catch (error) {
        setErrorMessage(error.response.data.message);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeCurrency = (field, value) => {
    return setValue(field, maskCurrency(value));
  };

  return (
    <Container
      fluid
      className={styles.container}
    >
      <div className={styles.cardInputs}>
        <Form
          noValidate
          className="w-100"
          onSubmit={handleSubmit(onSubmit)}
        >
          {showAlert && (
            <Alert
              className={styles.customAlert}
              style={{
                position: 'absolute',
                zIndex: 10,
                width: '500px',
                top: '115px',
              }}
              variant="danger"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {errorMessage}
            </Alert>
          )}

          <Form.Group>
            <Row>
              <Col
                md={1}
                lg={1}
                xl={1}
                style={{ minWidth: '110px' }}
              >
                <FloatingLabel
                  controlId="floatingInput"
                  label="N Pedido"
                  className={styles.formFloating}
                >
                  <Form.Control
                    type="text"
                    placeholder="N Pedido"
                    name="orderNumber"
                    {...register('orderNumber')}
                    isInvalid={!!errors.orderNumber}
                    style={
                      errors.orderNumber?.message && {
                        border: '1px solid red !important',
                        background: '#ffebeb !important',
                      }
                    }
                  />
                </FloatingLabel>
              </Col>
              <Col
                md={2}
                lg={2}
                xl={2}
                style={{ minWidth: '110px' }}
              >
                <FloatingLabel
                  controlId="floatingInput"
                  label="Nome do cliente"
                  className={styles.formFloating}
                >
                  <Form.Control
                    name="nameClient"
                    type="text"
                    placeholder="Nome do cliente"
                    {...register('nameClient')}
                    isInvalid={!!errors.nameClient}
                    style={
                      errors.nameClient?.message && {
                        border: '1px solid red !important',
                        background: '#ffebeb !important',
                      }
                    }
                  />
                </FloatingLabel>
              </Col>
              <Col
                md={3}
                lg={3}
                xl={3}
              >
                <FloatingLabel
                  controlId="floatingInput"
                  label="Endereço de entrega"
                  className={styles.formFloating}
                >
                  <Form.Control
                    type="text"
                    placeholder="Endereço"
                    name="address"
                    {...register('address', {
                      required: 'Por favor, digite o endereço.',
                    })}
                    isInvalid={!!errors.address}
                    style={
                      errors.address?.message && {
                        border: '1px solid red !important',
                        background: '#ffebeb !important',
                      }
                    }
                  />
                  <p className={styles.errorText}>{errors.address?.message}</p>
                </FloatingLabel>
              </Col>

              <Col
                md={1}
                lg={1}
                xl={1}
                style={{ minWidth: '110px' }}
              >
                <FloatingLabel
                  controlId="floatingInput"
                  label="Valor"
                  className={styles.formFloating}
                  onChange={v =>
                    onChangeCurrency(v.target.name, v.target.value)
                  }
                >
                  <Form.Control
                    name="price"
                    type="text"
                    placeholder="Valor"
                    {...register('price')}
                    isInvalid={!!errors.price}
                    style={
                      errors.price?.message && {
                        border: '1px solid red !important',
                        background: '#ffebeb !important',
                      }
                    }
                  />
                  <p className={styles.errorText}>{errors.number?.message}</p>
                </FloatingLabel>
              </Col>
              <Col
                md={2}
                lg={2}
                xl={2}
                style={{ minWidth: '220px' }}
              >
                <Form.Select
                  aria-label="Default select example"
                  {...register('typePayment')}
                  isInvalid={!!errors.typePayment}
                  className={styles.formSelect}
                  style={
                    errors.typePayment?.message && {
                      border: '1px solid red !important',
                      background: '#ffebeb !important',
                    }
                  }
                >
                  {PAYMENTS_METHODS.map((payment, index) => (
                    <option
                      value={payment.value}
                      key={`payment-index-${index}`}
                    >
                      {payment.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Button
                  className={styles.buttonSave}
                  type="submit"
                >
                  Salvar
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
};

export default FormSection;
