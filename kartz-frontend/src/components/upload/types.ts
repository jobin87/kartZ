import type { BoxProps } from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import type { DropzoneOptions } from 'react-dropzone';

import type { FileThumbnailProps } from '../file-thumbnail';

// ----------------------------------------------------------------------

export type FileUploadType = File | string | null;

export type FilesUploadType = (File | string)[];

export type SingleFilePreviewProps = BoxProps & {
  file: File | string;
};

export type MultiFilePreviewProps = BoxProps & {
  files: FilesUploadType;
  lastNode?: React.ReactNode;
  firstNode?: React.ReactNode;
  onRemove: UploadProps['onRemove'];
  thumbnail: UploadProps['thumbnail'];
  slotProps?: {
    thumbnail?: Omit<FileThumbnailProps, 'file'>;
  };
};

export type UploadProps = DropzoneOptions & {
  error?: boolean;
  sx?: SxProps<Theme>;
  className?: string;
  thumbnail?: boolean;
  defaultImageUrl?: string;
  onDelete?: () => void;
  onUpload?: (files?: File[] | any) => any;
  onRemoveAll?: () => void;
  helperText?: React.ReactNode;
  placeholder?: React.ReactNode;
  value?: FileUploadType | FilesUploadType;
  onRemove?: (file: File | string) => void;
};
