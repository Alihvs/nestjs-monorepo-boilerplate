module.exports = (config) => {
    console.log('Configuring webpack');
    return {
        ...config,
        node: {
            ...config.node,
            __dirname: true
        }
    };
};
