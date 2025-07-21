export type Coords = { lat: number; lng: number; };
export type City = {
  name: string;
  continent: string;
  active: boolean;
  country: string;
  description: string;
  image: string;
  coords: Coords;
};

