module.exports = {
    runtimeCompiler: true,

    css: {
        loaderOptions: {
            sass: {
                implementation: require('sass'), // This line must in sass option
            },
        },
    },

    transpileDependencies: [
      'vuetify'
    ]
};
