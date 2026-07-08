

export interface ITechnician {
    bio: string;
    skills: string;
    experience: string;
    pricing: number
}

export interface ITechnicianQuery {
  searchTerm?: string;
  location?: string;
  page?: string;
  limit?: string;
}