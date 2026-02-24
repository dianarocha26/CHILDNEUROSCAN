export type Language = 'en' | 'es';

export interface Translations {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
    signIn: string;
    description: string;
  };
  features: {
    title: string;
    tracking: {
      title: string;
      description: string;
    };
    analysis: {
      title: string;
      description: string;
    };
    resources: {
      title: string;
      description: string;
    };
    community: {
      title: string;
      description: string;
    };
  };
}
