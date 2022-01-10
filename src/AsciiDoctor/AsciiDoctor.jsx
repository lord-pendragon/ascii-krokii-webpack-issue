/* eslint-disable react/no-danger */
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Asciidoctor from 'asciidoctor';
import sanitizeHtml from 'sanitize-html';
import hljs from 'highlight.js';
import kroki from 'asciidoctor-kroki';

const AsciiDoctor = ({ file }) => {
  const [html, setHtml] = useState('');
  const [cleanHtml, setCleanedHtml] = useState('');

  useEffect(() => {
    if (file) {
      const asciidoctor = Asciidoctor();
      const registry = asciidoctor.Extensions.create();
      kroki.register(registry);
      const converted = asciidoctor.convert(file, {
        header_footer: '',
        extension_registry: registry,
        attributes: {
          icons: 'font',
          nofooter: '',
          notitle: '',
          experimental: '',
          'source-language': 'html',
          'source-highlighter': 'highlight.js',
        },
      });

      setTimeout(() => {
        Array.from(
          document.querySelectorAll('pre.highlight > code')
        ).forEach((el) => hljs.highlightBlock(el));
      }, 100);
      setHtml(converted);
    }
  }, [file]);

  useEffect(() => {
    if (html) {
      const sanitazed = sanitizeHtml(html, {
        allowedAttributes: {
          '*': ['class'],
          link: ['href', 'rel'],
          script: ['src'],
          a: ['href'],
          img: ['src'],
          iframe: ['src', 'allowfullscreen', 'frameborder', 'sandbox', 'marginwidth', 'marginheight', 'vspace',
          'width', 'height', 'autoplay', 'scrolling', 'hspace', 'allowtransparency', 'align', 'name', 'seamless']
        },
        allowVulnerableTags: true,
        allowedTags: [
          'link',
          'iframe',
          'img',
          'a',
          'script',
          'title',
          'address',
          'article',
          'aside',
          'footer',
          'header',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'hgroup',
          'main',
          'nav',
          'section',
          'blockquote',
          'dd',
          'div',
          'dl',
          'dt',
          'figcaption',
          'figure',
          'hr',
          'li',
          'main',
          'ol',
          'p',
          'pre',
          'ul',
          'a',
          'abbr',
          'b',
          'bdi',
          'bdo',
          'br',
          'cite',
          'code',
          'data',
          'dfn',
          'em',
          'i',
          'kbd',
          'mark',
          'q',
          'rb',
          'rp',
          'rt',
          'rtc',
          'ruby',
          's',
          'samp',
          'small',
          'span',
          'strong',
          'sub',
          'sup',
          'time',
          'u',
          'var',
          'wbr',
          'caption',
          'col',
          'colgroup',
          'table',
          'tbody',
          'td',
          'tfoot',
          'th',
          'thead',
          'tr',
        ],
      });
      setCleanedHtml(sanitazed);
    }
  }, [html]);

  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
};

export default AsciiDoctor;
