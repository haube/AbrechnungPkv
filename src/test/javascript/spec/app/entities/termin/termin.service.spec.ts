/* tslint:disable max-line-length */
import axios from 'axios';
import { format } from 'date-fns';

import * as config from '@/shared/config/config';
import { DATE_TIME_FORMAT } from '@/shared/date/filters';
import TerminService from '@/entities/termin/termin.service';
import { Termin } from '@/shared/model/termin.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}));

describe('Service Tests', () => {
  describe('Termin Service', () => {
    let service: TerminService;
    let elemDefault;
    let currentDate: Date;
    beforeEach(() => {
      service = new TerminService();
      currentDate = new Date();

      elemDefault = new Termin(0, currentDate, 'AAAAAAA');
    });

    describe('Service methods', async () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            datum: format(currentDate, DATE_TIME_FORMAT)
          },
          elemDefault
        );
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should create a Termin', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            datum: format(currentDate, DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            datum: currentDate
          },
          returnedFromService
        );

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a Termin', async () => {
        const returnedFromService = Object.assign(
          {
            datum: format(currentDate, DATE_TIME_FORMAT),
            notiz: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datum: currentDate
          },
          returnedFromService
        );
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should return a list of Termin', async () => {
        const returnedFromService = Object.assign(
          {
            datum: format(currentDate, DATE_TIME_FORMAT),
            notiz: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            datum: currentDate
          },
          returnedFromService
        );
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        service.retrieve(expected).then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should delete a Termin', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        service.delete(123).then(res => {
          expect(res.ok);
        });
      });
    });
  });
});
