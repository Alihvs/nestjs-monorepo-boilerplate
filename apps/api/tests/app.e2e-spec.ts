import * as request from 'supertest';
import { prefix, url } from './constants';

const app = `${url}/${prefix}`;
describe('ROOT', () => {
    it('Should ping and get an empty object', () => {
        return request(app)
            .get('/')
            .expect(200)
            .expect(({ body }) => {
                expect(body).toBeInstanceOf(Object);
                expect(body).toEqual({});
            });
    });
});
