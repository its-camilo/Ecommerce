export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS', [
      'rD9s/qPgR1e4NGYtIne3aA==',
      '75nGge5PWysPMi/j3RGKjw==',
      'M0OMznn6eMMP/hTdj6h/Rw==',
      'TsZDaY3iylBHnVw9bGQNPg=='
    ]),
  },
});
