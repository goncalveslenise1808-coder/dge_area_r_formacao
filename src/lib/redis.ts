import Redis from 'ioredis';

const globalForRedis = global as unknown as { redis?: Redis };

// Reaproveita a conexão se já existir no ambiente global (só no dev!)
const redis = globalForRedis.redis ?? new Redis(process.env.REDIS_URL!);

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;

export default redis;
