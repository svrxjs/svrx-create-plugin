module.exports = {
  // Ref: https://docs.svrx.io/en/plugin/contribution.html#schema
  configSchema: {},<% if (pluginType !== 'server') { %>

  assets: {
    // script resources
    script: ['./client.js'],
    // css resources
    style: [],
  },<% } %><% if (pluginType !== 'browser') { %>

  hooks: {
    // Ref: https://docs.svrx.io/en/plugin/contribution.html#server
    async onCreate({ middleware, injector, events, router, config, logger, io }) {
      // TODO
      return () => {
        // fire onDestory
      };
    },
  },<% } %>
};
