/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals.push({
            "utf-8-validate": "commonjs utf-8-validate",
            bufferutil: "commonjs bufferutil",
        });

        return config;
    },
    images: {
        domains: ["osapiente.s3.sa-east-1.amazonaws.com"],
    },
};

module.exports = nextConfig;
