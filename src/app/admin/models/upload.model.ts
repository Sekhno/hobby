
export type FileUpload = {
  name: string,
  url: string,
  file: File,
  lastModified: number,
  lastModifiedDate: Date,
  size: number,
  type: string // "image/jpeg"
}

export type FileDataType = {
  id: string,
  name: string,
  description: string
  orientation: "vertical" | "horizontal"
  title: string,
  url: {
    compress: string,
    original: string
  }
}

export type CategoryDataType = {
  name: string;
  cover: string | null;
}

export type CategoryItemType = {
  name: string,
  data: FileDataType[]
}



export type UploadInitialState = {
  data: FileDataType[]
}

export const COLLECTION_CATEGORIES = 'categories';
export const COLLECTION_IMAGES = 'images';
