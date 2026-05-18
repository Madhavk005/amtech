import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  canonical, 
  ogTitle, 
  ogDescription, 
  ogImage, 
  ogType = 'website',
  twitterHandle = '@amtechcranes'
}) => {
  const siteTitle = 'Amtech Cranes';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const siteDescription = description || "Amtech Cranes - India's trusted manufacturer of EOT cranes, gantry cranes, and material handling solutions since 1990.";
  const siteUrl = 'https://amtechcranes.com'; // Adjust to actual URL if known

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={siteDescription} />
      {canonical && <link rel="canonical" href={`${siteUrl}${canonical}`} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || siteDescription} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:url" content={`${siteUrl}${canonical || ''}`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || siteDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      <meta name="twitter:site" content={twitterHandle} />
    </Helmet>
  );
};

export default SEO;
