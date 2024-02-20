import { FC } from "react";
import { Tabs, ITabsProps } from "./tabs";
import { TabItem, ITabItemProps } from "./tabItem";

type TabsComponent = FC<ITabsProps> & {
  Item: FC<ITabItemProps>;
};

const transTabs: TabsComponent = Tabs as TabsComponent;

transTabs.Item = TabItem;

export default transTabs;
