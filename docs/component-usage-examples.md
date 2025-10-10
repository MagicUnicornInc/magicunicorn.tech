# Component Usage Examples - MagicUnicorn.tech 2026

## Button Component

### Basic Usage
```jsx
import { Button } from '../components/ui';

// Primary button
<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>

// Secondary with icon
<Button variant="secondary" size="lg" leftIcon={<FaRocket />}>
  Launch
</Button>

// Loading state
<Button variant="primary" loading>
  Processing...
</Button>

// Disabled
<Button variant="primary" disabled>
  Not Available
</Button>
```

### Advanced Usage
```jsx
// Full width button with icon
<Button
  variant="primary"
  size="lg"
  fullWidth
  rightIcon={<FaArrowRight />}
  onClick={handleSubmit}
>
  Continue to Payment
</Button>

// Danger button for destructive actions
<Button
  variant="danger"
  size="sm"
  onClick={handleDelete}
  leftIcon={<FaTrash />}
>
  Delete Account
</Button>

// Ghost button for minimal UI
<Button variant="ghost" size="md" onClick={handleCancel}>
  Cancel
</Button>
```

---

## Input Component

### Basic Form Field
```jsx
import { Input } from '../components/ui';

<Input
  label="Email Address"
  type="email"
  name="email"
  placeholder="you@example.com"
  required
/>
```

### With Icons and Validation
```jsx
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa';

// Input with left icon and error state
<Input
  label="Email"
  type="email"
  name="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  leftIcon={<FaEnvelope />}
  error={errors.email}
  required
/>

// Input with success state
<Input
  label="Username"
  type="text"
  value={username}
  onChange={handleChange}
  success="Username is available!"
  rightIcon={<FaCheckCircle />}
/>
```

### With Helper Text
```jsx
<Input
  label="Password"
  type="password"
  name="password"
  helperText="Must be at least 8 characters with 1 number and 1 symbol"
  size="lg"
/>
```

---

## Card Component

### Basic Card
```jsx
import { Card, CardHeader, CardBody, CardFooter } from '../components/ui';

<Card variant="elevated">
  <CardHeader>
    <CardTitle>Welcome</CardTitle>
  </CardHeader>
  <CardBody>
    <p>This is a basic card component.</p>
  </CardBody>
</Card>
```

### Interactive Service Card
```jsx
import { Card, CardIcon, CardTitle, CardDescription } from '../components/ui';
import { FaRocket } from 'react-icons/fa';

<Card variant="interactive" hoverEffect="lift" clickable onClick={handleClick}>
  <CardIcon>
    <FaRocket />
  </CardIcon>
  <CardTitle>AI Solutions</CardTitle>
  <CardDescription>
    Intelligent systems that learn and adapt to your needs.
  </CardDescription>
</Card>
```

### Gradient Border Card
```jsx
<Card variant="gradient" hoverEffect="glow">
  <CardBody>
    <h3>Premium Feature</h3>
    <p>This card has a magical gradient border effect.</p>
  </CardBody>
</Card>
```

### Glass Effect Card
```jsx
<Card variant="glass" hoverEffect="scale">
  <CardBody>
    <h3>Glassmorphism</h3>
    <p>Modern glass-like appearance with backdrop blur.</p>
  </CardBody>
</Card>
```

---

## Skeleton Loading

### Text Skeleton
```jsx
import { SkeletonText } from '../components/ui';

<SkeletonText lines={3} />
```

### Card Skeleton
```jsx
import { SkeletonCard } from '../components/ui';

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <SkeletonCard />
  <SkeletonCard />
  <SkeletonCard />
</div>
```

### Custom Skeleton
```jsx
import { Skeleton } from '../components/ui';

// Image placeholder
<Skeleton variant="rectangular" width="100%" height="200px" />

// Avatar placeholder
<Skeleton variant="circular" width="64px" height="64px" />

// Button placeholder
<Skeleton variant="rectangular" width="120px" height="40px" animation="wave" />
```

---

## Custom Hooks

### useMediaQuery
```jsx
import { useMediaQuery, useIsMobile, usePrefersReducedMotion } from '../hooks';

function ResponsiveComponent() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isLargeScreen = useMediaQuery('(min-width: 1440px)');

  return (
    <div>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
      {!prefersReducedMotion && <AnimatedContent />}
    </div>
  );
}
```

### useScrollPosition
```jsx
import { useScrollPosition, useIsScrolled } from '../hooks';

function StickyHeader() {
  const { scrollY, scrollDirection } = useScrollPosition(100);
  const isScrolled = useIsScrolled(20);

  return (
    <header
      className={`
        sticky top-0 transition-all
        ${isScrolled ? 'bg-dark shadow-lg' : 'bg-transparent'}
        ${scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'}
      `}
    >
      <h1>Scroll: {scrollY}px</h1>
    </header>
  );
}
```

### useFormValidation
```jsx
import { useFormValidation } from '../hooks';

function ContactForm() {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormValidation(
      { email: '', message: '' },
      {
        email: (value) =>
          !/^\S+@\S+\.\S+$/.test(value) ? 'Invalid email' : '',
        message: (value) =>
          value.length < 10 ? 'Message must be at least 10 characters' : '',
      }
    );

  return (
    <form onSubmit={handleSubmit(async (values) => {
      await submitForm(values);
    })}>
      <Input
        label="Email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email && errors.email}
      />
      <Input
        label="Message"
        name="message"
        value={values.message}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.message && errors.message}
      />
      <Button type="submit">Send</Button>
    </form>
  );
}
```

---

## Complete Form Example

```jsx
import { useState } from 'react';
import { Button, Input } from '../components/ui';
import { useFormValidation } from '../hooks';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

function SignupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormValidation(
    {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    {
      name: (value) =>
        value.length < 2 ? 'Name must be at least 2 characters' : '',
      email: (value) =>
        !/^\S+@\S+\.\S+$/.test(value) ? 'Invalid email address' : '',
      password: (value) =>
        value.length < 8 ? 'Password must be at least 8 characters' : '',
      confirmPassword: (value, allValues) =>
        value !== allValues.password ? 'Passwords do not match' : '',
    }
  );

  const onSubmit = async (formValues) => {
    setIsSubmitting(true);
    try {
      await api.signup(formValues);
      resetForm();
      // Show success message
    } catch (error) {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Full Name"
        name="name"
        type="text"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name && errors.name}
        leftIcon={<FaUser />}
        required
      />

      <Input
        label="Email Address"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email && errors.email}
        leftIcon={<FaEnvelope />}
        required
      />

      <Input
        label="Password"
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password && errors.password}
        leftIcon={<FaLock />}
        helperText="At least 8 characters"
        required
      />

      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.confirmPassword && errors.confirmPassword}
        leftIcon={<FaLock />}
        required
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isSubmitting}
      >
        Create Account
      </Button>
    </form>
  );
}
```

---

## Service Cards Grid Example

```jsx
import { Card, CardIcon, CardTitle, CardDescription } from '../components/ui';
import { FaRobot, FaCode, FaChartLine } from 'react-icons/fa';

function ServicesGrid() {
  const services = [
    {
      icon: <FaRobot />,
      title: 'AI Solutions',
      description: 'Intelligent systems that learn and adapt',
    },
    {
      icon: <FaCode />,
      title: 'Custom Development',
      description: 'Tailored software for your unique needs',
    },
    {
      icon: <FaChartLine />,
      title: 'Data Analytics',
      description: 'Transform data into actionable insights',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <Card
          key={index}
          variant="interactive"
          hoverEffect="lift"
          clickable
          onClick={() => handleServiceClick(service)}
        >
          <CardIcon>{service.icon}</CardIcon>
          <CardTitle>{service.title}</CardTitle>
          <CardDescription>{service.description}</CardDescription>
        </Card>
      ))}
    </div>
  );
}
```

---

## Responsive Container Example

```jsx
import { useMediaQuery } from '../hooks';

function ResponsiveLayout({ children }) {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');

  return (
    <div className="container">
      <div className={`
        grid gap-6
        ${isMobile ? 'grid-cols-1' : ''}
        ${isTablet ? 'grid-cols-2' : ''}
        ${!isMobile && !isTablet ? 'grid-cols-3' : ''}
      `}>
        {children}
      </div>
    </div>
  );
}
```

---

## Best Practices

### 1. Always Import from Component Library
```jsx
// ✅ Good
import { Button, Input, Card } from '../components/ui';

// ❌ Avoid
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
```

### 2. Use Semantic HTML with Components
```jsx
// ✅ Good - Card as article
<Card variant="elevated" as="article">
  <CardTitle as="h2">Article Title</CardTitle>
  <CardDescription>Article description...</CardDescription>
</Card>
```

### 3. Leverage Custom Hooks
```jsx
// ✅ Good - Responsive and accessible
import { usePrefersReducedMotion, useIsMobile } from '../hooks';

const isMobile = useIsMobile();
const prefersReducedMotion = usePrefersReducedMotion();

// Conditionally apply animations
<motion.div animate={prefersReducedMotion ? {} : slideUpAnimation}>
```

### 4. Compose Components
```jsx
// ✅ Good - Composable pattern
<Card variant="elevated">
  <CardHeader>
    <CardIcon><FaMagic /></CardIcon>
    <CardTitle>Feature Title</CardTitle>
  </CardHeader>
  <CardBody>
    <CardDescription>Description here</CardDescription>
  </CardBody>
  <CardFooter>
    <Button variant="primary">Learn More</Button>
  </CardFooter>
</Card>
```

---

*Last Updated: 2025-10-10*
