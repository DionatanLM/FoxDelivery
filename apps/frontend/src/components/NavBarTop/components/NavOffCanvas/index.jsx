import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import MenuIcon from '../../../../icons/MenuIcon';
//import CategoryItem, { Title } from './components/CategoryItem';
import styles from '../../NavBarTop.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const NavOffCanvas = () => {
  const [mobileTitle, setMobileTitle] = useState('Início');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className={styles.offCanvasBtnContainer}>
        <Button
          className={styles.offCanvasBtn}
          onClick={handleShow}
        >
          <MenuIcon />
        </Button>
        <span className={styles.offCanvasTitle}>{mobileTitle}</span>
      </div>
      <Offcanvas
        show={show}
        onHide={handleClose}
      >
        <Offcanvas.Header
          className={styles.offCanvasheader}
          closeButton
          closeVariant="white"
        />
        <Offcanvas.Body className={styles.offCanvasBody}>
          <Nav variant="flush">
            <Nav.Item className={[styles.item]}>
              <div>
                {/* <>{menuItem.icon}</>
                <span>{menuItem.label}</span> */}
              </div>
            </Nav.Item>

            <NavDropdown
              autoClose={false}
              className={styles.dropdown}
              title={
                <div className={styles.item}>
                  <div>
                    {/* <>{menuItem.icon}</>
                    <span>{menuItem.label}</span> */}
                  </div>
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
              }
            >
              <Nav.Item
                className={styles.dropdownItem}
              >
                {/* <CategoryItem
                  mainRoute={mainRoute}
                  category={category}
                  as={'li'}
                /> */}
              </Nav.Item>
            </NavDropdown>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavOffCanvas;
