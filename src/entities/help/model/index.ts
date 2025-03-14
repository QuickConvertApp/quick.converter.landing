import { HelpArticle, FAQ, HelpCategory } from './types';

// Mock help articles
export const helpArticles: HelpArticle[] = [
  {
    id: 'getting-started-1',
    title: 'Getting Started with QuickConvert',
    summary: 'Learn the basics of using QuickConvert for file conversion.',
    content: `
# Getting Started with QuickConvert

QuickConvert is a powerful file conversion tool that allows you to convert files between different formats quickly and easily.

## Creating an Account

To get started with QuickConvert:

1. Visit the QuickConvert homepage
2. Click on the "Sign Up" button in the top right corner
3. Enter your email address and create a password
4. Verify your email address

## Your First Conversion

Converting a file is simple:

1. Log in to your account
2. Click on the "Upload" button
3. Select the file you want to convert
4. Choose the output format
5. Click "Convert"
6. Download your converted file

## Supported File Types

QuickConvert supports a wide range of file types, including:

- Documents (DOCX, PDF, TXT, RTF)
- Images (JPG, PNG, GIF, SVG)
- Audio (MP3, WAV, FLAC)
- Video (MP4, AVI, MOV)
- E-books (EPUB, MOBI, AZW)

For more information on supported file types, check out our [File Types Guide](/help/file-types).
    `,
    category: 'getting-started',
    tags: ['beginner', 'tutorial', 'basics'],
    lastUpdated: '2023-09-15T10:30:00Z',
    publishedAt: '2023-07-12T08:00:00Z'
  },
  {
    id: 'account-1',
    title: 'Managing Your Account',
    summary: 'Learn how to update your profile and manage account settings.',
    content: `
# Managing Your Account

## Profile Settings

You can update your profile information at any time:

1. Click on your profile icon in the top right corner
2. Select "Account Settings"
3. Update your information
4. Click "Save Changes"

## Changing Your Password

To change your password:

1. Go to Account Settings
2. Click on the "Security" tab
3. Enter your current password
4. Enter and confirm your new password
5. Click "Update Password"

## Deleting Your Account

If you wish to delete your account:

1. Go to Account Settings
2. Scroll to the bottom of the page
3. Click on "Delete Account"
4. Confirm your decision

Note that deleting your account will permanently remove all your data and cannot be undone.
    `,
    category: 'account',
    tags: ['account', 'profile', 'settings'],
    lastUpdated: '2023-10-05T14:45:00Z',
    publishedAt: '2023-08-05T10:00:00Z'
  },
  {
    id: 'billing-1',
    title: 'Understanding Your Billing',
    summary: 'Learn about billing cycles, invoices, and payment methods.',
    content: `
# Understanding Your Billing

## Subscription Plans

QuickConvert offers several subscription plans to meet your needs:

- **Free Plan**: Basic conversion features with limited usage
- **Pro Plan**: Advanced features for power users
- **Enterprise Plan**: All features with priority support

To view or change your plan, visit the [Billing page](/dashboard/billing).

## Billing Cycles

You can choose between monthly and yearly billing:

- **Monthly**: Pay month-to-month, can cancel anytime
- **Yearly**: Pay for a full year with a 20% discount

## Payment Methods

QuickConvert accepts the following payment methods:

- Credit/debit cards (Visa, Mastercard, American Express)
- PayPal
- Bank transfer (Enterprise customers only)

## Invoices

All invoices are available in your billing history:

1. Go to Billing
2. Click on "Billing History"
3. Download any invoice as a PDF

If you need a specific invoice format for tax purposes, please contact our support team.
    `,
    category: 'billing',
    tags: ['pricing', 'subscription', 'payment'],
    lastUpdated: '2023-11-20T09:15:00Z',
    publishedAt: '2023-09-15T12:30:00Z'
  },
  {
    id: 'file-conversion-1',
    title: 'Advanced Conversion Options',
    summary: 'Discover advanced options to customize your file conversions.',
    content: `
# Advanced Conversion Options

## Conversion Settings

When converting files, you can customize various settings:

1. Upload your file
2. Click on "Advanced Options"
3. Adjust settings specific to your file type
4. Click "Convert"

## Batch Conversion

With Pro and Enterprise plans, you can convert multiple files at once:

1. Click "Batch Convert"
2. Upload multiple files
3. Select the target format for all files
4. Click "Convert All"

## Conversion Presets

Save your favorite conversion settings as presets:

1. Configure your conversion settings
2. Click "Save as Preset"
3. Name your preset
4. Use it for future conversions by selecting it from the dropdown menu

## API Access

Enterprise users can access our conversion API for integration with their own systems.
    `,
    category: 'file-conversion',
    tags: ['convert', 'formats', 'epub', 'mobi'],
    lastUpdated: '2023-12-01T11:30:00Z',
    publishedAt: '2023-10-22T09:45:00Z'
  },
  {
    id: 'troubleshooting-1',
    title: 'Common Conversion Issues',
    summary: 'Solutions for common file conversion problems.',
    content: `
# Common Conversion Issues

## File Too Large

If you're getting a "File too large" error:

- Check your plan limits (Free: up to 10MB, Pro: up to 100MB, Enterprise: unlimited)
- Try compressing your file before uploading
- Split large files into smaller parts

## Conversion Failed

If your conversion fails:

1. Check if the file is corrupted
2. Ensure the file is not password-protected
3. Try a different file format
4. Check if the file meets our guidelines

If the problem persists, please contact our support team.

## Poor Quality Output

If your converted file has quality issues:

- Use the "High Quality" option in Advanced Settings
- Check if your source file has sufficient quality
- Some conversion types may result in quality loss
- Try different format combinations

## Browser Compatibility

QuickConvert works best with:

- Chrome (latest version)
- Firefox (latest version)
- Safari (latest version)
- Edge (latest version)

If you're experiencing issues, try updating your browser.
    `,
    category: 'troubleshooting',
    tags: ['error', 'common issues', 'troubleshooting'],
    lastUpdated: '2024-01-10T16:20:00Z',
    publishedAt: '2023-11-30T14:15:00Z'
  }
];

// Mock FAQs
export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How do I convert a file?',
    answer: 'To convert a file, click the "Upload" button on the dashboard, select your file, choose the target format, and click "Convert".',
    category: 'getting-started'
  },
  {
    id: 'faq-2',
    question: 'What file formats do you support?',
    answer: 'We support a wide range of formats including documents (PDF, DOCX), images (JPG, PNG), audio (MP3, WAV), video (MP4, AVI), and e-books (EPUB, MOBI).',
    category: 'getting-started'
  },
  {
    id: 'faq-3',
    question: 'Is my data secure?',
    answer: 'Yes. We use encryption to protect your files during transfer and storage. Your files are automatically deleted from our servers after 24 hours.',
    category: 'account'
  },
  {
    id: 'faq-4',
    question: 'How do I change my subscription plan?',
    answer: 'Go to the Billing page from your dashboard, select the plan you want to switch to, and follow the prompts to update your subscription.',
    category: 'billing'
  },
  {
    id: 'faq-5',
    question: 'Can I cancel my subscription at any time?',
    answer: 'Yes, you can cancel your subscription at any time. Go to the Billing page, click "Cancel Subscription", and follow the prompts.',
    category: 'billing'
  },
  {
    id: 'faq-6',
    question: 'Why is my conversion failing?',
    answer: 'Conversions may fail due to file corruption, password protection, or unsupported file types. Check our troubleshooting guide for more details.',
    category: 'troubleshooting'
  },
  {
    id: 'faq-7',
    question: 'What are the file size limits?',
    answer: 'Free plan: up to 10MB, Pro plan: up to 100MB, Enterprise plan: unlimited file size.',
    category: 'file-conversion'
  },
  {
    id: 'faq-8',
    question: 'How long does conversion take?',
    answer: 'Most conversions complete within seconds. Larger files or complex conversions may take a few minutes. Enterprise users get priority processing.',
    category: 'file-conversion'
  },
  {
    id: 'faq-9',
    question: 'How do I contact support?',
    answer: 'You can contact our support team by using the Contact form in the Help Center, or by emailing support@quickconvert.com.',
    category: 'account'
  },
  {
    id: 'faq-10',
    question: 'Do you offer refunds?',
    answer: 'We offer a 14-day money-back guarantee for all new subscriptions. Contact support to request a refund within this period.',
    category: 'billing'
  }
];

// Helper functions for the help center
export const getCategoryName = (category: HelpCategory): string => {
  const categoryNames: Record<HelpCategory, string> = {
    'getting-started': 'Getting Started',
    'account': 'Account Management',
    'billing': 'Billing & Subscription',
    'file-conversion': 'File Conversion',
    'troubleshooting': 'Troubleshooting'
  };
  
  return categoryNames[category];
};

export const getCategoryIcon = (category: HelpCategory): string => {
  const categoryIcons: Record<HelpCategory, string> = {
    'getting-started': 'rocket',
    'account': 'user',
    'billing': 'credit-card',
    'file-conversion': 'file-text',
    'troubleshooting': 'help-circle'
  };
  
  return categoryIcons[category];
};

export const getArticlesByCategory = (category: HelpCategory): HelpArticle[] => {
  return helpArticles.filter(article => article.category === category);
};

export const getFaqsByCategory = (category: HelpCategory): FAQ[] => {
  return faqs.filter(faq => faq.category === category);
};

export const getAllCategories = (): HelpCategory[] => {
  return ['getting-started', 'account', 'billing', 'file-conversion', 'troubleshooting'];
};

export const searchArticles = (query: string): HelpArticle[] => {
  const lowercaseQuery = query.toLowerCase();
  
  return helpArticles.filter(article => 
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.summary.toLowerCase().includes(lowercaseQuery) ||
    article.content.toLowerCase().includes(lowercaseQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const searchFaqs = (query: string): FAQ[] => {
  const lowercaseQuery = query.toLowerCase();
  
  return faqs.filter(faq => 
    faq.question.toLowerCase().includes(lowercaseQuery) ||
    faq.answer.toLowerCase().includes(lowercaseQuery)
  );
};

/**
 * Get an article by its ID
 */
export const getArticleById = (id: string): HelpArticle | null => {
  return helpArticles.find(article => article.id === id) || null;
};

/**
 * Get related articles based on category and tags
 */
export const getRelatedArticles = (article: HelpArticle, limit: number = 3): HelpArticle[] => {
  // Start with articles in the same category
  let related = helpArticles.filter(a => 
    a.id !== article.id && a.category === article.category
  );
  
  // If we don't have enough, add articles with matching tags
  if (related.length < limit) {
    const articlesByTag = helpArticles.filter(a => 
      a.id !== article.id && 
      a.category !== article.category &&
      a.tags.some(tag => article.tags.includes(tag))
    );
    
    // Add articles with matching tags, but avoid duplicates
    for (const tagArticle of articlesByTag) {
      if (related.length >= limit) break;
      if (!related.some(a => a.id === tagArticle.id)) {
        related.push(tagArticle);
      }
    }
  }
  
  // If we still don't have enough, add other popular articles
  if (related.length < limit) {
    const otherArticles = helpArticles.filter(a => 
      a.id !== article.id && 
      !related.some(r => r.id === a.id)
    );
    
    for (const otherArticle of otherArticles) {
      if (related.length >= limit) break;
      related.push(otherArticle);
    }
  }
  
  return related.slice(0, limit);
}; 