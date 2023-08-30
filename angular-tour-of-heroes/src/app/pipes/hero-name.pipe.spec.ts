import { HeroNamePipe } from './hero-name.pipe';

describe('HeroNamePipe', () => {
  it('create an instance', () => {
    const pipe = new HeroNamePipe();
    expect(pipe).toBeTruthy();
  });
});
