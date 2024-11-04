import { splitProps, type JSX } from "solid-js";

import { useFileUploadContext } from "../context";

export type FileUploadTriggerProps = JSX.IntrinsicElements["button"] & {
  children?: JSX.Element;
  onClick?: (event: MouseEvent) => void;
};

export const FileUploadTrigger = (props: FileUploadTriggerProps) => {
  const context = useFileUploadContext();

  // separate out onClick event to avoid overriding defined onClick event
  const [local, other] = splitProps(props, ["onClick"]);

  const onClick: JSX.EventHandlerUnion<any, MouseEvent> = event => {
    // if button is within dropzone ref, avoid trigger of file dialog for button
    if (context.dropzoneRef?.contains(event.target as HTMLElement)) {
      event.stopPropagation();
    }
    // open the hidden input
    context.fileInputRef?.click();

    // if parent passes onClick, call it
    local.onClick?.(event);
  };

  return (
    <button disabled={!!context.disabled} id={context.inputId} onClick={onClick} {...other}>
      {props.children}
    </button>
  );
};
