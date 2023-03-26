import { ReactNode, useState, SyntheticEvent } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && children}
    </div>
  );
}

interface TabInfo {
  title: string;
  component: ReactNode;
}
interface BasicTabsProps {
  tabs: TabInfo[];
}
export default function BasicTabs({ tabs }: BasicTabsProps) {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mb: 4,
          alignItems: "center",
        }}
      >
        <Tabs value={value} onChange={handleChange}>
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.title} value={index} />
          ))}
        </Tabs>
      </Stack>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.component}
        </TabPanel>
      ))}
    </Box>
  );
}
