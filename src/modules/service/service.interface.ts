export interface IService {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  image?: string
}


export interface IServiceQuery {
  searchTerm?: string;
  categoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  location?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}