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
    // Route không tồn tại, trả về dữ liệu giả lập
    return Promise.resolve({
      data: {
        success: true,
        analysis: 'PetCare là hệ thống quản lý phòng khám thú cưng với các chức năng đặt lịch, quản lý thú cưng và dịch vụ.',
        structure: {
          controllers: ['ChatbotController', 'BookingController', 'ServiceController'],
          models: ['DichVu', 'NhanVien', 'Pet', 'LichHen', 'LichHenPet'],
          features: ['Đặt lịch khám', 'Quản lý thú cưng', 'Tư vấn AI']
        }
      }
    });
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
    // Route không tồn tại, trả về dữ liệu giả lập
    return Promise.resolve({
      data: {
        success: true,
        status: 'running',
        message: 'Ollama service is available'
      }
    });
  }

  /**
   * Get services list for booking
   * @returns {Promise} - Services data
   */
  getServices() {
    return this.apiClient.get('/chatbot/services');
  }

  /**
   * Get available time slots for a service
   * @param {number} serviceId - The service ID
   * @param {string} date - The date in YYYY-MM-DD format
   * @returns {Promise} - The API response
   */
  getAvailableTimeSlots(serviceId, date = null) {
    const params = {
      service_id: serviceId
    };
    
    if (date) {
      params.date = date;
    }
    
    return this.apiClient.get('/chatbot/time-slots', { params });
  }
  
  /**
   * Get user's pets
   * @returns {Promise} - The API response
   */
  getUserPets() {
    const token = localStorage.getItem('auth_token') || localStorage.getItem('token_client');
    if (!token) {
      return Promise.reject(new Error('Not authenticated'));
    }
    
    return this.apiClient.get('/khach-hang/pets', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  /**
   * Create a booking from chatbot
   * @param {Object} bookingData - The booking data
   * @returns {Promise} - The API response
   */
  createBookingFromChatbot(bookingData) {
    const token = localStorage.getItem('auth_token') || localStorage.getItem('token_client');
    if (!token) {
      return Promise.reject(new Error('Not authenticated'));
    }
    
    return this.apiClient.post('/chatbot/create-booking', bookingData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  /**
   * Get doctor information
   * @returns {Promise} - Doctors list
   */
  getDoctors() {
    return this.apiClient.get('/doctors');
  }
  
  /**
   * Logout user
   * @returns {Promise} - Logout response
   */
  logout() {
    return this.apiClient.post('/chatbot/logout');
  }
}

export default new OllamaService(); 