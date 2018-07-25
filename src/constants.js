export default {
  DEFAULT: {
    AUTH_MODE: 'client',
    AUTO_FLUSH_INTERVAL: 60000,
    LOGGING_LEVEL: 'all',
    TIER: 1
  },

  ENDPOINT: {
    ABILITY:'/ability',
    CLIENT_SESSION:'/learner/client-session',
    DIMENSION:'/dimension',
    GAME:'/game',
    INGESTION:'/ingestion',
    LOCAL_ABILITY:'/local-ability',
    LOCAL_DIMENSION:'/local-dimension',
    LOGOUT:'/user/logout'
  },

  HOST: {
    DEV:'https://develop.kidaptive.com/v3',
    PROD:'https://service.kidaptive.com/v3'
  },

  USER_ENDPOINTS: [
    'ABILITY',
    'INGESTION',
    'LOCAL_ABILITY',
    'LOGOUT'
  ]
};
