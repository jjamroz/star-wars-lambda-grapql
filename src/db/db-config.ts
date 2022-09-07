export const PAGINATED_MAX_LIMIT = 5;

export const config = process.env.IS_OFFLINE
  ? {
      region: process.env.REGION,
      endpoint: process.env.ENDPOINT,
    }
  : {};
