import React, { Component } from "react";
import Helmet from "react-helmet";

class SeoTags extends Component {
  render() {
    if (this.props.seo) {
      let seo = this.props.seo;
      return (
        <Helmet
          title={seo.title}
          titleTemplate="%s | Nyaaya"
          defaultTitle="India's Laws Explained - Nyaaya.in"
          meta={[
            { property: "og:type", content: seo.og_type },
            { property: "og:title", content: seo.og_title },
            {
              property: "og:url",
              content: `${this.props.apiRoot}${seo.og_url}`
            },
            { property: "og:image", content: `${seo.og_image}` }
          ]}
          link={[
            { rel: "canonical", href: `${this.props.apiRoot}${seo.canonical}` }
          ]}
          script={[
            {
              type: "application/ld+json",
              innerHTML: `{
  "@context": "http://schema.org",
  "@type": "Article",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "${this.props.apiRoot}${seo.og_url}"
  },
  "headline": "${seo.og_title}",
  "image": {
    "@type": "ImageObject",
    "url": "${seo.og_image}",
    "height": 800,
    "width": 800
  },
  "datePublished": "${seo.created_at}",
  "dateModified": "${seo.updated_at}",
  "author": {
    "@type": "Organization",
    "name": "Nyaaya Editorial"
  },
   "publisher": {
    "@type": "Organization",
    "name": "Nyaaya",
    "logo": {
      "@type": "ImageObject",
      "url": "http://nyaaya.in/static/logo-white-large-beta-white.png",
      "width": 600,
      "height": 60
    }
  }



                    }`
            }
          ]}
        />
      );
    } else {
      return <div />;
    }
  }
}

SeoTags.propTypes = {
  seo: React.PropTypes.object,
  apiRoot: React.PropTypes.string.isRequired
};

export default SeoTags;
