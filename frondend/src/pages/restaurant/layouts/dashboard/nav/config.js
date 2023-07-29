// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/restaurent/app',
    icon: icon('ic_analytics'),
  },
 
  {
    title: 'add food',
    path: '/restaurent/addfood',
    icon: icon('ic_cart'),
  },
  {
    title: 'offers',
    path: '/restaurent/offers',
    icon: icon('ic_blog'),
  },
  {
    title: 'orders',
    path: '/restaurent/orders',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
