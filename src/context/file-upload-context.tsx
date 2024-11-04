import type { JSX } from "solid-js";

import { type FileUploadContextValue, useFileUploadContext } from "./file-upload-root-context";

export type FileUploadContextProps = {
  children: (context: FileUploadContextValue) => JSX.Element;
};

export const FileUploadContext = (props: FileUploadContextProps) =>
  props.children(useFileUploadContext());
