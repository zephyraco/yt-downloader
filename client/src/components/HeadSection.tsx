import React from 'react';
import { Helmet } from 'react-helmet';

const HeadSection: React.FC = () => {
  return (
    <Helmet>
      <title>Zephyra YouTube Video Downloader</title>
      <meta
        name="description"
        content="Download YouTube videos quickly and easily. Our YouTube Video Downloader lets you save videos in multiple formats with just a URL."
      />
      <meta
        name="keywords"
        content="YouTube video downloader, free YouTube downloader, download YouTube videos, save YouTube videos, YouTube to MP4, YouTube to MP3"
      />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
  );
};

export default HeadSection;
