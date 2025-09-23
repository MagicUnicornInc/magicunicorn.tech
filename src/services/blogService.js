// Blog service to read content from local files
const BLOG_BASE_PATH = '/blog-content';

// Series configuration with metadata and article lists
export const BLOG_SERIES = {
  'unicorn-unleashed': {
    id: 'unicorn-unleashed',
    title: 'Unicorn Unleashed Guides',
    subtitle: 'A Hacker\'s Guide to Open Source AI',
    audience: 'Open Source & Hobbyists',
    difficulty: 'Beginner to Intermediate',
    color: '#10B981', // Emerald
    icon: '🚀',
    description: 'Get hands-on with our open source AI tools. From your first transcription to building complete applications.',
    path: 'Open_Source_and_Hobbyists/Unicorn_Unleashed_Guides',
    estimatedTime: '2-3 hours total',
    articles: [
      '01_Getting_Started_with_Unicorn_Amanuensis.md',
      '02_Build_a_Talking_App_with_Unicorn_Orator.md',
      '03_Intro_to_Center_Deep_RAG_API.md',
      '04_Building_a_Simple_App_with_the_Meeting_Ops_API.md',
      '05_Setting_Up_Your_AMD_Ryzen_AI_Dev_Environment.md',
      '06_Building_Your_Own_Meeting_Ops_Complete_Guide.md'
    ]
  },
  'forging-silicon': {
    id: 'forging-silicon',
    title: 'Forging the Silicon',
    subtitle: 'A Deep Dive into the Unicorn Execution Engine',
    audience: 'Hardware & Systems Engineers',
    difficulty: 'Advanced',
    color: '#F59E0B', // Amber
    icon: '⚡',
    description: 'Journey into the wilderness of direct hardware control. Custom NPU toolchains, memory optimization, and pushing silicon to its limits.',
    path: 'Hardware_and_Systems_Engineers/Forging_the_Silicon',
    estimatedTime: '4-5 hours total',
    articles: [
      '01_Why_We_Built_A_Custom_NPU_Toolchain.md',
      '02_The_Memory_Wall_AMDs_Unified_Memory.md',
      '03_GPGPU_with_Vulkan_on_Radeon_780M.md',
      '04_Writing_MLIR_AIE2_Kernels_for_Phoenix_NPU.md',
      '05_Slaying_the_50ms_Latency_Monster.md',
      '06_The_Complete_Hardware_Stack_NPU_iGPU_USB.md'
    ]
  },
  'engine-to-enterprise': {
    id: 'engine-to-enterprise',
    title: 'From Engine to Enterprise',
    subtitle: 'Building Production-Ready AI Systems',
    audience: 'Full-Stack & Product Developers',
    difficulty: 'Intermediate',
    color: '#8B5CF6', // Violet
    icon: '🏗️',
    description: 'Scale from prototype to production. Real-time APIs, WebSocket architecture, and enterprise deployment strategies.',
    path: 'Full_Stack_and_Product_Developers/From_Engine_to_Enterprise',
    estimatedTime: '3-4 hours total',
    articles: [
      '01_Anatomy_of_an_AI_Appliance_The_Meeting_Ops_Stack.md',
      '02_Designing_a_Real_Time_Transcription_API_with_WebSockets.md',
      '03_Building_a_Product_Around_a_Core_AI_Engine.md',
      '04_Integrating_SSO_with_Authentik.md',
      '05_The_Final_10_Percent_UI_Polish.md',
      '06_Production_Deployment_Docker_and_Beyond.md'
    ]
  },
  'accelerated-intelligence': {
    id: 'accelerated-intelligence',
    title: 'Accelerated Intelligence',
    subtitle: 'AI & ML Engineering at the Edge',
    audience: 'AI & ML Engineers',
    difficulty: 'Advanced',
    color: '#EF4444', // Red
    icon: '🧠',
    description: 'Optimize models for edge deployment. Quantization, hardware acceleration, and achieving real-time inference.',
    path: 'AI_and_ML_Engineers/Accelerated_Intelligence',
    estimatedTime: '4-6 hours total',
    articles: [
      '01_Whisper_at_220x_Speed.md',
      '02_Kokoro_TTS_on_Intel_iGPU.md',
      '03_Implementing_Word_Timestamps_and_Diarization.md',
      '04_The_Art_of_INT8_Quantization.md',
      '05_NPU_vs_iGPU_A_Real_World_Performance_Analysis.md',
      '06_Production_Ready_Meeting_Ops_Complete_Stack.md'
    ]
  },
  'business-of-ai': {
    id: 'business-of-ai',
    title: 'The Business of AI',
    subtitle: 'Strategy & Product Management',
    audience: 'AI Strategy & Product Management',
    difficulty: 'Strategic',
    color: '#06B6D4', // Cyan
    icon: '💼',
    description: 'Navigate the business landscape of AI. ROI frameworks, competitive advantage, and building AI-first products.',
    path: 'AI_Strategy_and_Product_Management/The_Business_of_AI',
    estimatedTime: '2-3 hours total',
    articles: [
      '01_The_1600x_Efficiency_Gain_On_Premise_AI.md',
      '02_Unicorn_Amanuensis_Carving_a_Niche.md',
      '03_Unicorn_Orator_Competitive_Advantage.md',
      '04_Solving_Real_Problems_with_Meeting_Ops.md',
      '05_Our_Product_Philosophy_Build_vs_Buy.md',
      '06_The_Complete_Appliance_Strategy.md'
    ]
  }
};

// Parse markdown frontmatter and content
function parseMarkdown(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return {
      frontmatter: {},
      content: content
    };
  }

  const frontmatterText = match[1];
  const markdownContent = match[2];

  // Parse simple frontmatter (key: value format)
  const frontmatter = {};
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
  });

  return {
    frontmatter,
    content: markdownContent
  };
}

// Extract article metadata from content
function extractArticleMetadata(content, filename) {
  const parsed = parseMarkdown(content);
  const lines = parsed.content.split('\n');

  // Extract title (first # heading)
  const titleMatch = lines.find(line => line.startsWith('# '));
  const title = titleMatch ? titleMatch.replace('# ', '') : filename.replace('.md', '');

  // Extract series info
  const seriesMatch = lines.find(line => line.includes('**Series:**'));
  const series = seriesMatch ? seriesMatch.replace(/\*\*Series:\*\*\s*/, '') : '';

  // Estimate read time (roughly 200 words per minute)
  const wordCount = parsed.content.split(' ').length;
  const readTime = Math.ceil(wordCount / 200);

  // Extract first paragraph as excerpt
  const paragraphs = parsed.content.split('\n\n').filter(p =>
    p.trim() &&
    !p.startsWith('#') &&
    !p.startsWith('**Series:**') &&
    !p.startsWith('**Author:**') &&
    !p.startsWith('---')
  );
  const excerpt = paragraphs[0] ? paragraphs[0].substring(0, 200) + '...' : '';

  return {
    title,
    series,
    readTime,
    excerpt,
    wordCount,
    frontmatter: parsed.frontmatter,
    content: parsed.content
  };
}

// Fetch file content from local public directory
async function fetchLocalFile(path) {
  const url = `${BLOG_BASE_PATH}/${path}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error fetching local file:', error);
    return null;
  }
}

// Get all articles for a specific series
export async function getSeriesArticles(seriesId) {
  const seriesConfig = BLOG_SERIES[seriesId];
  if (!seriesConfig) {
    throw new Error(`Unknown series: ${seriesId}`);
  }

  const articles = await Promise.all(
    seriesConfig.articles.map(async (filename, index) => {
      const content = await fetchLocalFile(`${seriesConfig.path}/${filename}`);
      if (!content) return null;

      const metadata = extractArticleMetadata(content, filename);

      return {
        id: filename.replace('.md', ''),
        filename: filename,
        slug: filename.replace('.md', '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        seriesId,
        seriesInfo: seriesConfig,
        ...metadata,
        publishedAt: `2024-09-${String(index + 1).padStart(2, '0')}`
      };
    })
  );

  return articles.filter(article => article !== null);
}

// Get a specific article
export async function getArticle(seriesId, articleSlug) {
  const articles = await getSeriesArticles(seriesId);
  return articles.find(article => article.slug === articleSlug);
}

// Get latest articles across all series
export async function getLatestArticles(limit = 6) {
  const allArticles = [];

  for (const seriesId of Object.keys(BLOG_SERIES)) {
    const articles = await getSeriesArticles(seriesId);
    allArticles.push(...articles);
  }

  return allArticles
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, limit);
}

// Get all series with article counts
export async function getAllSeries() {
  const seriesWithCounts = await Promise.all(
    Object.values(BLOG_SERIES).map(async (series) => {
      const articles = await getSeriesArticles(series.id);
      return {
        ...series,
        articleCount: series.articles.length,
        latestArticle: articles[articles.length - 1]
      };
    })
  );

  return seriesWithCounts;
}

// Search articles across all series
export async function searchArticles(query) {
  const allArticles = [];

  for (const seriesId of Object.keys(BLOG_SERIES)) {
    const articles = await getSeriesArticles(seriesId);
    allArticles.push(...articles);
  }

  const searchTerms = query.toLowerCase().split(' ');

  return allArticles.filter(article => {
    const searchContent = `${article.title} ${article.excerpt} ${article.series}`.toLowerCase();
    return searchTerms.every(term => searchContent.includes(term));
  });
}
