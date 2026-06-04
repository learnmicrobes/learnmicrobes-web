import { useEffect, type FC } from 'react';

type SEOProps = {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: string;
  noIndex?: boolean;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
};

const SITE_URL = 'https://learnmicrobes.com';
const ROUTE_STRUCTURED_DATA_ID = 'learnmicrobes-route-structured-data';

const setMetaContent = (selector: string, content: string) => {
  const element = document.head.querySelector<HTMLMetaElement>(selector);

  if (element) {
    element.content = content;
  }
};

const setCanonicalHref = (href: string) => {
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }

  canonical.href = href;
};

const setRobotsContent = (content: string) => {
  let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');

  if (!robots) {
    robots = document.createElement('meta');
    robots.name = 'robots';
    document.head.appendChild(robots);
  }

  robots.content = content;
};

const SEO: FC<SEOProps> = ({
  title,
  description,
  canonicalPath = '/',
  ogType = 'website',
  noIndex = false,
  structuredData
}) => {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;

    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:type"]', ogType);
    setMetaContent('meta[property="og:url"]', canonicalUrl);
    setCanonicalHref(canonicalUrl);
    setRobotsContent(noIndex ? 'noindex, nofollow' : 'index, follow');

    const existingStructuredData = document.getElementById(ROUTE_STRUCTURED_DATA_ID);
    existingStructuredData?.remove();

    if (structuredData) {
      const script = document.createElement('script');
      script.id = ROUTE_STRUCTURED_DATA_ID;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [canonicalPath, description, noIndex, ogType, structuredData, title]);

  return null;
};

export default SEO;
