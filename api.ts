interface ApiResponse<T> {
  data: T;
}

class ApiService {
  private baseURL: string | undefined;
  private headers: Headers;

  constructor() {
    // Base URL goes here, most likely process.env.BASE_URL
    this.baseURL = "http://localhost:3000";

    // Access token goes here, most likely process.env.ACCESS_TOKEN
    const accessToken = "access_token_123";

    this.headers = new Headers();
    this.headers.append("Accept", "application/json");
    this.headers.append("Authorization", `Bearer ${accessToken}`);
  }

  async get<T>(url: string): Promise<ApiResponse<T>> {
    const headers = new Headers(this.headers);

    const response = await fetch(`${this.baseURL}${url}`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
    return responseData;
  }

  async post<T>(
    url: string,
    data: {
      [key: string]: unknown;
    }
  ): Promise<ApiResponse<T>> {
    const headers = new Headers(this.headers);
    headers.append("Content-Type", "application/json");

    const response = await fetch(`${this.baseURL}${url}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
    return responseData.data;
  }

  async patch<T>(
    url: string,
    data: {
      [key: string]: unknown;
    }
  ): Promise<ApiResponse<T>> {
    const headers = new Headers(this.headers);
    headers.append("Content-Type", "application/json");

    const response = await fetch(`${this.baseURL}${url}`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
    return responseData.data;
  }

  async upload<T>(url: string, file: File): Promise<ApiResponse<T>> {
    const headers = new Headers(this.headers);

    const fd = new FormData();
    fd.append("file", file);

    const response = await fetch(`${this.baseURL}${url}`, {
      method: "POST",
      headers: headers,
      body: fd,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
    return responseData.data;
  }
}
