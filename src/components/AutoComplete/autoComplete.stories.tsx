import type { Meta, StoryObj } from "@storybook/react";
import { AutoComplete, DataSourceType } from "./autoComplete";

const meta: Meta<typeof AutoComplete> = {
  title: "custom/AutoComplete",
  component: AutoComplete,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AutoComplete>;

export default meta;

type Story = StoryObj<typeof AutoComplete>;

interface IOptionProps {
  value: string;
  number: number;
}

interface IGithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

const value = ["ab", "bc", "bc", "bs", "aq"];

const optionList = [
  { value: "ab", number: 66 },
  { value: "bc", number: 23 },
  { value: "bc", number: 48 },
  { value: "bs", number: 51 },
  { value: "aq", number: 13 },
];

const handleFetch = (query: string) => {
  return value
    .filter((item) => item.includes(query))
    .map((item) => ({ value: item }));
};

const dataSourceObject = (query: string) => {
  return optionList.filter((item) => item.value.includes(query));
};

const handleAsynchronous = async (query: string) => {
  const resp = await fetch(`https://api.github.com/search/users?q=${query}`);
  const data = await resp.json();
  return data.items.slice(0, 10).map((item: any) => ({
    value: item.login,
    ...item,
  }));
};
const renderOptionAsync = (item: DataSourceType<IGithubUserProps>) => {
  return (
    <>
      <h2>Name: {item.value}</h2>
      <p>Number: {item.url}</p>
    </>
  );
};

const renderOptionObject = (item: DataSourceType<IOptionProps>) => {
  return (
    <>
      <h2>Name: {item.value}</h2>
      <p>Number: {item.number}</p>
    </>
  );
};

const renderOption = (item: DataSourceType) => {
  return <h2>Name: {item.value}</h2>;
};

/**
 * 默认的autoComplete
 */
export const Default: Story = {
  args: {
    fetchSuggestions: handleFetch,
    placeholder: "请输入...",
  },
};

/**
 * 自定义autoComplete
 */
export const CustomRenderOption: Story = {
  args: {
    fetchSuggestions: handleFetch,
    placeholder: "输入之后就是自定义的...",
    renderOption: renderOption,
  },
};

/**
 * 数据源有多个属性
 */
export const CustomRenderOptionObject: Story = {
  args: {
    fetchSuggestions: dataSourceObject,
    placeholder: "数据源有多个属性...",
    renderOption: renderOptionObject,
  },
};

export const AsyncRenderOption: Story = {
  args: {
    fetchSuggestions: handleAsynchronous,
    placeholder: "数据源有多个属性...",
    renderOption: renderOptionAsync,
  },
};
