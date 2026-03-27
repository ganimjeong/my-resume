export interface ResumeData {
  header: {
    name: string;
    title: string;
    greeting: string;
    hashtags: string[];
    contact: {
      email: string;
      phone: string;
      github: string;
      service: string;
    };
  };
  ui: {
    copied: string;
    printLabel: string;
  };
  about: {
    title: string;
    description: Array<{ text: string; bold?: boolean }>;
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
      siteLink?: string;
      githubLink?: string;
      siteLabel?: string;
      githubLabel?: string;
    }>;
  };
  awards: {
    title: string;
    items: Array<{
      award: string;
      description: string;
    }>;
  };
  languages: {
    title: string;
    items: Array<{
      name: string;
      level: string;
      description: string[];
    }>;
  };
}
