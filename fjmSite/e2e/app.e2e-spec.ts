import { AppPage } from './app.po';

describe('fjm-site App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Jobs submitted to the national life science supercomputer');
  });
});
