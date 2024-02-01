import Button from "./components/Button";
import Alert from "./components/Alert";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Tabs from "./components/Tabs/tabs";
import TabItem from "./components/Tabs/tabItem";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex="0" defaultOpenSubMenus={["2"]} mode="vertical">
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
        {/* <Alert title="hhhhhhh" description="123" type="success" closable />
        <Alert title="hhhhhhh" onClose={() => console.log(123)} /> */}

        {/* <Button>默认</Button>
        <Button btnType="primary">Hello</Button>
        <Button btnType="link" href="baidu.com">
          Link
        </Button>
        <Button btnType="danger" size="sm">
          大的ddddd
        </Button>
        <code>const a = '1'</code> */}
      </header>
    </div>
  );
}

export default App;
