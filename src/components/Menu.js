import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import DriverList from './DriverList';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import InfoIcon from '@mui/icons-material/Info';
import logo from '../assets/logo.png';
import HoldingPage from './HoldingPage';

const NAVIGATION = [
    {
        segment: 'home',
        title: 'Home',
        icon: <HomeIcon />,
    },
    {
        segment: 'driverlist',
        title: 'Drivers',
        icon: <PersonIcon />,
    },
    { segment: 'vehicles', title: 'Vehicles', icon: <DirectionsCarIcon /> },
    { segment: 'about', title: 'About', icon: <InfoIcon />, path: '/about' },
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

export default function Menu(props) {
    const { window } = props;
    const demoWindow = window ? window() : undefined;
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <AppProvider
            branding={{
                logo: <img src={logo} alt="Logistics UK" />,
                title: ''
            }}
            navigation={NAVIGATION.map(item => ({
                ...item,
                onClick: () => handleNavigation(item.path),
            }))}
            theme={demoTheme}
            window={demoWindow}
        >
            <DashboardLayout>
                <Routes>
                    <Route path="/driverlist" element={<DriverList />} />
                    <Route path="/home" element={<HoldingPage title="Holding Page" />} />
                    <Route path="/about" element={<HoldingPage title="Holding Page" />} />
                    <Route path="/vehicles" element={<HoldingPage title="Holding Page" />} />
                </Routes>
            </DashboardLayout>
        </AppProvider>
    );
}