import type { JSX } from "solid-js";

import { useFileUploadItemContext } from "../context";

export type FileUploadItemSizeProps = {
  children: JSX.Element;
  // number of decimal places to round to
  precision?: number;
  // ability to override the default formatSize function
  formatSize?: (bytes: number, precision?: number) => string;
};

const formatBytesByPrecisio = (bytes: number, precision = 2): string => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(precision))} ${sizes[i]}`;
};

export const FileUploadItemSize = (props: FileUploadItemSizeProps) => {
  const { file } = useFileUploadItemContext();

  return (
    <div {...props}>
      {props.formatSize
        ? props.formatSize(file.size, props.precision)
        : formatBytesByPrecisio(file.size, props.precision)}
    </div>
  );
};
