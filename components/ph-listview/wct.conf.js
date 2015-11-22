//overwriting the default-conf to prevent safari from running (no safari 9.0-driver available at the moment)
module.exports = {
  plugins: {
    local: {
      browsers: ['firefox']
    }
  },
};
