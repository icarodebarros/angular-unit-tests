import { TestPipe } from './test-pipe.pipe';

describe('TestPipe', () => {
  const pipe = new TestPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it("should transform 'abc' to 'Abc'", () => {
    expect(pipe.transform('abc')).toEqual('Abc');
  });

  it("should transform 'nome sobrenome' to 'Nome Sobrenome'", () => {
    expect(pipe.transform('nome sobrenome')).toEqual('Nome Sobrenome');
  });

  it("should try to transform a empty string", () => {
    expect(pipe.transform('')).toEqual('');
  });

});
