export interface ResumeData {
  header: {
    name: string;
    title: string;
    contact: {
      email: string;
      phone: string;
      github: string;
      linkedin: string;
    };
  };
  about: {
    title: string;
    description: string;
  };
  skills: {
    title: string;
    categories: Array<{
      name: string;
      items: string[];
    }>;
  };
  experience: {
    title: string;
    items: Array<{
      company: string;
      position: string;
      period: string;
      description: string[];
    }>;
  };
  projects: {
    title: string;
    items: Array<{
      name: string;
      description: string;
      technologies: string[];
      link?: string;
    }>;
  };
}
