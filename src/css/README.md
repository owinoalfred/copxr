# CSS

## Utility classes

We are using https://tailwindcss.com/

Please try to avoid adding your own styles if they can be done by utility classes instead!

Why we prefer this system:

- https://tailwindcss.com/docs/utility-first/
- This allows us to forget about CSS!
- Our built CSS is 5-10KB vs Bootstrap's 100-200KB!
- No more worrying if changing a class somewhere will break the entire site!

## Post-processing

Our CSS is parsed by postcss. See postcss.config.js for details.
This is then built to public/css/main.css via webpack.

