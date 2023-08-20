// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'user request ',
    path: '/dashboard/userReq',
    icon: icon('ic_disabled'),
  },
  {
    title: 'restaurant details',
    path: '/dashboard/addhotel',
    icon: icon('ic_cart'),
  },
  {
    title: 'Add Location',
    path: '/dashboard/addLocation',
    icon: icon('ic_lock'),
  },
  {
    title: 'offers',
    path: '/dashboard/offers',
    icon: icon('ic_blog'),
  },
  {
    title: 'orders',
    path: '/dashboard/orders',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
