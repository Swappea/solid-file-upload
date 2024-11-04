export type FileError =
  | "TOO_MANY_FILES"
  | "FILE_INVALID_TYPE"
  | "FILE_TOO_LARGE"
  | "FILE_TOO_SMALL";

export type FileRejection = {
  file: File;
  errors: FileError[];
};

export type Details = {
  acceptedFiles: File[];
  rejectedFiles: FileRejection[];
};

export type Accept = string | string[] | undefined;

export type FileUploadRootOptions = {
  // allow multiple files to be uploaded
  multiple?: boolean;
  // disable the file upload
  disabled?: boolean;
  // accept file types to be uploaded
  accept?: Accept;
  // maximum number of files that can be uploaded
  maxFiles?: number;
  // allow drag and drop of files
  allowDragAndDrop?: boolean;
  // maximum file size allowed
  maxFileSize?: number;
  // minimum file size allowed
  minFileSize?: number;
  // callback when files are accepted
  onFileAccept?: (files: File[]) => void;
  // callback when files are rejected
  onFileReject?: (files: FileRejection[]) => void;
  // callback when files are changed
  onFileChange?: (details: Details) => void;
  // validate files before uploading
  validate?: (file: File) => FileError[] | null;
};
