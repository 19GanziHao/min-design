import React, { useRef, ChangeEvent, useState } from "react";
import type { ReactNode, FC } from "react";
import axios from "axios";
import { Button } from "../Button/button";
import { UploadList } from "./uploadList";
import { Dragger } from "./dragger";
export type UploadFileStatus = "ready" | "uploading" | "success" | "error";

/**
 * 上传文件的类型
 */
export interface IUploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number; // 百分比
  raw?: File; // 源文件
  response?: any;
  error?: any;
}

export interface IUploadProps {
  /**
   * 发送的地址
   */
  action: string;
  /**
   * 上传的文件列表
   */
  defaultFileList?: IUploadFile[];
  /**
   * 上传之前进行的回调
   */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /**
   * 进度条处理函数
   */
  onProgress?: (percentage: number, file: IUploadFile) => void;
  /**
   * 成功回调
   */
  onSuccess?: (data: any, file: IUploadFile) => void;
  /**
   * 错误回调
   */
  onError?: (err: any, file: IUploadFile) => void;
  /**
   * 在结果后进行回调
   */
  onChange?: (file: IUploadFile) => void;
  /**
   * 文件列表移除文件时的钩子
   * */
  onRemove?: (file: IUploadFile) => void;
  /**
   * 自定义发送头
   */
  headers?: { [key: string]: any };
  /**
   * 发送文件的名字
   */
  name?: string;
  /**
   * 额外的属性
   */
  data?: { [key: string]: any };
  /**
   * 是否携带cookie
   */
  withCredentials?: boolean;
  /**
   * 限制文件类型
   */
  accept?: string;
  /**
   * 是否多选
   */
  multiple?: boolean;

  children: ReactNode;
  /**
   * 是否支持拖拽上传
   */
  drag?: boolean;
}

/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 *
 * ~~~js
 * import { Upload } from 'min-design'
 * ~~~
 */
export const Upload: FC<IUploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onError,
    onProgress,
    onSuccess,
    onChange,
    onRemove,
    headers,
    name = "file",
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props;
  const [fileList, setFileList] = useState<IUploadFile[]>(
    defaultFileList || []
  );
  const fileInput = useRef<HTMLInputElement>(null);
  // 调用上传文件的处理
  const handleClick = () => {
    fileInput.current?.click();
  };
  // 更新文件 状态
  const updateFileList = (
    updateFile: IUploadFile,
    updateObj: Partial<IUploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        return file.uid === updateFile.uid ? { ...file, ...updateObj } : file;
      });
    });
  };
  // 上传文件的处理
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    uploadFiles(files);
    if (fileInput.current) fileInput.current.value = "";
  };
  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const res = beforeUpload(file);
        if (res && res instanceof Promise) {
          res.then((processedFile) => {
            post(processedFile);
          });
        } else if (res !== false) {
          post(file);
        }
      }
    });
  };
  const post = (file: File) => {
    const _file: IUploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList((prevList) => [_file, ...prevList]);

    const formData = new FormData();
    formData.append(name, file);
    data &&
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        withCredentials,
        // 进度回调
        onUploadProgress: (e) => {
          let percentage =
            Math.round((e.loaded * 100) / (e.total as number)) || 0;
          console.log(percentage);
          if (percentage < 100) {
            // 更新文件状态
            updateFileList(_file, { status: "uploading", percent: percentage });
            // _file.status = "uploading";
            // _file.percent = percentage;
            onProgress && onProgress(percentage, _file);
          }
        },
      })
      .then((resp) => {
        updateFileList(_file, { status: "success", response: resp.data });
        onSuccess && onSuccess(resp.data, _file);
        onChange && onChange(_file);
      })
      .catch((err) => {
        updateFileList(_file, { status: "error", error: err.message });
        onError && onError(err, _file);
        onChange && onChange(_file);
      });
  };
  const handleFileRemove = (file: IUploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    onRemove && onRemove(file);
  };
  console.log(fileList);
  return (
    <div className="min-upload-component">
      <div
        className="min-upload-input"
        style={{ display: "inline-block" }}
        onClick={handleClick}
      >
        {drag ? (
          <Dragger
            onFile={(files) => {
              uploadFiles(files);
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}
        <input
          ref={fileInput}
          type="file"
          className="min-file-input"
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
        />
      </div>

      <UploadList fileList={fileList} onRemove={handleFileRemove} />
    </div>
  );
};
