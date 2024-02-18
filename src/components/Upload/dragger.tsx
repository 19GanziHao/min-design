import React, { useState, DragEvent } from "react";
import type { FC, ReactNode } from "react";
import classNames from "classnames";

interface IDraggerProps {
  onFile: (files: FileList) => void;
  children: ReactNode;
}

export const Dragger: FC<IDraggerProps> = (props) => {
  const { onFile, children } = props;
  const [dragOver, setDragOver] = useState(false);

  const classes = classNames("min-uploader-dragger", {
    "is-dragover": dragOver,
  });
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(123)
    setDragOver(false);
    
    onFile(e.dataTransfer.files);
  };
  return (
    <div
      className={classes}
      onDragOver={(e) => {
        handleDrag(e, true);
      }}
      onDragLeave={(e) => {
        handleDrag(e, false);
      }}
      
      onDrop={(e) => handleDrop(e)}
    >
      {children}
    </div>
  );
};
