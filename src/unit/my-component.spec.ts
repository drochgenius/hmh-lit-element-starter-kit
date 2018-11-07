import { MyComponent } from '../components/my-component';
const expect: Chai.ExpectStatic = chai.expect;

describe(`<my-component>`, (): void => {
    it('should render default state', async (): Promise<void> => {
        withSnippet('default');
        const el: MyComponent = document.querySelector('my-component');
        await 
        expect(true).to.be.true;
    });
});

mocha.run();
