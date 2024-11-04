import { type JSX, Show } from "solid-js";

import { useFileUploadItemContext } from "../context";

export type FileUploadItemPreviewProps = {
  children: JSX.Element;
  type?: string;
};

export const FileUploadItemPreview = (props: FileUploadItemPreviewProps) => {
  const { file } = useFileUploadItemContext();

  return (
    <Show when={file.type.match(props.type ?? ".*")} fallback={null}>
      <div {...props}>{props.children}</div>
    </Show>
  );
};
