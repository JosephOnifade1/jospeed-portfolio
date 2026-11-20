import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, ChevronDown, Clipboard, FilePenLine } from 'lucide-react';
import UpworkProfileLink from './UpworkProfileLink.jsx';
import { siteUrl } from '../seo/pageHead.js';

const IDEA_PROMPT = '[what you want to build and who it’s for]';
function starterBrief(project) {
  // Only the explicit “Start a similar project” handoff contributes a reference.
  return [
    'Hi Joseph,',
    '',
    `Project: ${IDEA_PROMPT}`,
    'First deliverable: [one thing the first version should do]',
    'Timeline: [target date or flexible]',
    'Budget: [range or not sure yet]',
    ...(project ? ['', `Reference: ${project.name} — ${siteUrl(`/case-study/${project.id}`)}`] : []),
  ].join('\n');
}

export default function UpworkBrief({ project, projectNote, linked }) {
  const [draft, setDraft] = useState(() => starterBrief(project));
  const [status, setStatus] = useState('idle');
  const disclosure = useRef(null);
  const editor = useRef(null);
  const attempt = useRef(0);
  const note = projectNote.trim();
  const includesNote = note && draft.includes(note);

  useLayoutEffect(() => {
    if (linked) disclosure.current.open = true;
  }, [linked]);

  function edit(text) {
    attempt.current += 1; // A late clipboard result must not describe a newer edit.
    setDraft(text);
    setStatus('idle');
  }

  function addNote() {
    if (!note || includesNote) return;
    // Keep edits elsewhere in the brief. Nothing reads the name or email fields.
    edit(
      draft.includes(IDEA_PROMPT)
        ? draft.replace(IDEA_PROMPT, () => note)
        : [draft.trimEnd(), `Project note: ${note}`].filter(Boolean).join('\n\n')
    );
    editor.current.focus({ preventScroll: true });
  }

  async function copyBrief() {
    if (!draft.trim() || status === 'copying') return;
    const current = ++attempt.current;
    setStatus('copying');
    try {
      await navigator.clipboard.writeText(draft);
      if (editor.current && current === attempt.current) setStatus('copied');
    } catch {
      // Embedded previews and some browsers block clipboard writes. Keep the
      // exact same text available for ordinary keyboard or touch copying.
      if (!editor.current || current !== attempt.current) return;
      setStatus('manual');
      if (disclosure.current.open) {
        editor.current.focus();
        editor.current.select();
      }
    }
  }

  return (
    <details data-needs-js className="brief-tool" ref={disclosure}>
      <summary id="upwork-brief" tabIndex={0}>
        <FilePenLine size={17} aria-hidden="true" /> Prepare an Upwork brief
        <ChevronDown className="brief-chevron" size={16} aria-hidden="true" />
      </summary>
      <div className="brief-editor">
        <p id="brief-hint">
          Edit this starter, then paste it into a job post or invitation. Nothing is sent from here.
        </p>
        <div className="brief-label-row">
          <label htmlFor="brief-draft">Your project brief</label>
          {note &&
            (includesNote ? (
              <span className="brief-included">
                <Check size={14} aria-hidden="true" /> Note included
              </span>
            ) : (
              <button className="brief-add" type="button" onClick={addNote}>
                Add my project note
              </button>
            ))}
        </div>
        <textarea
          ref={editor}
          id="brief-draft"
          aria-describedby="brief-hint brief-feedback"
          rows={8}
          autoComplete="off"
          value={draft}
          onChange={(event) => edit(event.target.value)}
        />
        <div className="brief-actions">
          <button
            className="brief-copy"
            type="button"
            disabled={!draft.trim()}
            aria-disabled={status === 'copying' || undefined}
            onClick={copyBrief}
          >
            {status === 'copied' ? (
              <Check size={16} aria-hidden="true" />
            ) : (
              <Clipboard size={16} aria-hidden="true" />
            )}
            {status === 'copying' ? 'Copying…' : 'Copy brief'}
          </button>
          {(status === 'copied' || status === 'manual') && (
            <UpworkProfileLink className="brief-next" aria-label="Open Upwork profile (opens in a new tab)">
              Open Upwork <ArrowUpRight size={14} aria-hidden="true" />
            </UpworkProfileLink>
          )}
        </div>
        <p id="brief-feedback" aria-live="polite" aria-atomic="true">
          {status === 'copied' && 'Copied. Your brief is ready to paste on Upwork.'}
          {status === 'manual' &&
            'Automatic copy is unavailable. Use your device’s Copy command on the selected text.'}
        </p>
      </div>
    </details>
  );
}
