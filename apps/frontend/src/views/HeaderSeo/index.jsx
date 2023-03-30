import Head from 'next/head';
import React from 'react';

const HeaderSEO = props => {
  const { title, description, url, image } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta
        name="title"
        content={title}
      />
      <meta
        name="description"
        content={description}
      />
      <meta
        name="keywords"
        content="Fox Delivery, Entregas, Restaurantes"
      ></meta>
      <meta
        name="robots"
        content="index, follow"
      ></meta>
      <meta
        httpEquiv="Content-Type"
        content="text/html; charset=utf-8"
      ></meta>
      <meta
        name="language"
        content="Portuguese"
      ></meta>

      <meta
        property="og:url"
        content={url}
      ></meta>
      <meta
        property="og:title"
        content={title}
      ></meta>
      <meta
        property="og:description"
        content={description}
      ></meta>
      <meta
        property="og:image"
        content={image}
      ></meta>

      <meta
        property="twitter:url"
        content={url}
      ></meta>
      <meta
        property="twitter:title"
        content={title}
      ></meta>
      <meta
        property="twitter:description"
        content={description}
      ></meta>
      <meta
        property="twitter:image"
        content={image}
      ></meta>
    </Head>
  );
};

export default HeaderSEO;
