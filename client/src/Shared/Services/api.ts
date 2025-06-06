const API_BASE_URL = 'https://kaspi-rjrq.onrender.com/api';

class ApiError extends Error {
  constructor(public code: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiService {
  private static async fetchWithAuth(endpoint: string, options?: RequestInit) {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options?.headers || {})
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    if (!response.ok) {
      const error = await response.json();
      throw new ApiError(response.status, error.message);
    }

    return response.json();
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    return this.fetchWithAuth('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }

  static async register(userData: Partial<User>): Promise<AuthResponse> {
    return this.fetchWithAuth('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  static async getCurrentUser(): Promise<User> {
    return this.fetchWithAuth('/users/me');
  }

  static async getUserAccounts(userId: string): Promise<Account[]> {
    return this.fetchWithAuth(`/users/${userId}/accounts`);
  }

  static async logout(): Promise<void> {
    return this.fetchWithAuth('/users/logout', { method: 'POST' });
  }
}

export default ApiService;
