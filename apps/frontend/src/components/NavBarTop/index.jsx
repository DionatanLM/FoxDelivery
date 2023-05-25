import { ROUTES } from '../../constants/routes.constants';
// import { useSession } from 'next-auth/react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavOffCanvas from './components/NavOffCanvas';
import UserTopNav from './components/UserTopNav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Placeholder from 'react-bootstrap/Placeholder';
import styles from './NavBarTop.module.scss';
import Button from 'react-bootstrap/Button';
import { useSession } from 'next-auth/react';

function NavBarTop({ menuItems, mainRoute, subRoute, instructorName }) {
  const session = useSession();
  const { data } = session;

  return (
    <Navbar
      expand="md"
      variant="dark"
      className={styles.navBarWrapper}
    >
      <Container
        fluid
        className={styles.navContainer}
      >
        <Row className="m-0 w-100 align-items-center justify-content-center p-0">
          <Col
            md={4}
            lg={4}
            xl={4}
            className={[
              'd-flex justify-content-start p-0',
              styles.tabletResponsive,
            ]}
          >
            <Navbar.Brand href="/">
              <img
                src="/img/newLogoFoxDelivery.png"
                className={styles.navBarImg}
              />
            </Navbar.Brand>
          </Col>
          <Col
            md={4}
            lg={4}
            xl={4}
            className={[
              'd-flex justify-content-center p-0',
              styles.tabletResponsive,
            ]}
          >
            <Nav
              navbarScroll
              className={[
                styles.navBarCollapse,
                'w-100 justify-content-center',
              ]}
            >
              {ROUTES.map((navRoute, index) => (
                <Nav.Link
                  key={index}
                  className={[
                    styles.textWhite,
                    styles.navItem,
                    navRoute.slug === mainRoute && styles.activeItem,
                  ]}
                  href={`/${navRoute.slug}`}
                >
                  {navRoute.label}
                </Nav.Link>
              ))}
            </Nav>
          </Col>
          <Col
            md={4}
            lg={4}
            xl={4}
          >
            <div className={styles.buttonContainerDesktop}>
              {session.status === 'loading' ? (
                <div style={{ width: '110px' }}>
                  <Placeholder
                    xs={12}
                    animation="glow"
                  >
                    <Placeholder.Button
                      xs={7}
                      variant="secondary"
                      className="me-2"
                      style={{ height: '25px' }}
                      size="sm"
                    />
                    <Placeholder.Button
                      xs={4}
                      variant="secondary"
                      style={{ borderRadius: 40 }}
                      size="sm"
                    />
                  </Placeholder>
                </div>
              ) : !!data ? (
                <>
                  <UserTopNav />
                </>
              ) : (
                <div className="d-flex align-items-center justify-content-end gap-2">
                  <Nav.Link
                    className={[styles.textWhite, styles.navLoginItem]}
                    href="/login"
                  >
                    <Button bsPrefix={[styles.loginButton, styles.navButtons]}>
                      Login
                    </Button>
                  </Nav.Link>
                  <Nav.Link
                    className={[styles.textWhite, styles.navLoginItem]}
                    href="/cadastre-se"
                  >
                    <Button
                      bsPrefix={[styles.navButtons, styles.registerButton]}
                    >
                      Cadastre-se
                    </Button>
                  </Nav.Link>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default NavBarTop;
