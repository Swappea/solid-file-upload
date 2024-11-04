import type { JSX } from "solid-js";

import { useFileUploadItemContext } from "../context";

export type FileUploadItemNameProps = JSX.IntrinsicElements["div"] & {
  children?: JSX.Element;
};

export const FileUploadItemName = (props: FileUploadItemNameProps) => {
  const { file } = useFileUploadItemContext();

  return <div {...props}>{props.children || file.name}</div>;
};
