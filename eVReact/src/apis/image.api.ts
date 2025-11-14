import http from '~/utils/http'

export const URL_UPLOAD_FILES = 'api/upload/files'
export interface UploadedFileDTO {
  url: string
  public_id: string
}

export interface SuccessUpload {
  message: string
  files: UploadedFileDTO[]
}
export const imageApi = {
  uploadFiles(files: File[]) {
    const body = new FormData()
    for (const f of files) {
      body.append('file', f)
    }
    return http.post<SuccessUpload>(URL_UPLOAD_FILES, body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}
