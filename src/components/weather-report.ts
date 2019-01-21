import { ComponentBase, html, property, TemplateResult } from '@hmh/component-base';

/**
 * `<my-component>`
 * @demo ./demo/weather.html
 */
export class WeatherReport extends ComponentBase<string> {
    private baseUrl: string = 'http://localhost:8010/proxy';

    @property({ type: String, reflect: true })
    public date: string = this.today;
    @property({ type: String, reflect: true })
    public location: string = '';
    @property({ type: String, reflect: true, attribute: 'effective-location' })
    public effectiveLocation: string = '';
    @property({ type: Object })
    public report: WeatherAPIReportData;

    private get today(): string {
        const date: Date = new Date();
        const y: string = date.getFullYear().toString();
        const m: string = (date.getMonth() + 1).toString().padStart(2, '0');
        const d: string = date
            .getDate()
            .toString()
            .padStart(2, '0');

        return `${y}-${m}-${d}`;
    }

    private get styles(): TemplateResult {
        return html`
            <style>
                :host {
                    display: inline-block;
                    font-family: Roboto, sans-serif;
                }

                .mdc-card {
                    padding: 0.5em;
                    margin: 0.5em;
                    border: 1px solid rgba(200, 200, 200, 0.5);
                    border-radius: 0.25em;
                }

                h3 {
                    font-size: 1.1em;
                }

                h4 {
                    text-align: center;
                }

                figure {
                    margin: 0;
                    padding: 0;
                }

                img {
                    margin: 1em 3em;
                }

                figcaption {
                    text-align: center;
                    font-weight: bold;
                    margin-top: 0.5em;
                }
            </style>
        `;
    }

    protected update(changedProperties: Map<string, any>) {
        if (changedProperties.has('location') || changedProperties.has('date')) {
            this.showReport();
        }
        return super.update(changedProperties);
    }

    protected render(): TemplateResult {
        const { baseUrl, report, styles, effectiveLocation } = this;
        if (report) {
            const { the_temp, weather_state_abbr, weather_state_name } = report;
            return html`
                ${styles}
                <div class="mdc-card">
                    <h3>${effectiveLocation}</h3>
                    <figure>
                        <img src="${baseUrl}/static/img/weather/${weather_state_abbr}.svg" alt="${weather_state_name}" />
                        <figcaption>${weather_state_name}</figcaption>
                    </figure>
                    <h4>${Math.round(the_temp)}°C</h4>
                </div>
            `;
        } else {
            return html`
                ${styles}
                <div class="mdc-card">Loading...</div>
            `;
        }
    }

    private async showReport() {
        const woeid: number = await this.find();
        const report: any = await this.getForecast(woeid);

        this.report = report;
    }

    private async find(): Promise<number> {
        const url: string = `${this.baseUrl}/api/location/search/?query=${this.location}`;

        const result: Response = await fetch(url, {
            headers: { 'Content-Type': 'application/json' }
        });

        if (result.status === 200) {
            const data: WeatherAPISearchResult[] = await result.json();

            this.effectiveLocation = data[0].title;

            return data[0].woeid;
        }

        throw new Error(`Weather location not found: ${this.location}`);
    }

    private async getForecast(woeid: number): Promise<any> {
        const url: string = `${this.baseUrl}/api/location/${woeid}`;

        const result: Response = await fetch(url, {
            headers: { 'Content-Type': 'application/json' }
        });

        if (result.status === 200) {
            const data: any = await result.json();

            const filtered: WeatherAPIReportData[] = data.consolidated_weather.filter(
                ({ applicable_date }: WeatherAPIReportData) => applicable_date === this.date
            );
            return filtered.pop();
        }

        throw new Error(`Could not retrieve weather forecast for: ${this.location}`);
    }
}

interface WeatherAPISearchResult {
    title: string;
    woeid: number;
}

interface WeatherAPIReportData {
    id: number;
    weather_state_name: string;
    weather_state_abbr: string;
    wind_direction_compass: string;
    created: string;
    applicable_date: string;
    min_temp: number;
    max_temp: number;
    the_temp: number;
    wind_speed: number;
    wind_direction: number;
    air_pressure: number;
    humidity: number;
    visibility: number;
    predictability: number;
}

customElements.define('weather-report', WeatherReport);
