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
        expect(heading.innerText).to.equal('The Beach Bum');
    });

    it('should render with provided name attribute', async (): Promise<void> => {
        withSnippet('with-name');
        const el: MyComponent = document.querySelector('my-component');
        await el.updateComplete;

        expect(el.shadowRoot).not.to.be.undefined;
        const heading: HTMLHeadingElement = el.shadowRoot.querySelector('h2');
        await el.updateComplete;
        expect(heading.innerText).to.equal('John');
    });

    it('should update when name is changed', async (): Promise<void> => {
        withSnippet('default');
        const el: MyComponent = document.querySelector('my-component');
        await el.updateComplete;

        expect(el.shadowRoot).not.to.be.undefined;
        const heading: HTMLHeadingElement = el.shadowRoot.querySelector('h2');
        expect(heading.innerText).to.equal('Boris');

        el.defaultName = 'Jane';
        await el.updateComplete;
        expect(heading.innerText).to.equal('Jane');
    });
});

mocha.run();
