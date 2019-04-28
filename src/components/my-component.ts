import { ComponentBase, html, property, TemplateResult } from '@hmh/component-base';

const template = document.createElement('template');
template.innerHTML = `
<style>
@import "https://codepen.io/chriscoyier/pen/VqKvZr.css";
</style>
<button>Sup?</button>`;

/**
 * `<my-component>`
 * @demo ./demo/index.html
 */
export class MyComponent extends ComponentBase<string> {
    @property({ type: String })
    public defaultName: string = 'Boris';

    @property({ type: String })
    public defaultTitle: string = 'The Beach Bum';

    @property({ type: String })
    public defaultDescription: string = 'Likes to wallow in the warm, warm afternoon waves.';

    get styles(): TemplateResult { 
        return html`
            <style>
                @import "https://unpkg.com/material-design-icons-iconfont@latest/dist/material-design-icons.css";
                @import "https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css";
                .mdc-card {
                    width: 390px;
                    /* height: 350px; */
                }
                .mdc-card__media {
                    background-image: url("https://placeimg.com/390/200/people");
                }
                .demo-card__primary {
                    padding: 1rem;
                }
                .demo-card__secondary {
                    padding: 0 1rem 8px;
                }
            </style>
        `;
    }

    protected render(): TemplateResult {
        return html`
            <style>
                @font-face {
                    font-family: 'Material Icons';
                    font-style: normal;
                    font-weight: 400;
                    src: url('https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2') format('woff2');
                }
            </style>
            <div class="mdc-card demo-card">
            <div
                class="mdc-card__primary-action demo-card__primary-action" tabindex="0">
                <div class="mdc-card__media mdc-card__media--16-9 demo-card__media"></div>
                <div class="demo-card__primary">
                <h2 class="demo-card__title mdc-typography mdc-typography--headline6">
                    <slot name="name">${this.defaultName}</slot>
                </h2>
                <h3 class="demo-card__subtitle mdc-typography mdc-typography--subtitle2">
                    <slot name="title">${this.defaultTitle}</slot>
                </h3>
                </div>
                <div class="demo-card__secondary mdc-typography mdc-typography--body2">
                    <slot name="description">${this.defaultDescription}</slot>
                </div>
            </div>
            <div class="mdc-card__actions">
                <div class="mdc-card__action-icons">
                <button
                    class="mdc-icon-button mdc-card__action mdc-card__action--icon--unbounded"
                    aria-pressed="false"
                    aria-label="Add to favorites"
                    title="Add to favorites"
                >
                    <i
                    class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on"
                    >favorite</i
                    >
                    <i class="material-icons mdc-icon-button__icon">favorite_border</i>
                </button>
                <button
                    class="mdc-icon-button material-icons mdc-card__action mdc-card__action--icon--unbounded"
                    title="Share"
                    data-mdc-ripple-is-unbounded="true"
                >share
                </button>
                <button
                    class="mdc-icon-button material-icons mdc-card__action mdc-card__action--icon--unbounded"
                    title="More options"
                    data-mdc-ripple-is-unbounded="true"
                >more_vert
                </button>
                </div>
            </div>
            </div>
            ${this.styles}
        `;
    }
}

customElements.define('my-component', MyComponent);
