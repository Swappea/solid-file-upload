import type { JSX } from "solid-js";

import { FileUploadItemProvider } from "../context/file-upload-item-context";

export type FileUploadItemProps = {
  children: JSX.Element;
  // pass file as prop
  file: File;
};

export const FileUploadItem = (props: FileUploadItemProps) => {
  return (
    <FileUploadItemProvider file={props.file}>
      <li {...props}>{props.children}</li>
    </FileUploadItemProvider>
  );
};
