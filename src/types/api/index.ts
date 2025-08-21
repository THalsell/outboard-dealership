// API request and response type definitions
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ApiMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface ApiMeta {
  page?: number;
  limit?: number;
  total?: number;
  hasMore?: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams extends PaginationParams {
  query?: string;
  filters?: Record<string, any>;
}

export interface ProductFilters {
  brand?: string[];
  horsepower?: { min?: number; max?: number };
  price?: { min?: number; max?: number };
  type?: string[];
  condition?: string[];
  inStock?: boolean;
  year?: { min?: number; max?: number };
}

export interface PartFilters {
  category?: string[];
  brand?: string[];
  compatibility?: string[];
  price?: { min?: number; max?: number };
  inStock?: boolean;
}