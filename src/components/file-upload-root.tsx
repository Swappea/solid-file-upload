import type { JSX } from "solid-js";

import { FileUploadProvider } from "../context";

import type { FileUploadRootOptions } from "../types";

export type FileUploadRootProps = FileUploadRootOptions & JSX.IntrinsicElements["div"] & {
  children?: JSX.Element;
};

/**
 * The root component for the file upload component.
 */
export const FileUploadRoot = (props: FileUploadRootProps) => {
  return (
    <FileUploadProvider {...props}>
      <div {...props}>{props.children}</div>
    </FileUploadProvider>
  );
};
