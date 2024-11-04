import { type JSX, createEffect, createSignal, onCleanup } from "solid-js";

import { useFileUploadItemContext } from "../context";

export type FileUploadItemPreviewImageProps = JSX.IntrinsicElements["img"] & {
  children?: JSX.Element;
};

export const FileUploadItemPreviewImage = (props: FileUploadItemPreviewImageProps) => {
  const [url, setUrl] = createSignal<string>("");

  const { file } = useFileUploadItemContext();

  const createFileUrl = (file: File, callback: (url: string) => void) => {
    const win = window;
    const url = win.URL.createObjectURL(file);
    callback(url);
    return () => win.URL.revokeObjectURL(url);
  };

  createEffect(() => {
    const isImage = /^image\//.test(file.type);
    if (!isImage) {
      throw new Error("Preview Image is only supported for image files");
    }

    const cleanup = createFileUrl(file, url => setUrl(url));
    onCleanup(cleanup);
  });

  return <img src={url()} {...props} />;
};
