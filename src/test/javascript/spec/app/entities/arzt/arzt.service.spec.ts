/* tslint:disable max-line-length */
import axios from 'axios';

import * as config from '@/shared/config/config';
import {} from '@/shared/date/filters';
import ArztService from '@/entities/arzt/arzt.service';
import { Arzt } from '@/shared/model/arzt.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}));

describe('Service Tests', () => {
  describe('Arzt Service', () => {
    let service: ArztService;
    let elemDefault;
    beforeEach(() => {
      service = new ArztService();

      elemDefault = new Arzt(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', async () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should create a Arzt', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a Arzt', async () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            strasse: 'BBBBBB',
            hausnummer: 'BBBBBB',
            plz: 'BBBBBB',
            ort: 'BBBBBB',
            telefon: 'BBBBBB',
            telefon2: 'BBBBBB',
            fax: 'BBBBBB',
            email: 'BBBBBB',
            web: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should return a list of Arzt', async () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            strasse: 'BBBBBB',
            hausnummer: 'BBBBBB',
            plz: 'BBBBBB',
            ort: 'BBBBBB',
            telefon: 'BBBBBB',
            telefon2: 'BBBBBB',
            fax: 'BBBBBB',
            email: 'BBBBBB',
            web: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        service.retrieve(expected).then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should delete a Arzt', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        service.delete(123).then(res => {
          expect(res.ok);
        });
      });
    });
  });
});
