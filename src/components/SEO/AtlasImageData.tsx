import { useEffect, type FC } from 'react';
import type { AtlasPhoto } from '../../data/atlasPages';

/*
 * Emits ImageObject structured data for the clinical photographs on a Visual
 * Atlas card.
 *
 * Why this is separate from <SEO>: SEO writes a single script tag keyed by its
 * own id, so a second <SEO> would overwrite the route's BreadcrumbList. It also
 * lives here rather than in App.tsx because the photo data is in atlasPages.ts,
 * which only the lazy-loaded Atlas chunk imports - putting it in the shell
 * would add the whole photo table to the first download of every page.
 *
 * No acquireLicensePage is emitted. That field is what triggers Google's
 * "Licensable" badge, and Learn Microbes is not the licensor of these images -
 * it republishes public-domain federal work. The fields below describe the
 * image honestly for indexing without claiming rights we do not hold.
 */

const SITE_URL = 'https://learnmicrobes.com';
const ATLAS_IMAGE_DATA_ID = 'learnmicrobes-atlas-image-data';

// CDC's own terms for reuse of its materials - the actual licence statement for
// every photograph currently in the atlas.
const CDC_TERMS_URL = 'https://www.cdc.gov/other/agencymaterials.html';

type AtlasImageDataProps = {
  pageTitle: string;
  canonicalPath: string;
  photos: AtlasPhoto[];
};

const buildImageObject = (photo: AtlasPhoto, pageTitle: string) => {
  const absoluteSrc = `${SITE_URL}${photo.src}`;
  // Credit strings carry the source, so the organisation is derived rather than
  // hardcoded: the owner's own bench photographs will not be CDC work.
  const isCdc = /\bCDC\b/.test(photo.credit);

  return {
    '@type': 'ImageObject',
    contentUrl: absoluteSrc,
    url: absoluteSrc,
    name: `${pageTitle} - ${photo.stageLabel}`,
    caption: photo.alt,
    description: photo.caption,
    creditText: photo.credit,
    copyrightNotice: photo.license,
    isAccessibleForFree: true,
    ...(isCdc
      ? {
          creator: {
            '@type': 'Organization',
            name: 'Centers for Disease Control and Prevention'
          },
          license: CDC_TERMS_URL
        }
      : {})
  };
};

const AtlasImageData: FC<AtlasImageDataProps> = ({ pageTitle, canonicalPath, photos }) => {
  useEffect(() => {
    document.getElementById(ATLAS_IMAGE_DATA_ID)?.remove();

    if (photos.length === 0) {
      return undefined;
    }

    const script = document.createElement('script');
    script.id = ATLAS_IMAGE_DATA_ID;
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      url: `${SITE_URL}${canonicalPath}`,
      name: pageTitle,
      image: photos.map((photo) => buildImageObject(photo, pageTitle))
    });
    document.head.appendChild(script);

    return () => {
      document.getElementById(ATLAS_IMAGE_DATA_ID)?.remove();
    };
  }, [canonicalPath, pageTitle, photos]);

  return null;
};

export default AtlasImageData;
