import http from '~/utils/http'

export type AskResponse = { answer: string }

const URL = '/api/gemini/ask'

const aiApi = {
  getAnswer(prompt: string, signal?: AbortSignal) {
    return http.post<AskResponse>(URL, { prompt }, { signal })
  }
}

export default aiApi
