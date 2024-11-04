import type { JSX } from "solid-js";

import { useFileUploadContext } from "../context";

export type FileUploadHiddenInputProps = JSX.IntrinsicElements["input"] & {
  children?: JSX.Element;
};

export const FileUploadHiddenInput = (props: FileUploadHiddenInputProps) => {
  const context = useFileUploadContext();

  const onInput: JSX.ChangeEventHandler<HTMLInputElement, Event> = event => {
    if (context.disabled) {
      return;
    }

    const { files } = event.currentTarget;
    context.processFiles(Array.from(files ?? []));
  };

  return (
    <input
      type="file"
      id={context.inputId}
      accept={Array.isArray(context.accept) ? context.accept.join(",") : context.accept}
      multiple={context.multiple}
      ref={(el: HTMLInputElement) => (context.fileInputRef = el)}
      style={{ display: "none" }}
      onChange={onInput}
      {...props}
    />
  );
};
