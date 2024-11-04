import type { JSX, Component } from "solid-js";

import { FileUploadItemProvider } from "../context/file-upload-item-context";

export type FileUploadItemProps = JSX.IntrinsicElements["li"] & {
  children?: JSX.Element;
  // pass file as prop
  file: File;
};

export const FileUploadItem: Component<FileUploadItemProps> = (props) => {
  return (
    <FileUploadItemProvider file={props.file}>
      <li {...props}>{props.children}</li>
    </FileUploadItemProvider>
  );
};
