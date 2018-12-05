import { withSnippet} from '@hmh/lit-element-tester';
import { MyComponent } from '../components/my-component';

const expect: Chai.ExpectStatic = chai.expect;

describe(`<my-component>`, (): void => {
    it('should render default state', async (): Promise<void> => {
        withSnippet('default');
        const el: MyComponent = document.querySelector('my-component');
        await el.updateComplete;

        expect(el.shadowRoot).not.to.be.undefined;
        const heading: HTMLHeadingElement = el.shadowRoot.querySelector('h3');
        expect(heading.innerText).to.equal('Hello World!');
    });

    it('should render with provided name attribute', async (): Promise<void> => {
        withSnippet('with-name');
        const el: MyComponent = document.querySelector('my-component');
        await el.updateComplete;

        expect(el.shadowRoot).not.to.be.undefined;
        const heading: HTMLHeadingElement = el.shadowRoot.querySelector('h3');
        expect(heading.innerText).to.equal('Hello John!');
    });

    it('should update when name is changed', async (): Promise<void> => {
        withSnippet('default');
        const el: MyComponent = document.querySelector('my-component');
        await el.updateComplete;

        expect(el.shadowRoot).not.to.be.undefined;
        const heading: HTMLHeadingElement = el.shadowRoot.querySelector('h3');
        expect(heading.innerText).to.equal('Hello World!');

        el.name = 'Jane';
        await el.updateComplete;
        expect(heading.innerText).to.equal('Hello Jane!');
    });
});

mocha.run();
