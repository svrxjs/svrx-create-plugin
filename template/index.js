module.exports = {
  // Ref: https://docs.svrx.io/en/
  configSchema: {},
<% if (pluginType !== 'server') { %>
  // Ref: https://docs.svrx.io/en/
  assets: {
    script: ['./client.js'],
    style: [],
  },
<% } %>
  // Ref: https://docs.svrx.io/en/
  services: {},
<% if (pluginType !== 'browser') { %>
  hooks: {
    // Ref: https://docs.svrx.io/en/
    async onCreate({ middleware, injector, events, router, config, logger, io }) {
      // TODO
      return () => {
        // fire onDestory
      };
    },

    // Ref: https://docs.svrx.io/en/
    async onRoute(ctx, next, { config }) {
      // TODO
      await next();
    },
  },
<% } %>
};
