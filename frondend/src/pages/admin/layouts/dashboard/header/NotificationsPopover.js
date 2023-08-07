import { noCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
  Stack,
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import axiosInstance from '../../../../../axios';
import userData from '../../../pages/UserPage'
  import { useDispatch, useSelector } from 'react-redux';
  import {setUserDatas} from '../../../../../redux-toolkit/adminSlice'

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const userDatas = useSelector((state)=>state.admin.userDatas)
  const dispatch = useDispatch();
  
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    console.log('notiEfect')
    const fetchNotificationData = async () => {
      try {
        const response = await axiosInstance.get('/dashboard/notification');
        setNotifications(response.data.notification);
        
      } catch (error) {
        console.error('Error fetching notification data:', error);
      }
    };
    
    fetchNotificationData();
  },[ userDatas]);
  const totalUnRead = notifications.filter((item) => item.addHotel[0]?.adminverify === true);
  const count = totalUnRead.length;
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleAdminVerify = async (id) => {
    try {
      await axiosInstance.patch('/dashboard/adminVerify', { id })
      .then(res=>dispatch(setUserDatas(res.data)))
      // Update the local state to reflect the changes made in the backend
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === id ? { ...notification, addHotel: [{ ...notification.addHotel[0], adminverify: false }] } : notification
        )
      );
        // console.log('notifications1=>',notifications)
       
    } catch (error) { 
      console.log(error);
    }
  };

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen} sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={count} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {count} unread messages
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {count > 0 && <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List disablePadding subheader={<ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>New</ListSubheader>}>
            {totalUnRead.map((notification) => (
              <NotificationItem key={notification._id} notification={notification} handleAdminVerify={handleAdminVerify} />
            ))}
          </List>
        </Scrollbar>}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

function NotificationItem({ notification, handleAdminVerify }) {
  const { avatar, Rname } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.addHotel[0]?.adminverify && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={Rname}
        secondary={
          <Typography variant="caption" sx={{ mt: 0.5, display: 'flex', alignItems: 'center', color: 'text.disabled' }}>
            {/* <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.createdAt)} */}
          </Typography>
        }
      />
      <Tooltip title=" Mark all as read">
        <IconButton color="primary" onClick={() => handleAdminVerify(notification._id)}>
          <Iconify icon="eva:done-all-fill" />
        </IconButton>
      </Tooltip>
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const Rlocation = notification.addHotel[0]?.Rlocation || '';
  const Rname = (
    <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          {notification.addHotel[0]?.Rname}
          <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
            &nbsp; {noCase(Rlocation)}
          </Typography>
        </Typography>
        <Typography variant="subtitle3">Ph:{notification.addHotel[0]?.Rcontact}</Typography>
      </Box>
    </Stack>
  );
  return {
    avatar: notification.avatar ? <img alt={notification.Rname} src={notification.avatar} /> : null,
    Rname,
  };
}
