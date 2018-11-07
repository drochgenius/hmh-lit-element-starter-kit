import { ComponentBase, html, property, TemplateResult } from '@hmh/component-base';

/**
 * `<my-component>`
 * @demo ./demo/index.html
 */
export class MyComponent extends ComponentBase<string> {
    @property({ type: String })
    public name: string = 'World';

    protected render(): TemplateResult {
        const { name } = this;
        return html`
            <h3>Hello ${name}!</h3>
        `;
    }
}

customElements.define('my-component', MyComponent);
