import type { JSX } from "solid-js";

import { useFileUploadItemContext, useFileUploadContext } from "../context";

export type FileUploadItemDeleteTriggerProps = JSX.IntrinsicElements["button"] & {
  children?: JSX.Element;
};

export const FileUploadItemDeleteTrigger = (props: FileUploadItemDeleteTriggerProps) => {
  const context = useFileUploadContext();
  const { file } = useFileUploadItemContext();

  const handleDelete = () => {
    if (context.disabled) {
      return;
    }
    context.removeFile(file);
  };

  return (
    <button onClick={handleDelete} disabled={context.disabled} {...props}>
      {props.children}
    </button>
  );
};
