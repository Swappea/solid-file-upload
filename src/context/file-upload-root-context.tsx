import { type JSX, createContext, createUniqueId, mergeProps, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import { getFiles, parseAcceptedTypes } from "../utils";

import type { Accept, FileRejection, FileUploadRootOptions } from "../types";

type FileUploadContextProviderProps = FileUploadRootOptions & {
  children: JSX.Element;
};

export type FileUploadContextValue = {
  inputId: string;
  fileInputRef: HTMLInputElement | undefined;
  dropzoneRef: HTMLElement | undefined;
  disabled?: boolean;
  multiple?: boolean;
  accept?: Accept;
  allowDragAndDrop?: boolean;
  processFiles: (files: File[], inputRef: HTMLInputElement) => void;
  acceptedFiles: File[];
  rejectedFiles: FileRejection[];
  removeFile: (file: File, inputRef: HTMLInputElement) => void;
};

export const FileUploadContext = createContext<FileUploadContextValue>();

export const FileUploadProvider = (props: FileUploadContextProviderProps) => {
  const inputId = createUniqueId();
  const fileInputRef: HTMLInputElement | undefined = undefined;
  const dropzoneRef: HTMLElement | undefined = undefined;

  const [acceptedFilesState, setAcceptedFilesState] = createStore<File[]>([]);
  const [rejectedFilesState, setRejectedFilesState] = createStore<FileRejection[]>([]);

  const mergedProps = mergeProps(
    {
      accept: parseAcceptedTypes(props.accept),
      allowDragAndDrop: true,
      disabled: false,
      multiple: false,
      maxFiles: 1,
      maxFileSize: Number.POSITIVE_INFINITY,
      minFileSize: 0,
      validate: undefined,
    },
    props,
  );

  const updateInputElFiles = (files: File[], inputFileRef: HTMLInputElement) => {
    const list = new DataTransfer();
    for (const file of files) {
      list.items.add(file);
    }
    inputFileRef.files = list.files;
  };

  const processFiles = (files: File[], _fileInputRef: HTMLInputElement) => {
    const { acceptedFiles, rejectedFiles } = getFiles(
      files,
      mergedProps.accept,
      mergedProps.multiple,
      mergedProps.maxFiles,
      mergedProps.minFileSize,
      mergedProps.maxFileSize,
      mergedProps.validate,
    );

    if (mergedProps.multiple) {
      setAcceptedFilesState(prevAcceptedFiles => [...prevAcceptedFiles, ...acceptedFiles]);
      setRejectedFilesState(rejectedFiles);
    } else {
      if (acceptedFiles.length > 0 && acceptedFiles.length === 1) {
        if (acceptedFiles[0]) {
          setAcceptedFilesState([acceptedFiles[0]]);
        }
        setRejectedFilesState(rejectedFiles);
      } else if (rejectedFiles.length > 0 && rejectedFiles.length === 1) {
        setRejectedFilesState(rejectedFiles);
      }
    }

    // trigger on file accept
    mergedProps.onFileAccept?.(acceptedFiles);

    // console.log("first", fileInputRef ? fileInputRef!.files : null);
    updateInputElFiles(acceptedFilesState, _fileInputRef);

    // trigger on file reject
    if (rejectedFiles.length > 0) {
      mergedProps.onFileReject?.(rejectedFiles);
    }

    // trigger on change
    mergedProps.onFileChange?.({ acceptedFiles, rejectedFiles });
  };

  const removeFile = (file: File, _fileInputRef: HTMLInputElement) => {
    setAcceptedFilesState(prevAcceptedFiles => prevAcceptedFiles.filter(f => f !== file));

    updateInputElFiles(acceptedFilesState, _fileInputRef);

    // trigger on change
    mergedProps.onFileChange?.({
      acceptedFiles: acceptedFilesState.map(f => f),
      rejectedFiles: rejectedFilesState.map(f => f),
    });
  };

  const value = {
    inputId: inputId,
    fileInputRef: fileInputRef,
    dropzoneRef: dropzoneRef,
    disabled: mergedProps.disabled,
    multiple: mergedProps.multiple,
    accept: mergedProps.accept,
    allowDragAndDrop: mergedProps.allowDragAndDrop,
    processFiles,
    acceptedFiles: acceptedFilesState,
    rejectedFiles: rejectedFilesState,
    removeFile,
  };

  return (
    <FileUploadContext.Provider value={value}>{mergedProps.children}</FileUploadContext.Provider>
  );
};

export const useFileUploadContext = () => {
  const context = useContext(FileUploadContext);

  if (context === undefined) {
    throw new Error("`useFileUploadContext` must be used within a `FileUploadContext` component");
  }

  return context;
};
