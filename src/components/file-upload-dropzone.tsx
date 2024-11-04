import { type JSX, createSignal } from "solid-js";

import { useFileUploadContext } from "../context";

import { isDragEventWithFiles } from "../utils";

export type FileUploadDropZoneProps = JSX.IntrinsicElements["div"] & {
  children?: JSX.Element;
};

export const FileUploadDropZone = (props: FileUploadDropZoneProps) => {
  const [isDragging, setIsDragging] = createSignal(false);
  const context = useFileUploadContext();

  return (
    <div
      aria-label="dropzone"
      role="button"
      tabindex="0"
      aria-disabled={context.disabled}
      data-dragging={isDragging()}
      ref={(el: HTMLDivElement) => (context.dropzoneRef = el)}
      onClick={(event: MouseEvent) => {
        // if label is within file dropzone, avoid opening up file dialog
        if ((event.target as HTMLInputElement).tagName === "LABEL") {
          event.stopPropagation();
        } else {
          // open the hidden input
          context.fileInputRef?.click();
        }
      }}
      onKeyDown={(event: KeyboardEvent) => {
        if (event.defaultPrevented) {
          return;
        }
        if (event.key !== "Enter" && event.key !== " ") {
          return;
        }
        // open the file dialog if user presses space and enter key
        context.fileInputRef?.click();
      }}
      onDragOver={(event: DragEvent) => {
        if (!context.allowDragAndDrop || context.disabled) {
          return;
        }
        event.preventDefault();

        try {
          if (event.dataTransfer) {
            event.dataTransfer.dropEffect = "copy";
          }
        } catch {}
        if ((event.dataTransfer?.items ?? []).length > 0) {
          setIsDragging(true);
        }
      }}
      onDragLeave={() => {
        if (!context.allowDragAndDrop || context.disabled) {
          return;
        }
        setIsDragging(false);
      }}
      onDrop={(event: DragEvent) => {
        if (context.allowDragAndDrop) {
          event.preventDefault();
          event.stopPropagation();
        }

        const isFilesEvent = isDragEventWithFiles(event);
        if (context.disabled || !isFilesEvent) {
          return;
        }
        const files = event.dataTransfer?.files;
        const fileList = Array.from(files ?? []);
        context.processFiles(fileList);
      }}
      {...props}
    >
      {props.children}
    </div>
  );
};
