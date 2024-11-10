import { For, Show, createResource } from "solid-js";

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

import { ThemeToggle } from "./components/ThemeToggle";

import styles from "./App.module.css";

function fetchPackageVersion() {
  return fetch(`https://registry.npmjs.org/solid-file-upload/latest`).then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch package data");
    }
    return response.json();
  });
}

const App = () => {
  const [packageVersion] = createResource(fetchPackageVersion);

  return (
    <div class="container-fluid">
      <header class="header">
        <h1>SolidJS File Upload</h1>
        <div class="right-header">
          <div>
            <Show when={packageVersion()}>
              <div>Version: {packageVersion()?.version}</div>
            </Show>
          </div>
          <ThemeToggle />
          <a
            href="https://github.com/Swappea/solid-file-upload"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="./github-mark.png"
              alt="github repo for solid file upload"
              class="github-logo"
            />
          </a>
        </div>
      </header>
      <main class="main">
        <section class="features">
          <ul>
            <li>
              Upload <strong>multiple</strong> files simultaneously.
            </li>
            <li>
              Drag and drop files for <strong>easy</strong> uploading.
            </li>
            <li>
              Limit the <strong>number</strong> of files to be uploaded.
            </li>
            <li>
              Validate file <strong>sizes</strong> to meet specified limits.
            </li>
            <li>
              Apply custom <strong>validation</strong> rules to files.
            </li>
            <li>
              Restrict uploads to specific <strong>file types</strong> (e.g., images, documents).
            </li>
            <li>
              Show a <strong>list</strong> of selected files for upload.
            </li>
            <li>
              <strong>Remove</strong> files from the upload list before uploading.
            </li>
            <li>
              <strong>Preview</strong> image files before uploading.
            </li>
            <li>
              Display the <strong>size</strong> of each file in the upload list.
            </li>
            <li>
              Customize components with custom <strong>styles</strong> and classes.
            </li>
          </ul>
        </section>
        <section class="demo">
          <h3>Demo:</h3>
          <div>
            <FileUploadRoot
              class={"fileUpload"}
              multiple
              maxFiles={5}
              onFileAccept={data => console.log("data", data)}
              onFileReject={data => console.log("data", data)}
              onFileChange={data => console.log("data", data)}
            >
              <FileUploadLabel class={"fileUpload__label"}>File Upload</FileUploadLabel>
              <FileUploadDropZone class={"fileUpload__dropzone"}>
                Drop your files here...
                <FileUploadTrigger class={"fileUpload__trigger"}>Choose files!</FileUploadTrigger>
              </FileUploadDropZone>
              <FileUploadHiddenInput />
              <FileUploadItemGroup class={"fileUpload__itemGroup"}>
                <FileUploadRootContext>
                  {context => {
                    return (
                      <For each={context.acceptedFiles}>
                        {file => (
                          <FileUploadItem file={file} class={"fileUpload__item"}>
                            <FileUploadItemPreview type="image/*" class={"fileUpload__itemPreview"}>
                              <FileUploadItemPreviewImage class={"fileUpload__itemPreviewImage"} />
                            </FileUploadItemPreview>
                            <FileUploadItemName class={"fileUpload__itemName"} />
                            <FileUploadItemSize class={"fileUpload__itemSize"} />
                            <FileUploadItemDeleteTrigger class={"fileUpload__itemDeleteTrigger"}>
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
        </section>
        <section class="installation">
          <h3>Installation:</h3>
          <div class="installation">
            <pre class="pre">
              <code>npm install solid-file-upload</code>
              <button
                class="copy-button"
                onClick={() => navigator.clipboard.writeText("npm install solid-file-upload")}
              >
                <img src="./copy-icon-black.png" alt="copy icon" class="copy-icon" />
              </button>
            </pre>
            <div class="or-container">
              <span>or</span>
            </div>
            <pre class="pre">
              <code>yarn add solid-file-upload</code>
              <button
                class="copy-button"
                onClick={() => navigator.clipboard.writeText("yarn add solid-file-upload")}
              >
                <img src="./copy-icon-black.png" alt="copy icon" class="copy-icon" />
              </button>
            </pre>
            <div class="or-container">
              <span>or</span>
            </div>
            <pre class="pre">
              <code>pnpm add solid-file-upload</code>
              <button
                class="copy-button"
                onClick={() => navigator.clipboard.writeText("pnpm add solid-file-upload")}
              >
                <img src="./copy-icon-black.png" alt="copy icon" class="copy-icon" />
              </button>
            </pre>
            <h5>Import:</h5>
            <pre class="pre">
              <code>import &#123; FileUpload &#125; from 'solid-file-upload';</code>
              <button
                class="copy-button"
                onClick={() =>
                  navigator.clipboard.writeText(`import { FileUpload } from 'solid-file-upload'`)
                }
              >
                <img src="./copy-icon-black.png" alt="copy icon" class="copy-icon" />
              </button>
            </pre>
            <h5>Usage:</h5>
            <pre class="pre">
              <code>{`<FileUploadRoot
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
</FileUploadRoot>`}</code>
            </pre>
          </div>
        </section>
        <section class="links">
          <h4>Links:</h4>
          <ul>
            <li>
              <a
                href="https://github.com/Swappea/solid-file-upload"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github Repo
              </a>
            </li>
            <li>
              <a
                href="https://www.npmjs.com/package/solid-file-upload"
                target="_blank"
                rel="noopener noreferrer"
              >
                NPM Package
              </a>
            </li>
          </ul>
        </section>
        <section class="inspiration">
          <h4>Inspiration:</h4>
          <p>
            I orginally contributed this component as part of Solid Hack 2024 to the{" "}
            <a
              href="https://kobalte.dev/docs/core/overview/introduction/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kobalte library
            </a>
            . Checkout their wonderful library for more SolidJS components.
          </p>
        </section>
      </main>

      <footer class="footer">
        <div class="copyright">Copyright © 2024 SolidJS File Upload authors.</div>
        <div class="authors">
          Made with ❤️ by{" "}
          <a href="https://github.com/Swappea" target="_blank" rel="noopener noreferrer">
            Swapnesh Sangle
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
