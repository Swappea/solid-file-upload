# SolidJS based File Upload component

## Supported Features

- Upload multiple files simultaneously.
- Drag and drop files for easy uploading.
- Limit the number of files to be uploaded.
- Validate file sizes to meet specified limits.
- Apply custom validation rules to files.
- Restrict uploads to specific file types (e.g., images, documents).
- Show a list of selected files for upload.
- Remove files from the upload list before uploading.
- Preview image files before uploading.
- Display the size of each file in the upload list.
- Customize components with custom styles and classes.

## Documenation and Demo

- <https://solid-file-upload.js.org/>

## Quick start

Install it:

```bash
npm i solid-file-upload
# or
yarn add solid-file-upload
# or
pnpm add solid-file-upload
```

### Import

```tsx
import { FileUpload } from 'solid-file-upload'
```

### Usage

```tsx
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
```
