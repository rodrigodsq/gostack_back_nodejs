import Redis, { Redis as RedisClient} from 'ioredis';
import cacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';

export default class RedisCachedProvider implements ICacheProvider {

    private client: RedisClient;

    constructor() {
        // abrindo conexão com o banco redis
        this.client = new Redis(cacheConfig.config.redis);
    }

    // salvando dados (chave, valor) no redis;
    public async save(key: string, value: any): Promise<void> {
        await this.client.set(key, JSON.stringify(value));  //salvando o value sempre como string;
    };

    // Com base na key listar todos os dados do redis;
    public async recover<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);

        if(!data) {
            return null;
        }

        const parseData = JSON.parse(data) as T;        //para retorna o typo T que é a tipagem passada por parametro;
        return parseData;
    };

    //deletar uma chave do cache
    public async invalidate(key: string): Promise<void> {
        await this.client.del(key);
    }

    public async invalidatePrefix(prefix: string): Promise<void> {

        // pegando todas as chaves (no redis) que tem como nome o prefix e qualquer coisa apos os dois pontos :
        const keys = await this.client.keys(`${prefix}:*`);

        //pipeline: para executar multiplas operações ao mesmo tempo, é mais performatico;
        const pipeline = this.client.pipeline();

        // deletando todas as chaves com o prefix;
        keys.forEach(key => {
            pipeline.del(key);
        });

        // exec: para executar o pipeline e no caso remover todas as chaves aos mesmo tempo;
        await pipeline.exec();
    }
}