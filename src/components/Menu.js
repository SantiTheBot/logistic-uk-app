import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import DriverList from './DriverList';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import InfoIcon from '@mui/icons-material/Info';
import logo from '../assets/logo.png';

const NAVIGATION = [
  { segment: 'home', title: 'Home', icon: <HomeIcon /> },
  { segment: 'drivers', title: 'Drivers', icon: <PersonIcon /> },
  { segment: 'vehicles', title: 'Vehicles', icon: <DirectionsCarIcon /> },
  { segment: 'about', title: 'About', icon: <InfoIcon /> },
  
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);
  const router = React.useMemo(() => ({
    searchParams: new URLSearchParams(),
    navigate: (path) => setPathname(String(path)),
  }), [pathname]);
  return router;
}

export default function Menu(props) {
    const { window } = props;
    const router = useDemoRouter('/dashboard');
    const demoWindow = window ? window() : undefined;

    return (
    <AppProvider
        branding={{
        logo: <img src={logo} alt="Logistics UK" />,
        title: ''
        }}
        navigation={NAVIGATION}
        router={router}
        theme={demoTheme}
        window={demoWindow}
    >
        <DashboardLayout>
            <PageContainer>
                <Grid container spacing={1}>
                <Grid item xs={12}>
                    <DriverList />
                </Grid>
                </Grid>
            </PageContainer>
        </DashboardLayout>
    </AppProvider>
  );
}

