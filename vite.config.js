export default {
    base: "https://ralpf.github.io/web-blazar/",
    build: {
        minify: "terser",
        terserOptions: {
            keep_classnames: true,
            keep_fnames: true
        }
    },
    server: {
        proxy: {
            '/esp': {
                target: 'http://192.168.100.201',
                changeOrigin: true,
            },
        },
    },
};
