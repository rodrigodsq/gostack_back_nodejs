import { container } from 'tsyringe';
import ICacheProvider from './models/ICacheProvider';
import RedisCachedProvider from './implementations/RedisCacheProvider';

const providers = {
    redis: RedisCachedProvider
};

container.registerSingleton<ICacheProvider>(
    'CacheProvider',
    providers.redis
);