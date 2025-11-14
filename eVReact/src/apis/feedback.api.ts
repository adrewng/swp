import type { FeedbackType } from '~/types/feedback.type'
import http from '~/utils/http'

const feedbackApi = {
  createFeedback(formData: FeedbackType) {
    return http.post('/api/feedbacks', formData)
  }
}
export default feedbackApi
