import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import styles from '../../NavBarTop.module.scss';
//import { useAuth } from '../../../../stores/auth.store';
//import { useSession } from 'next-auth/react';

const UserTopNav = () => {
  //const { data } = useSession();
  //const { logout } = useAuth();
  return (
    <Nav className="p-0 m-0">
      <NavDropdown
        className={styles.userDropDown}
        title={
          <>
            <span className="me-3">
              {'Visitante'}
            </span>
            <img
              className={styles.userImg}
              src={'/img/user.png'}
              referrerPolicy="no-referrer"
            />
          </>
        }
        id=""
        drop="down"
      >
        <Link
          href="/conta"
          className={styles.dropdownItem}
        >
          <FontAwesomeIcon
            icon={faUserCircle}
            fixedWidth
          />{' '}
          Minha Conta
        </Link>
        <Dropdown.Divider className={styles.divider} />
        <Link
          href="#"
          className={styles.dropdownItem}
          //onClick={() => logout()}
        >
          <FontAwesomeIcon
            icon={faSignOutAlt}
            fixedWidth
          />{' '}
          Sair
        </Link>
      </NavDropdown>
    </Nav>
  );
};

export default UserTopNav;
