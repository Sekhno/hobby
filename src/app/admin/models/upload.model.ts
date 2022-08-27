
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
  name: string,
  description: string
  orientation: "vertical" | "horizontal"
  title: string,
  url: {
    compress: string,
    original: string
  }
}



export type UploadInitialState = {
  data: FileDataType[]
}
