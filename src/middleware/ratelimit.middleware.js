import { rateLimit } from 'express-rate-limit'

export const limiter = rateLimit({
	windowMs: 60 * 1000, // 15 minutes
	limit: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
  statusCode: 429,
  message: 'Too many requests',
  handler: (req, res, next, options) =>
  res.sendStatus(429),
})