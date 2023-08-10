import HomeActiveIcon from '../icons/HomeActiveIcon';
import HomeIcon from '../icons/HomeIcon';
import UserIcon from '../icons/UserIcon';

export const ROUTES = [
  { slug: '', label: 'Home', subRoutes: [] },
  {
    slug: 'sobre-nos',
    label: 'Sobre nós',
    subRoutes: [],
  },
  {
    slug: 'beneficios',
    label: 'Benefícios',
    subRoutes: [],
  },
  {
    slug: 'entregadores',
    label: 'Entregadores',
    subRoutes: [],
  },
];

export const ROUTES_MOBILE = [
  {
    slug: '/',
    label: 'Home',
    icon: <HomeIcon />,
    activeIcon: <HomeActiveIcon />,
  },
  {
    slug: '/conta',
    label: 'Conta',
    icon: <UserIcon />,
    //activeIcon: <UserActiveIcon />,
  },
];
