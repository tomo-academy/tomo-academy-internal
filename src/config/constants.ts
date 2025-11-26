// Application Constants
export const APP_CONFIG = {
  // Domain Configuration
  DOMAIN: 'https://www.meow.tomoacademy.site',
  APP_NAME: 'TOMO Academy',
  
  // API Endpoints
  API_BASE_URL: process.env.VITE_API_BASE_URL || 'https://api.tomoacademy.site',
  
  // Social Media
  SOCIAL_LINKS: {
    youtube: 'https://www.youtube.com/@tomoacademy',
    twitter: 'https://twitter.com/tomo_academy',
    linkedin: 'https://www.linkedin.com/company/tomo-academy',
    github: 'https://github.com/tomo-academy'
  },
  
  // SEO Configuration
  DEFAULT_META: {
    title: 'TOMO Academy - Internal Management Tool',
    description: 'TOMO Academy Internal Management System - Comprehensive platform for team management, YouTube channel operations, employee profiles, task tracking, and content coordination. Internal tool for TOMO Academy staff.',
    keywords: ['TOMO Academy', 'internal tool', 'team management', 'TOMO management', 'employee management', 'YouTube management', 'content management', 'internal platform', 'staff portal', 'task management', 'TOMO Academy internal'],
    image: '/TOMO.jpg'
  }
};

// Helper function to generate profile URLs
export const generateProfileUrl = (employeeId: string): string => {
  return `${APP_CONFIG.DOMAIN}/profile/${employeeId}`;
};

// Helper function to generate absolute URLs
export const generateAbsoluteUrl = (path: string): string => {
  return path.startsWith('http') ? path : `${APP_CONFIG.DOMAIN}${path}`;
};

export default APP_CONFIG;