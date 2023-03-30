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

function NavBarTop({ menuItems, mainRoute, subRoute, instructorName }) {
  // const session = useSession();
  // const { data } = session;

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
        <Row className="m-0 w-100 align-items-center justify-content-between">
          <Col
            md={1}
            lg={1}
            xl={1}
            className="m-0 p-0"
          >
            <NavOffCanvas
              menuItems={menuItems}
              mainRoute={mainRoute}
              subRoute={subRoute}
              instructorName={instructorName}
            />
          </Col>

          <Col
            md={3}
            lg={3}
            xl={3}
            className={['d-flex', styles.tabletResponsive]}
          >
            <Navbar.Brand
              href="/"
              className={[styles.navbarBrand, 'pt-2']}
            >
              <img
                src="/img/logo-fox.svg"
                className={styles.navBarImg}
              />
            </Navbar.Brand>
          </Col>
          <Col
            md={8}
            lg={8}
            xl={8}
            className={[
              'd-flex justify-content-between',
              styles.tabletResponsive,
            ]}
          >
            <Nav
              navbarScroll
              className={[styles.navBarCollapse, 'w-100']}
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
            <div className={styles.userMenu}>
              <UserTopNav className={styles.userTopNav} />
            </div>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default NavBarTop;
