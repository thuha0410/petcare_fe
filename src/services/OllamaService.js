import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class OllamaService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: BASE_URL,
      timeout: 60000, // Longer timeout for AI responses (60 seconds)
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    // Add interceptor to include auth token if available
    this.apiClient.interceptors.request.use(config => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  /**
   * Send message to the chatbot
   * @param {string} message - User's message
   * @param {string} userId - User identifier
   * @param {object} projectAnalysis - Any context information
   * @param {object} bookingState - Current booking flow state
   * @param {AbortSignal} signal - AbortController signal for cancellation
   * @returns {Promise} - API response
   */
  sendMessage(message, userId, projectAnalysis = null, bookingState = null, signal = null) {
    const payload = {
      message: message,
      userId: userId
    };

    // Add additional context if available
    if (projectAnalysis) {
      payload.context = projectAnalysis;
    }

    if (bookingState) {
      payload.booking_state = bookingState;
    }

    return this.apiClient.post('/chatbot/chat', payload, { signal });
  }

  /**
   * Send feedback about a chatbot interaction
   * @param {number} interactionId - ID of the interaction
   * @param {boolean} isHelpful - Was the response helpful
   * @param {string} comment - Optional user comment
   * @returns {Promise} - API response
   */
  sendFeedback(interactionId, isHelpful, comment = null) {
    const payload = {
      interaction_id: interactionId,
      is_helpful: isHelpful
    };

    if (comment) {
      payload.comment = comment;
    }

    return this.apiClient.post('/chatbot/feedback', payload);
  }

  /**
   * Get predefined questions for suggestions
   * @returns {Promise} - API response with suggested questions
   */
  getPredefinedQuestions() {
    return this.apiClient.get('/chatbot/suggested-questions');
  }

  /**
   * Analyze project structure and capabilities
   * @returns {Promise} - Analysis results
   */
  analyzeProject() {
    return this.apiClient.get('/admin/check-ollama');
  }

  /**
   * Fetch data from API
   * @param {string} endpoint - API endpoint
   * @returns {Promise} - API response
   */
  fetchData(endpoint) {
    return this.apiClient.get(`/${endpoint}`);
  }

  /**
   * Confirm booking
   * @param {number} reservationId - Reservation ID
   * @param {string} paymentMethod - Payment method
   * @param {number} amount - Payment amount
   * @returns {Promise} - API response
   */
  confirmBooking(reservationId, paymentMethod, amount) {
    return this.apiClient.post('/reservations/confirm', {
      reservation_id: reservationId,
      payment_method: paymentMethod,
      amount: amount
    });
  }

  /**
   * Check if Ollama server is running
   * @returns {Promise} - Status check response
   */
  checkOllamaStatus() {
    return this.apiClient.get('/admin/check-ollama');
  }
}

export default new OllamaService(); 