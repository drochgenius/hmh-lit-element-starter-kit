import { withSnippet } from '@hmh/lit-element-tester';
import { WeatherReport, WeatherAPISearchResult, WeatherAPIReportData } from '../components/weather-report';
import { SinonStub, stub } from 'sinon';

const expect: Chai.ExpectStatic = chai.expect;

export default () => {
    describe(`<weather-report>`, (): void => {
        let fetchStub: SinonStub;

        beforeEach(() => {
            fetchStub = stub(window, 'fetch');

            const findResponse: Response = new Response(
                JSON.stringify([
                    {
                        woeid: 9999
                    }
                ] as WeatherAPISearchResult[]),
                {
                    status: 200,
                    headers: { 'Content-type': 'application/json' }
                }
            );

            fetchStub
                .withArgs('http://localhost:8010/proxy/api/location/search/?query=Chicago', {
                    headers: { 'Content-Type': 'application/json' }
                })
                .returns(Promise.resolve(findResponse));

            const forecastResponse: Response = new Response(
                JSON.stringify({ consolidated_weather: [{ weather_state_abbr: 'sn', weather_state_name: 'Snow' }] as WeatherAPIReportData[] }),
                {
                    status: 200,
                    headers: { 'Content-type': 'application/json' }
                }
            );

            fetchStub
                .withArgs('http://localhost:8010/proxy/api/location/9999', {
                    headers: { 'Content-Type': 'application/json' }
                })
                .returns(Promise.resolve(forecastResponse));
        });

        it('should render default state', async (): Promise<void> => {
            withSnippet('weather1');
            const el: WeatherReport = document.querySelector('weather-report');
            await el.updateComplete;

            expect(el.shadowRoot).not.to.be.undefined;
        });

        it('should render with provided name attribute', async (): Promise<void> => {
            withSnippet('weather1');
            const el: WeatherReport = document.querySelector('weather-report');
            await el.updateComplete;

            expect(el.shadowRoot).not.to.be.undefined;
        });

        afterEach(() => {
            fetchStub.restore();
        });
    });
};
