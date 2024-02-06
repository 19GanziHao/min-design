import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Tabs from "./components/Tabs/tabs";
import TabItem from "./components/Tabs/tabItem";

import { Input } from "./components/Input/input";
library.add(fas);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* < Icon icon="coffee" theme="secondary" size="10x"/> */}
        <Menu defaultIndex="0" defaultOpenSubMenus={["2"]} mode="horizontal">
          <MenuItem>cool link</MenuItem>
          <MenuItem>cool link 2</MenuItem>
          <SubMenu title="甘梓豪">
            <MenuItem>cool link 5</MenuItem>
            <MenuItem>cool link 6</MenuItem>
            <MenuItem>cool link 7</MenuItem>
          </SubMenu>
          <MenuItem>cool link 3</MenuItem>
          <MenuItem disabled>cool link 4</MenuItem>
        </Menu>
        <Tabs>
          <TabItem label="内容1">内容1</TabItem>
          <TabItem label="内容2" disabled>
            内容2
          </TabItem>
          <TabItem label="内容3">内容3</TabItem>
        </Tabs>
        <Input icon="times" prepand="https://" />
      </header>
    </div>
  );
}
 
export default App;
