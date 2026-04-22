// Site-wide SEO + i18n configuration

export const SITE_URL = 'https://ghassen-bahroun.pages.dev';
export const SITE_NAME = 'Ghassen Bahroun';
export const SITE_AUTHOR = 'Ghassen Bahroun';
export const GITHUB_URL = 'https://github.com/XxAKLONxX';
export const EMAIL = 'ghassenbahroun@yahoo.fr';
export const PHONE = '+216 58851996';

export type Locale = 'en' | 'fr' | 'ar';
export const locales: Locale[] = ['en', 'fr', 'ar'];
export const defaultLocale: Locale = 'en';

export const localeMeta: Record<Locale, { name: string; native: string; flag: string; dir: 'ltr' | 'rtl'; htmlLang: string }> = {
  en: { name: 'English', native: 'English', flag: '🇬🇧', dir: 'ltr', htmlLang: 'en' },
  fr: { name: 'French', native: 'Français', flag: '🇫🇷', dir: 'ltr', htmlLang: 'fr' },
  ar: { name: 'Arabic', native: 'العربية', flag: '🇹🇳', dir: 'rtl', htmlLang: 'ar' },
};

// The `ar` flag shows Tunisia (🇹🇳) per the user's request to anchor the
// Arabic variant to Tunis specifically rather than a generic Arabic flag.

/**
 * Per-page SEO config.
 * Each page has ONE primary keyword focus (Tunis woven in naturally).
 * Title stays ≤ 60 chars, description ≤ 155 chars — both SERP-safe.
 */
export type PageKey = 'home' | 'about' | 'experience' | 'skills' | 'resources' | 'contact';

type PageSEO = Record<Locale, { title: string; description: string; keyword: string }>;

export const pageSEO: Record<PageKey, PageSEO> = {
  home: {
    en: {
      keyword: 'SEO specialist Tunis',
      title: 'Ghassen Bahroun — SEO Specialist in Tunis, Tunisia',
      description:
        'SEO & SEM specialist based in Tunis, Tunisia. 4+ years, 41+ paid campaigns, multilingual search across 5 European markets. Remote worldwide.',
    },
    fr: {
      keyword: 'consultant SEO Tunis',
      title: 'Ghassen Bahroun — Consultant SEO à Tunis, Tunisie',
      description:
        'Consultant SEO & SEM basé à Tunis. 4+ ans d\u2019expérience, 41+ campagnes gérées, référencement multilingue sur 5 marchés européens. À distance mondialement.',
    },
    ar: {
      keyword: 'خبير SEO تونس',
      title: 'غسان بحرون — خبير SEO في تونس',
      description:
        'خبير SEO و SEM مقيم في تونس. أكثر من 4 سنوات من الخبرة، 41+ حملة مدفوعة، تحسين محركات البحث متعدد اللغات عبر 5 أسواق أوروبية.',
    },
  },
  about: {
    en: {
      keyword: 'SEO consultant Tunisia',
      title: 'About — SEO Consultant in Tunisia | Ghassen Bahroun',
      description:
        'SEO consultant in Tunisia with experience across industrial B2B, edtech, healthcare and MENA markets. Multilingual search strategy and Python automation.',
    },
    fr: {
      keyword: 'consultant SEO Tunisie',
      title: 'À propos — Consultant SEO en Tunisie | Ghassen Bahroun',
      description:
        'Consultant SEO en Tunisie avec expérience B2B industriel, edtech, santé et marchés MENA. Stratégie SEO multilingue et automatisation Python.',
    },
    ar: {
      keyword: 'مستشار SEO تونس',
      title: 'نبذة — مستشار SEO في تونس | غسان بحرون',
      description:
        'مستشار SEO في تونس بخبرة في B2B الصناعي، التعليم، الصحة وأسواق MENA. استراتيجية SEO متعددة اللغات وأتمتة بايثون.',
    },
  },
  experience: {
    en: {
      keyword: 'SEM specialist Tunisia',
      title: 'Experience — SEM Specialist Tunisia | Ghassen Bahroun',
      description:
        'SEM specialist experience in Tunisia: Pinet Industrie, TakiAcademy, WIC healthcare, Bebrandy Qatar. 36+ SEA campaigns across international markets.',
    },
    fr: {
      keyword: 'spécialiste SEM Tunisie',
      title: 'Expérience — Spécialiste SEM Tunisie | Ghassen Bahroun',
      description:
        'Expérience spécialiste SEM en Tunisie : Pinet Industrie, TakiAcademy, WIC, Bebrandy Qatar. 36+ campagnes SEA sur les marchés internationaux.',
    },
    ar: {
      keyword: 'متخصص SEM تونس',
      title: 'الخبرة — متخصص SEM في تونس | غسان بحرون',
      description:
        'خبرة متخصص SEM في تونس: Pinet Industrie، TakiAcademy، WIC، Bebrandy قطر. أكثر من 36 حملة SEA عبر الأسواق الدولية.',
    },
  },
  skills: {
    en: {
      keyword: 'Google Ads specialist Tunis',
      title: 'Skills — Google Ads Specialist in Tunis | Ghassen Bahroun',
      description:
        'Google Ads specialist in Tunis. SEO/SEM toolkit: Google Ads, GSC, SEMrush, Screaming Frog, Looker Studio, plus Python automation for scale.',
    },
    fr: {
      keyword: 'expert Google Ads Tunis',
      title: 'Compétences — Expert Google Ads Tunis | Ghassen Bahroun',
      description:
        'Expert Google Ads à Tunis. Boîte à outils SEO/SEM : Google Ads, GSC, SEMrush, Screaming Frog, Looker Studio, automatisation Python.',
    },
    ar: {
      keyword: 'خبير Google Ads تونس',
      title: 'المهارات — خبير Google Ads في تونس | غسان بحرون',
      description:
        'خبير Google Ads في تونس. أدوات SEO/SEM: Google Ads، GSC، SEMrush، Screaming Frog، Looker Studio، أتمتة بايثون.',
    },
  },
  resources: {
    en: {
      keyword: 'free SEO templates',
      title: 'Free SEO Templates & Open Source Tools | Ghassen Bahroun',
      description:
        'Free SEO templates: site audit checklist, keyword research framework, technical SEO checklist. Plus open-source Python tools on GitHub.',
    },
    fr: {
      keyword: 'modèles SEO gratuits',
      title: 'Modèles SEO Gratuits & Outils Open Source | Ghassen Bahroun',
      description:
        'Modèles SEO gratuits : checklist audit, recherche de mots-clés, SEO technique. Outils Python open source sur GitHub.',
    },
    ar: {
      keyword: 'قوالب SEO مجانية',
      title: 'قوالب SEO مجانية وأدوات مفتوحة المصدر | غسان بحرون',
      description:
        'قوالب SEO مجانية: قائمة تدقيق الموقع، إطار البحث عن الكلمات المفتاحية، SEO تقني. أدوات بايثون مفتوحة المصدر على GitHub.',
    },
  },
  contact: {
    en: {
      keyword: 'hire SEO specialist Tunis',
      title: 'Contact — Hire SEO Specialist in Tunis | Ghassen Bahroun',
      description:
        'Hire an SEO specialist in Tunis. Remote worldwide. Email ghassenbahroun@yahoo.fr for SEO, SEM, and multilingual search projects.',
    },
    fr: {
      keyword: 'recruter consultant SEO Tunis',
      title: 'Contact — Recruter un Consultant SEO à Tunis | Ghassen Bahroun',
      description:
        'Recruter un consultant SEO à Tunis. Télétravail mondial. Email ghassenbahroun@yahoo.fr pour vos projets SEO, SEM et multilingues.',
    },
    ar: {
      keyword: 'توظيف خبير SEO تونس',
      title: 'التواصل — توظيف خبير SEO في تونس | غسان بحرون',
      description:
        'توظيف خبير SEO في تونس. عن بعد عالمياً. بريد إلكتروني ghassenbahroun@yahoo.fr لمشاريع SEO و SEM متعددة اللغات.',
    },
  },
};

export const pagePaths: Record<PageKey, string> = {
  home: '',
  about: 'about',
  experience: 'experience',
  skills: 'skills',
  resources: 'resources',
  contact: 'contact',
};

/** UI translations (navigation labels etc.) */
export const ui: Record<Locale, {
  nav: Record<PageKey | 'getInTouch' | 'home', string>;
  downloadCV: string;
  viewOnGitHub: string;
  languageLabel: string;
}> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      experience: 'Experience',
      skills: 'Skills',
      resources: 'Resources',
      contact: 'Contact',
      getInTouch: 'Get In Touch',
    },
    downloadCV: 'Download CV',
    viewOnGitHub: 'GitHub',
    languageLabel: 'Language',
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      experience: 'Expérience',
      skills: 'Compétences',
      resources: 'Ressources',
      contact: 'Contact',
      getInTouch: 'Me contacter',
    },
    downloadCV: 'Télécharger CV',
    viewOnGitHub: 'GitHub',
    languageLabel: 'Langue',
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'نبذة',
      experience: 'الخبرة',
      skills: 'المهارات',
      resources: 'الموارد',
      contact: 'التواصل',
      getInTouch: 'تواصل معي',
    },
    downloadCV: 'تحميل السيرة الذاتية',
    viewOnGitHub: 'GitHub',
    languageLabel: 'اللغة',
  },
};
