import { Fragment } from 'react';

/**
 * Renders CMS text where a line break ("\n") marks a deliberate break in a
 * heading. Breaks apply from `sm` up; on phones the text wraps naturally.
 */
export function Lines({ text, breakClassName = 'hidden sm:block' }: { text: string; breakClassName?: string }) {
  const parts = text.split('\n');
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <>
              {' '}
              <br className={breakClassName} />
            </>
          )}
          {part}
        </Fragment>
      ))}
    </>
  );
}
