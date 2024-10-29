import React, {useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, IconButton,
    Paper,
    Box
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { format, parseISO } from 'date-fns';
import driverData from '../data/drivers.json';

const DriverList = () => {
    const [openRow, setOpenRow] = useState({});
    const [drivers] = useState(driverData.data);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleRow = (id) => {
        setOpenRow({ ...openRow, [id]: !openRow[id] });
    };
    const DaysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const DayBox = styled(Box)(({ hasActivity }) => ({
        width: 30,
        height: 30,
        borderRadius: 4,
        backgroundColor: hasActivity ? '#486F38' : '#A42821',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: hasActivity ? 'white' : 'black',
        margin: '0 2px',
        fontWeight: 'bold',
    }));

    const getActivitySummary = (activities) => {
        return activities.reduce((summary, { type, duration }) => {
            summary[type] = (summary[type] || 0) + duration;
            return summary;
        }, {});
    };

    const filteredDrivers = drivers.filter(
        (driver) =>
            `${driver.forename} ${driver.surname}`.toLowerCase().includes(searchQuery) ||
            driver.vehicleRegistration.toLowerCase().includes(searchQuery)
    );

    return (
        <TableContainer component={Paper}>
            <TextField
                label="Search Drivers or Registration"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Driver Full Name</TableCell>
                        <TableCell>Vehicle Registration</TableCell>
                        <TableCell>Total Minutes</TableCell>
                        <TableCell>Days</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredDrivers.map((driver) => {
                        const totalMinutes = driver.traces.reduce(
                            (sum, trace) => sum + trace.activity.reduce((subSum, act) => subSum + act.duration, 0),
                            0
                        );
                        const daysWithActivity = DaysOfTheWeek.map((day) => {
                            const hasActivity = driver.traces.some((trace) => {
                                const traceDate = parseISO(trace.date);
                                return format(traceDate, 'EEEE') === day;
                            });
                            return (
                                <DayBox key={day} hasActivity={hasActivity}>
                                    {day.charAt(0)}
                                </DayBox>
                            );
                        });

                        return (
                            <React.Fragment key={driver.driverID}>
                                <TableRow>
                                    <TableCell>
                                        <IconButton onClick={() => toggleRow(driver.driverID)}>
                                            {openRow[driver.driverID] ? <ExpandLess /> : <ExpandMore />}
                                        </IconButton>
                                        {driver.forename} {driver.surname}
                                    </TableCell>
                                    <TableCell>{driver.vehicleRegistration}</TableCell>
                                    <TableCell>{totalMinutes}</TableCell>
                                    <TableCell>{daysWithActivity}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={6} style={{ padding: 0 }}>
                                        <Collapse in={openRow[driver.driverID]} timeout="auto" unmountOnExit>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Activity Type</TableCell>
                                                        <TableCell>Total Time</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {Object.entries(getActivitySummary(driver.traces.flatMap(t => t.activity)))
                                                        .sort(([typeA], [typeB]) => typeA.localeCompare(typeB))
                                                        .map(([type, total]) => (
                                                            <TableRow key={type}>
                                                                <TableCell>{type}</TableCell>
                                                                <TableCell>{total}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                </TableBody>
                                            </Table>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DriverList;
