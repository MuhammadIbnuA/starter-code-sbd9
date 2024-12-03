/**
 * New Relic agent configuration.
 *
 * See lib/config/default.js in the agent distribution for a complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  /**
   * Array of application names.
   */
  app_name: ['YOUR APP NAME'], // Application name from NEW_RELIC_APP_NAME
  /**
   * Your New Relic license key.
   */
  license_key: 'YOUR LICENSES KEY', // License key from NEW_RELIC_LICENSE_KEY
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: 'info',
  },
  /**
   * This feature is available in versions 6.0.0 and higher of the agent.
   * Allows the agent to use a weekly security endpoint.
   * Defaults to `false` if not set, enabling it ensures better compliance.
   */
  allow_all_headers: true, // Ensure headers are included in transactions
  distributed_tracing: {
    enabled: true, // Enable distributed tracing for better metrics
  },
};
