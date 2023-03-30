import HomeActiveIcon from '../icons/HomeActiveIcon';
import HomeIcon from '../icons/HomeIcon';
import UserIcon from '../icons/UserIcon';

export const ROUTES = [
  { slug: '', label: 'Home', subRoutes: [] },
  {
    slug: 'biblioteca',
    label: 'Biblioteca',
    subRoutes: [
      {
        slug: '',
        label: 'Início',
        icon: <HomeIcon color={'white'} />,
      },
      {
        slug: 'favoritos',
        label: 'Favoritos',
        //icon: <FavoriteIconLibrary />,
      },
      {
        slug: 'historico',
        label: 'Histórico',
        //  icon: <HistoricIcon />,
      },
      {
        slug: '#',
        label: 'Categorias',
        //  icon: <CategoriesIcon />,
        options: [],
      },
    ],
  },
  {
    slug: 'aulas',
    label: 'Aulas',
    subRoutes: [
      {
        slug: '',
        label: 'Início',
        icon: <HomeIcon color={'white'} />,
      },
      {
        slug: 'favoritos',
        label: 'Favoritos',
        // icon: <FavoriteIconLibrary />,
      },
      {
        slug: 'historico',
        label: 'Histórico',
        //  icon: <HistoricIcon />,
      },
      {
        slug: '#',
        label: 'Categorias',
        // icon: <CategoriesIcon />,
        options: [],
      },
    ],
  },
  {
    slug: 'instrucionais',
    label: 'Instrucionais',
    subRoutes: [
      {
        slug: '',
        label: 'Todos os cursos',
        icon: <HomeIcon color={'#F8F8F8'} />,
      },
      {
        slug: 'meus-cursos',
        label: 'Meus cursos',
        // icon: <LibraryIcon color={'#F8F8F8'} />,
      },
      {
        slug: 'instrutores',
        label: 'Instrutores',
        //icon: <InstrutorIcon color={'#F8F8F8'} />,
      },
      {
        slug: '#',
        label: 'Categorias',
        // icon: <CategoriesIcon />,
        options: [],
      },
    ],
  },
  {
    slug: 'planos',
    label: 'Planos',
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
    slug: '/biblioteca',
    label: 'Biblioteca',
    //icon: <LibraryIcon />,
    // activeIcon: <LibraryActiveIcon />,
  },
  {
    slug: '/aulas',
    label: 'Aulas',
    //icon: <ClassIcon />,
    // activeIcon: <ClassActiveIcon />,
  },
  {
    slug: '/instrucionais',
    label: 'Instrucionais',
    //icon: <InstructionalIcon />,
    //activeIcon: <InstructionalActiveIcon />,
  },
  {
    slug: '/conta',
    label: 'Conta',
    icon: <UserIcon />,
    //activeIcon: <UserActiveIcon />,
  },
];
