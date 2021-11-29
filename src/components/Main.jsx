import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ margin: '15px 0 0 20px', paddingBottom: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Main({ defaultValue, onChange, routesMap }) {
  const [value, setValue] = useState(defaultValue || 0);

  const handleChange = (event, newValue) => {
    onChange(newValue - 1);
    setValue(newValue);
  };

  return (
    <Box sx={{ background: 'background.paper', display: 'flex', height: 224 }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Menu"
        sx={{ borderRight: 1, borderColor: 'divider', minWidth: 150 }}
      >
        <Tab sx={{ display: 'none' }} label={''} {...a11yProps(0)} />
        {routesMap.map(([key, { name }], idx) => (
          <Tab key={name} label={name} {...a11yProps(idx + 1)} />
        ))}
      </Tabs>
      <TabPanel value={value} index={0}>
        <h1>React query</h1>
      </TabPanel>
      {routesMap.map(([key, { name, component: Component }], idx) => (
        <TabPanel key={name} value={value} index={idx + 1}>
          <Component />
        </TabPanel>
      ))}
    </Box>
  );
}
