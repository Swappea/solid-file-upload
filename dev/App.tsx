import { For } from "solid-js";

import {
  FileUploadRoot,
  FileUploadLabel,
  FileUploadDropZone,
  FileUploadHiddenInput,
  FileUploadTrigger,
  FileUploadItemGroup,
  FileUploadRootContext,
  FileUploadItem,
  FileUploadItemPreview,
  FileUploadItemPreviewImage,
  FileUploadItemName,
  FileUploadItemSize,
  FileUploadItemDeleteTrigger,
} from "src";

import styles from "./App.module.css";

const App = () => {
  return (
    <div class={styles.App}>
      <FileUploadRoot
        class={styles.fileUpload}
        multiple
        maxFiles={5}
        onFileAccept={data => console.log("data", data)}
        onFileReject={data => console.log("data", data)}
        onFileChange={data => console.log("data", data)}
      >
        <FileUploadLabel class={styles.fileUpload__label}>File Upload</FileUploadLabel>
        <FileUploadDropZone class={styles.fileUpload__dropzone}>
          Drop your files here...
          <FileUploadTrigger class={styles.fileUpload__trigger}>Choose files!</FileUploadTrigger>
        </FileUploadDropZone>
        <FileUploadHiddenInput />
        <FileUploadItemGroup class={styles.fileUpload__itemGroup}>
          <FileUploadRootContext>
            {context => {
              return (
                <For each={context.acceptedFiles}>
                  {file => (
                    <FileUploadItem file={file} class={styles.fileUpload__item}>
                      <FileUploadItemPreview type="image/*" class={styles.fileUpload__itemPreview}>
                        <FileUploadItemPreviewImage class={styles.fileUpload__itemPreviewImage} />
                      </FileUploadItemPreview>
                      <FileUploadItemName class={styles.fileUpload__itemName} />
                      <FileUploadItemSize class={styles.fileUpload__itemSize} />
                      <FileUploadItemDeleteTrigger class={styles.fileUpload__itemDeleteTrigger}>
                        Delete
                      </FileUploadItemDeleteTrigger>
                    </FileUploadItem>
                  )}
                </For>
              );
            }}
          </FileUploadRootContext>
        </FileUploadItemGroup>
      </FileUploadRoot>
    </div>
  );
};

export default App;
