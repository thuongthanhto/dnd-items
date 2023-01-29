export interface IFile {
  name: string;
  preview: string;
}

export interface IThumbProps {
  file: IFile;
  removeFile: (file: IFile) => void;
}
