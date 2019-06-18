import { ComponentBase, css, CSSResult, html, property, TemplateResult, until } from '@hmh-cam/component-base';

/**
 * `<my-component>`
 * @demo ./demo/index.html
 */
export class MyComponent extends ComponentBase<string> {
    @property({ type: String })
    public name: string = 'World';

    static get styles(): CSSResult {
        return css`
            div {
                padding: 1em;
                border: 1px solid red;
            }
            h3 {
                color: var(--header-color, inherit);
            }
            p {
                color: blue;
                border: 1px solid gray;
                padding: 0.5em;
            }
        `;
    }

    protected render(): TemplateResult {
        const { name } = this;
        return html`
            <div>
                <h3>Hello ${name}, here's the quote of the day:</h3>
                <p class="quote">${until(this.quote(), 'loading...')}</p>
            </div>
        `;
    }

    private async quote(): Promise<string> {
        const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
        const response: Response = await fetch('http://qod.rest:3000/api/qod.json', { headers });

        if (response.status === 200) {
            return response.json();
        }

        return 'could not load the quote';
    }
}

customElements.define('my-component', MyComponent);
