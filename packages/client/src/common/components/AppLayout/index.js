import { useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { PRODUCT_NAME, routes } from '@config';
import { selectActivePlan } from '@slices/study-plan';

const DRAWER_WIDTH = 260;

const NAV_ITEMS = [
  { href: routes.home, label: 'Bosh sahifa', icon: <HomeIcon /> },
  { href: routes.topics, label: 'Mavzular', icon: <MenuBookIcon /> },
  { href: routes.dashboard, label: 'Statistika', icon: <DashboardIcon /> },
];

function SidebarContent() {
  const router = useRouter();
  const activePlan = useSelector(selectActivePlan);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>
          {PRODUCT_NAME}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Frontend Senior tayyorgarlik
        </Typography>
      </Box>

      <Divider />

      <List sx={{ flex: 1, px: 2, mt: 2 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = router.pathname === item.href
            || (item.href !== '/' && router.pathname.startsWith(item.href));

          return (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive ? 'primary.main' : 'transparent',
                  color: isActive ? 'common.white' : 'text.primary',
                  '&:hover': {
                    bgcolor: isActive ? 'primary.dark' : 'action.hover',
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? 'common.white' : 'text.secondary', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontWeight: isActive ? 700 : 500 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {activePlan && (
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: 'primary.light',
              color: 'common.white',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <EmojiEventsIcon fontSize="small" />
              <Typography variant="caption" sx={{ fontWeight: 700 }}>
                AKTIV REJA
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {activePlan.name}
            </Typography>
            <Chip
              size="small"
              label={`${activePlan.durationDays} kun`}
              sx={{ mt: 1, bgcolor: 'rgba(255,255,255,0.2)', color: 'common.white' }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default function AppLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleToggle = () => setMobileOpen((prev) => !prev);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            sx={{ mr: 2, display: { md: 'none' } }}
            onClick={handleToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {PRODUCT_NAME}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
          }}
        >
          <SidebarContent />
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              borderRight: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper',
            },
          }}
        >
          <SidebarContent />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <Box sx={{ p: { xs: 2, md: 4 } }}>{children}</Box>
      </Box>
    </Box>
  );
}
