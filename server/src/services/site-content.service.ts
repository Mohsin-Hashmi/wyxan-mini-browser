import { Parser } from "htmlparser2";
import sanitizeHtml from "sanitize-html";
import { addressSchema } from "../schemas/site.schema.js";

const inlineTags = new Set(["a", "span", "strong", "em", "b", "i", "u", "s", "small", "sub", "sup"]);

/*
 * Keep supported prose markup while removing unsafe elements and attributes.
 * Preserve only links that point to valid fictional addresses.
 */
function sanitizeSiteHtml(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: [
      "h1", "h2", "h3", "h4", "h5", "h6", "p", "div", "span", "br", "hr",
      "strong", "em", "b", "i", "u", "s", "small", "sub", "sup", "blockquote",
      "pre", "code", "ul", "ol", "li", "dl", "dt", "dd", "a",
      "table", "caption", "thead", "tbody", "tfoot", "tr", "th", "td",
    ],
    allowedAttributes: { a: ["href"] },
    allowedSchemes: [],
    allowProtocolRelative: false,
    transformTags: {
      /*
       * Normalize a valid fictional link or remove its unsupported destination.
       */
      a: (_tagName, attributes): sanitizeHtml.Tag => {
        const address = addressSchema.safeParse(attributes.href);
        if (!address.success) {
          return { tagName: "a", attribs: {} };
        }

        return { tagName: "a", attribs: { href: address.data } };
      },
    },
  });
}

/*
 * Extract decoded text from sanitized HTML for validation and searching.
 * Separate block elements with spaces while keeping inline words together.
 */
function extractSiteText(html: string): string {
  const text: string[] = [];
  const parser = new Parser({
    /*
     * Collect the decoded text encountered by the HTML parser.
     */
    ontext(value) { text.push(value); },
    /*
     * Add a word boundary when a block element begins.
     */
    onopentag(name) {
      if (!inlineTags.has(name)) text.push(" ");
    },
    /*
     * Add a word boundary when a block element ends.
     */
    onclosetag(name) {
      if (!inlineTags.has(name)) text.push(" ");
    },
  });
  parser.end(html);

  return text.join("").replace(/\s+/g, " ").trim();
}

/*
 * Prepare author HTML for storage by sanitizing it and extracting readable text.
 * Return both versions for publishing and repeatable seeding.
 */
export function prepareSiteContent(input: string) {
  const html = sanitizeSiteHtml(input);
  const searchableText = extractSiteText(html);

  return { html, searchableText };
}
