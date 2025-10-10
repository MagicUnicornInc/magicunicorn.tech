/**
 * UI Component Library - MagicUnicorn.tech 2026
 * Central export for all reusable UI components
 */

// Core Components
export { default as Button } from './Button';
export { default as Input } from './Input';
export {
  default as Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardDescription,
  CardIcon,
} from './Card';

// Loading Components
export {
  default as Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonAvatar,
} from './Skeleton';

// Re-export commonly used components for convenience
export { default } from './Button';
