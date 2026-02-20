import s from "./SettingsTabs.module.scss";
import { AccountManagement } from "@/widgets/settingsTabs/tabs/accountManagement/ui/AccountManagement";
import { Devices } from "@/widgets/settingsTabs/tabs/devices/ui/Devices";
import { GeneralInformation } from "@/widgets/settingsTabs/tabs/generalInformation/ui/GeneralInformation";
import { MyPayments } from "@/widgets/settingsTabs/tabs/myPayments/ui/MyPayments";
import * as Tabs from "@radix-ui/react-tabs";

export const SettingsTabs = () => (
  <Tabs.Root className={s.TabsRoot} defaultValue="General" orientation="horizontal">
    <Tabs.List className={s.TabsList} aria-label="tabs">
      <Tabs.Trigger className={s.TabsTrigger} value="General">
        General information
      </Tabs.Trigger>
      <Tabs.Trigger className={s.TabsTrigger} value="Devices">
        Devices
      </Tabs.Trigger>
      <Tabs.Trigger className={s.TabsTrigger} value="Management">
        Account management
      </Tabs.Trigger>
      <Tabs.Trigger className={s.TabsTrigger} value="Payments">
        My payments
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="General">
      <GeneralInformation />
    </Tabs.Content>
    <Tabs.Content value="Devices">
      <Devices />
    </Tabs.Content>
    <Tabs.Content value="Management">
      <AccountManagement />
    </Tabs.Content>
    <Tabs.Content value="Payments">
      <MyPayments />
    </Tabs.Content>
  </Tabs.Root>
);
