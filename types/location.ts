export interface Location {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  isUrgent: boolean;
  locationId: string;
  imageUri: string | null;
}