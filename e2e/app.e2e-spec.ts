import { MetricModellerPage } from './app.po';

describe('metric-modeller App', () => {
  let page: MetricModellerPage;

  beforeEach(() => {
    page = new MetricModellerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
