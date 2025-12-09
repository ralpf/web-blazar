export default {
    build: {
        minify: "terser",
        terserOptions: {
            keep_classnames: true,
            keep_fnames: true
        }
    },
    server: {
        watch: {
            usePolling: true,
            interval: 1000
        }
    }
};
