import type { JSX } from "solid-js";

export type FileUploadItemGroupProps = JSX.IntrinsicElements["ul"] & {
  children?: JSX.Element;
};

export const FileUploadItemGroup = (props: FileUploadItemGroupProps) => {
  return <ul {...props}>{props.children}</ul>;
};
