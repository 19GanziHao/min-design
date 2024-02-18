import type { StoryFn, Meta, StoryObj } from "@storybook/react";
import Icon from "../Icon/icon";
import { Upload } from "./upload";
import { Button } from "../Button/button";

const meta: Meta<typeof Upload> = {
  title: "custom/upload",
  component: Upload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Upload>;

export default meta;

type Story = StoryObj<typeof Upload>;

// export const Default: Story = {
//   args: {
//     action: "https://run.mocky.io/v3/cf4acd74-75fb-4028-9180-d866e79cc5a6",
//     onProgress: (progress, file) => {
//       console.log(progress);
//     },
//     onSuccess: (res, file) => {
//       console.log(res);
//     },
//     onError: (err, file) => {
//       console.log(err, file);
//     },
//   },
// };

export const DefaultUpload: StoryFn<typeof Upload> = (args) => (
  <Upload
    {...args}
    action="https://run.mocky.io/v3/cf4acd74-75fb-4028-9180-d866e79cc5a6"
    onProgress={(progress, file) => {
      console.log(progress);
    }}
    onSuccess={(res, file) => {
      console.log(res);
    }}
    onError={(err, file) => {
      console.log(err, file);
    }}
    name="fileName"
    multiple
  >
    <Button size="lg" btnType="primary">
      上传文件
    </Button>
  </Upload>
);
export const DragUpload: StoryFn<typeof Upload> = (args) => (
  <Upload
    {...args}
    action="https://run.mocky.io/v3/cf4acd74-75fb-4028-9180-d866e79cc5a6"
    name="fileName"
    multiple
    drag
  >
    <Icon icon="upload" size="5x" theme="secondary" />
    <br />
    <p>点击或者拖动到此区域进行上传</p>
  </Upload>
);

export const BCheckUpload: StoryFn<typeof Upload> = (args) => {
  const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
      alert("file too big");
      return false;
    }
    return true;
  };
  return (
    <Upload
      {...args}
      action="https://run.mocky.io/v3/cf4acd74-75fb-4028-9180-d866e79cc5a6"
      beforeUpload={checkFileSize}
    >
      <Button size="lg" btnType="primary">
        <Icon icon="upload" /> 不能传大于50Kb！{" "}
      </Button>
    </Upload>
  );
};
