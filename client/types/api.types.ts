export interface ApiResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message?: string;
  error?: { message?: string };
  errors?: { field: string; message: string }[];
}
