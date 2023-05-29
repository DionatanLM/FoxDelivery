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

const FormSection = () => {
  return (
    <Container
      fluid
      className={styles.container}
    >
      <div className={styles.cardInputs}>
        <Form
          noValidate
          className="w-100"
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
                  />
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
                  label="Número"
                  className={styles.formFloating}
                >
                  <Form.Control
                    type="number"
                    placeholder="Número"
                  />
                </FloatingLabel>
              </Col>
              <Col
                md={2}
                lg={2}
                xl={2}
                style={{ minWidth: '220px' }}
              >
                <Form.Select aria-label="Default select example">
                  <option readOnly>Forma de pagamento</option>
                  <option value="1">Dinheiro</option>
                  <option value="2">PIX</option>
                  <option value="3">Cartão de credito</option>
                  <option value="4">Cartão de debito</option>
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
