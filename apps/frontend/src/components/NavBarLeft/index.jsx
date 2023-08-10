import { ROUTES } from '../../constants/routes.constants';
// import { useSession } from 'next-auth/react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Placeholder from 'react-bootstrap/Placeholder';
import styles from './NavBarLeft.module.scss';
import Button from 'react-bootstrap/Button';
import { useSession } from 'next-auth/react';
import OrdersIcon from '@/icons/OrdersIcon';
import ChatIcon from '@/icons/ChatIcon';
import ReportIcon from '@/icons/ReportIcon';
import WalletIcon from '@/icons/WalletIcon';
import AccountIcon from '@/icons/AccountIcon';
import { useRouter } from 'next/router';

function NavBarLeft() {
  const session = useSession();
  const path = useRouter();
  const { data } = session;

  return (
    <Navbar
      fixed="left"
      variant="dark"
      className={styles.navBarWrapper}
    >
      <Container
        fluid
        className={styles.navContainer}
      >
        <a href="/">
          <img src="/img/logoColumn.png" />
        </a>
        <Nav
          className={styles.cardContainer}
          defaultActiveKey="/home"
        >
          <Nav.Link
            href="home"
            className={
              path?.route === '/home' ? styles.cardIconActive : styles.cardIcon
            }
          >
            <OrdersIcon />
            Pedidos
          </Nav.Link>
          <Nav.Link
            href="/chat"
            className={
              path?.route === '/chat' ? styles.cardIconActive : styles.cardIcon
            }
          >
            <ChatIcon />
            <span>Chat</span>
          </Nav.Link>
          <Nav.Link
            href="/relatorios"
            className={
              path?.route === '/relatorios'
                ? styles.cardIconActive
                : styles.cardIcon
            }
          >
            <ReportIcon />
            Relátorios
          </Nav.Link>
          <Nav.Link
            href="/pagamentos"
            className={
              path?.route === '/pagamentos'
                ? styles.cardIconActive
                : styles.cardIcon
            }
          >
            <WalletIcon />
            Pagamentos
          </Nav.Link>
        </Nav>
        <Nav className={styles.cardContainer}>
          <Nav.Link
            href="/conta"
            className={
              path?.route === '/conta' ? styles.cardIconActive : styles.cardIcon
            }
          >
            <AccountIcon />
            Conta
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBarLeft;
