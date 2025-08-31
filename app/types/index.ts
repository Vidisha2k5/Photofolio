// app/types/index.ts
export interface Photo {
  id: string;
  title: string;
  description?: string;
  src: string;
  alt: string;
  category: string;
  featured?: boolean;
  width: number;
  height: number;
}

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  images: Photo[];
  category: string;
  date: string;
  featured?: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  current?: boolean;
}