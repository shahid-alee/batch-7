import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import OrderDetails from './OrderList';
import OrderSummary from './OrderStatus';
import NoOfCustomer from './NoOfCustomer';
import SalesSummary from './SalesSummary';
import Dashboard from './dashboard';
import OrderDetailsComponent from './NoOfOrder';
import TopSellingProducts from './TopSales';
import OrdersList from './OrderList';
import InventoryManagement from './InventoryManagement';
import ProductCategories from './ProductCategories';
import ProductDetails from './ProductDetail';
import ProductList from './ProductList';
import ProductSearch from './ProductSearch';
import ProductManagement from './ProductManagement';

// import OrderCount from '../dashbord/NoOfOrder';
// import { Dashboard } from '@mui/icons-material';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const menuItems = [
  {
    text: 'Dashboard Overview',
    icon: <InboxIcon />,
    subMenu: [
      { text: 'Dashboard', component: () => <Dashboard/> },
      { text: 'Sales summary (today, this week, this month)', component: () => <div><SalesSummary/></div> },
      { text: 'Number of customers', component: () => <div> <NoOfCustomer/></div> },
      { text: 'Number of order', component: () => <OrderDetailsComponent/> },
      { text: 'Top-selling products', component: () => <TopSellingProducts/> },
    ],
  },
  {
    text: 'Orders Management',
    icon: <MailIcon />,
    subMenu: [
      { text: 'List of orders', component: () => <div><OrdersList/></div> },
      { text: 'Order details', component: () => <div> <OrderDetails/></div> },
      { text: 'Order status update', component: () => <div><OrderSummary/></div> },
    ],
  },
  {
    text: 'Products Management',
    icon: <InboxIcon />,
    subMenu: [
      { text: 'List of products', component: () => <ProductList/> },
      { text: 'Product details', component: () => <ProductDetails/> },
      { text: 'Add/edit/delete products', component: () => < ProductManagement/> },
      { text: 'Product categories', component: () => <ProductCategories/>
       },
      { text: 'Inventory management', component: () => <InventoryManagement/> },
      { text: 'Product search', component: () => <ProductSearch/> },
    ],
  },
];

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedMenu, setSelectedMenu] = React.useState(0);
  const [selectedSubMenu, setSelectedSubMenu] = React.useState(0);
  const [openSubMenu, setOpenSubMenu] = React.useState(false);
  const [subMenuComponent, setSubMenuComponent] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuClick = (index) => {
    console.log("index", index)
    setSelectedMenu(index);
    setOpenSubMenu(true);
  };

  React.useEffect(() => {
    // setSubMenuComponent(false);
    if (openSubMenu === true) {
      setSubMenuComponent(menuItems[selectedMenu].subMenu[0].component());
    }
    // Clean up
    return () => {
      setSubMenuComponent(false);
    };
  }, [openSubMenu, selectedMenu]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <div key={index}>
              <ListItem
                disablePadding
                sx={{ display: 'block' }}
                // selected={selectedMenu}
                onClick={() => handleMenuClick(index)}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                  {openSubMenu === true ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={open ? selectedMenu === index ? openSubMenu === true ? true : false : false : false} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subMenu.map((subItem, subIndex) => (
                    <ListItem key={subIndex} disablePadding onClick={() => setSelectedSubMenu(subIndex)}>
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 4,
                        }}
                        onClick={() => setSubMenuComponent(subItem.component)}
                      >
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
              {openSubMenu === true ? <Divider /> : null}
            </div>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {subMenuComponent}
      </Box>
    </Box>
  );
}