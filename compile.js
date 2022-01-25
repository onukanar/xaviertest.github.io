const fs = require('fs');
require('svelte/register');

const Component = require('./Widget.html').default;

const { head, html, css } = Component.render({
	answer: "cms-string-content"// pass in cms values as props
});

fs.writeFileSync("output/styles.css", css.code);
//write out for content editor
fs.writeFileSync("output/index.html", html)