import { ActivityDot, Laptop, Particles } from './scene-kit';

const rows = [
  ['a', 'b', 'd'],
  ['b', 'c'],
  ['c', 'a', 'd'],
  ['a', 'd'],
  ['b', 'a', 'c'],
  ['d', 'b'],
  ['a', 'c'],
];

export function ProcessScene() {
  return (
    <div className="scene process-scene" aria-hidden="true">
      <Particles points={[{ x: 18, y: 22 }, { x: 42, y: 16 }, { x: 30, y: 70 }, { x: 12, y: 48 }, { x: 48, y: 40 }]} />
      <Laptop float="c" tone="code">
        <div className="editor">
          <div className="editor-top"><i /><i /><ActivityDot /></div>
          <div className="editor-body">
            {rows.map((row, index) => (
              <div className="code-row" key={index}>
                <i />
                {row.map((token, tokenIndex) => <span key={tokenIndex} className={`tok tok-${token}`} />)}
              </div>
            ))}
          </div>
        </div>
      </Laptop>
    </div>
  );
}
