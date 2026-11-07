import { ProjectItem, IdeaItem, AchievementItem } from '../data/portfolio-data';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

/**
 * Filter projects by category and text search query
 */
export function filterProjects(
  projects: ProjectItem[],
  selectedCategory: string,
  searchQuery: string = ''
): ProjectItem[] {
  const query = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'ALL' ||
      project.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase().includes(selectedCategory.toLowerCase()));

    const matchesQuery =
      query === '' ||
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tags.some((t) => t.toLowerCase().includes(query)) ||
      (project.slogan && project.slogan.toLowerCase().includes(query));

    return matchesCategory && matchesQuery;
  });
}

/**
 * Filter ideas by category, status, and search query
 */
export function filterIdeas(
  ideas: IdeaItem[],
  selectedCategory: string = 'ALL',
  selectedStatus: string = 'ALL',
  searchQuery: string = ''
): IdeaItem[] {
  const query = searchQuery.trim().toLowerCase();

  return ideas.filter((idea) => {
    const matchesCategory =
      selectedCategory === 'ALL' || idea.category === selectedCategory;

    const matchesStatus =
      selectedStatus === 'ALL' || idea.status === selectedStatus;

    const matchesQuery =
      query === '' ||
      idea.title.toLowerCase().includes(query) ||
      idea.shortDescription.toLowerCase().includes(query) ||
      idea.techStackOrMethod.some((t) => t.toLowerCase().includes(query));

    return matchesCategory && matchesStatus && matchesQuery;
  });
}

/**
 * Validates the contact form inputs
 */
export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please provide your name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Please include a brief message (at least 10 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Summarizes counts and metrics across the portfolio
 */
export function calculatePortfolioStats(
  projects: ProjectItem[],
  ideas: IdeaItem[],
  achievements: AchievementItem[]
) {
  const verifiedAchievementsCount = achievements.filter(
    (a) => a.verificationStatus === 'verified'
  ).length;

  const totalIdeasCount = ideas.length;
  const activeConcepts = ideas.filter(
    (i) => i.status === 'CONCEPT' || i.status === 'IN DEVELOPMENT'
  ).length;

  return {
    totalProjects: projects.length,
    totalIdeas: totalIdeasCount,
    activeConcepts,
    verifiedAchievementsCount,
  };
}

/**
 * Determines whether the Back to Top button should be visible based on scroll depth
 */
export function shouldShowBackToTop(scrollY: number, threshold: number = 400): boolean {
  return scrollY > threshold;
}

export interface VideoAnimationParams {
  image?: string;
  aspectRatio: string;
  prompt?: string;
}

/**
 * Validates parameters for animating an image to video with gemini-omni-1.2-flash
 */
export function validateVideoAnimationParams(params: VideoAnimationParams): {
  isValid: boolean;
  error?: string;
} {
  if (!params.image || params.image.trim() === '') {
    return {
      isValid: false,
      error: 'Please upload or select an image to animate.',
    };
  }

  // Mandatory aspect ratios: 16:9 (landscape) or 9:16 (portrait)
  if (params.aspectRatio !== '16:9' && params.aspectRatio !== '9:16') {
    return {
      isValid: false,
      error: "Aspect ratio must be either '16:9' (landscape) or '9:16' (portrait).",
    };
  }

  return {
    isValid: true,
  };
}

