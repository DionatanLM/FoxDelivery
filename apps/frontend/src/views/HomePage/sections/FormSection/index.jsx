import React from 'react';
import Container from 'react-bootstrap/Container';
import styles from './FormSection.module.scss';
import {
  Button,
  Col,
  FloatingLabel,
  Form,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { PAYMENTS_METHODS } from '@/constants/payments.constants';
import latLng from '@/services/latLng.service';
import orderService from '@/services/order.service';

const FormSection = ({ userStore }) => {
  const validationSchema = Yup.object().shape({
    orderNumber: Yup.number().required('Numero do pedido é obrigatório'),
    address: Yup.string()
      .required('Endereço é obrigatório')
      .matches(/\d/, 'Digite um endereço com o número.'),

    nameClient: Yup.string()
      .required('Nome é obrigatório')
      .test('nameClient-validation', 'Não pode ser vazio.', function (value) {
        return value.trim() !== '';
      }),
    price: Yup.number().required('Valor é obrigatório'),
    typePayment: Yup.string().required('Escolha a forma de pagamento'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;
  const onSubmit = async data => {
    try {
      const latLngResult = await latLng(data?.address);

      const formObj = {
        storeUuid: userStore?.uuid,
        orderNumber: data.orderNumber,
        price: data.price,
        clientName: data.nameClient,
        address: data.address,
        typePayment: data.typePayment,
        latLngAddress: latLngResult,
      };
      console.log(formObj);
      try {
        await orderService.createOrderByUserStore(formObj);
      } catch (error) {
        console.log(error);
      }
      //reset();
    } catch (e) {
      console.log(e);
    }
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
                >
                  <Form.Control
                    name="price"
                    type="number"
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
                  {/* <option readOnly>Forma de pagamento</option>
                  <option value="1">Dinheiro</option>
                  <option value="2">PIX</option>
                  <option value="3">Cartão de credito</option>
                  <option value="4">Cartão de debito</option> */}
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
