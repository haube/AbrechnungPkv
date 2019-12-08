/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import RechnungDetailComponent from '@/entities/rechnung/rechnung-details.vue';
import RechnungClass from '@/entities/rechnung/rechnung-details.component';
import RechnungService from '@/entities/rechnung/rechnung.service';

const localVue = createLocalVue();
const mockedAxios: any = axios;

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

jest.mock('axios', () => ({
  get: jest.fn()
}));

describe('Component Tests', () => {
  describe('Rechnung Management Detail Component', () => {
    let wrapper: Wrapper<RechnungClass>;
    let comp: RechnungClass;

    beforeEach(() => {
      mockedAxios.get.mockReset();
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      wrapper = shallowMount<RechnungClass>(RechnungDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { rechnungService: () => new RechnungService() }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', async () => {
      it('Should call load all on init', async () => {
        // GIVEN
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: 123 } }));

        // WHEN
        comp.retrieveRechnung(123);
        await comp.$nextTick();

        // THEN
        expect(comp.rechnung).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
