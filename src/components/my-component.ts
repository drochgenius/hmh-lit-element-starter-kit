import { ComponentBase, html, property, TemplateResult, until } from '@hmh/component-base';

/**
 * `<my-component>`
 * @demo ./demo/index.html
 */
export class MyComponent extends ComponentBase<string> {
    @property({ type: String })
    public name: string = 'World';

    private get styles(): TemplateResult {
        return html`
            <style>
                p {
                    color: blue;
                }
            </style>
        `;
    }

    protected render(): TemplateResult {
        const { name, styles } = this;
        return html`
            ${styles}
            <h3>Hello ${name}, here's the quote of the day:</h3>
            <p class="quote">${until(this.getQuote(), 'loading...')}</p>
        `;
    }
    private async getQuote(): Promise<string>{
        let quote:any = await this.quote();
        if(quote && quote.contents && quote.contents.quotes){
            return quote.contents.quotes[0].quote ;
        }
        return "no quote" ;
    }
    private async quote(): Promise<string> {
        const response: Response = await fetch('http://quotes.rest/qod.json');
        const data: string = await response.json();
        console.log(data);
        return data;
    }
}

customElements.define('my-component', MyComponent);
