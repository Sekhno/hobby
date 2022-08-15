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
  url: string,
  description: string,
  title: string,
  name: string
}

export type UploadInitialState = {
  data: FileDataType[]
}
