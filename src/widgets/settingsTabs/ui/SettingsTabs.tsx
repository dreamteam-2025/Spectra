import s from "./SettingsTabs.module.scss";
import { AccountManagement } from "@/widgets/settingsTabs/tabs/accountManagement/ui/AccountManagement";
import { Devices } from "@/widgets/settingsTabs/tabs/devices/ui/Devices";
import { GeneralInformation } from "@/widgets/settingsTabs/tabs/generalInformation/ui/GeneralInformation";
import { MyPayments } from "@/widgets/settingsTabs/tabs/myPayments/ui/MyPayments";
import * as Tabs from "@radix-ui/react-tabs";

export default () => (
  <Tabs.Root className={s.TabsRoot} defaultValue="tab1" orientation="vertical">
    <Tabs.List className={s.TabsList} aria-label="tabs">
      <Tabs.Trigger className={s.TabsTrigger} value="tab1">
        General information
      </Tabs.Trigger>
      <Tabs.Trigger className={s.TabsTrigger} value="tab2">
        Devices
      </Tabs.Trigger>
      <Tabs.Trigger className={s.TabsTrigger} value="tab3">
        Account management
      </Tabs.Trigger>
      <Tabs.Trigger className={s.TabsTrigger} value="tab4">
        My payments
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="tab1">
      <GeneralInformation />
    </Tabs.Content>
    <Tabs.Content value="tab2">
      <Devices />
    </Tabs.Content>
    <Tabs.Content value="tab3">
      <AccountManagement />
    </Tabs.Content>
    <Tabs.Content value="tab4">
      <MyPayments />
    </Tabs.Content>
  </Tabs.Root>
);
