export default {
    base: "/web-blazar/",
    build: {
        minify: "terser",
        terserOptions: {
            keep_classnames: true,
            keep_fnames: true
        }
    }
};
