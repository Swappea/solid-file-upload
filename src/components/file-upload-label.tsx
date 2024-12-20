import type { JSX } from "solid-js";

import { useFileUploadContext } from "../context";

export type FileUploadLabelProps = JSX.IntrinsicElements["label"] & {
  children?: JSX.Element;
};

export const FileUploadLabel = (props: FileUploadLabelProps) => {
  const context = useFileUploadContext();

  return (
    <label for={context.inputId} {...props}>
      {props.children}
    </label>
  );
};
