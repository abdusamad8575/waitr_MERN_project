// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/restaurant/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Details',
    path: '/restaurant/details',
    icon: icon('ic_cart'),
  },
 
  {
    title: 'add food',
    path: '/restaurant/addfood',
    icon: icon('ic_blog'),
  },
  {
    title: 'offers',
    path: '/restaurant/offers',
    icon: icon('ic_blog'),
  },
  {
    title: 'orders',
    path: '/restaurant/orders',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
