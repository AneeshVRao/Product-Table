import { useState, useRef, useEffect } from 'react';

interface EditableCellProps {
  initialValue: string;
}

export function EditableCell({ initialValue }: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(initialValue);
  const [showSaved, setShowSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const save = () => {
    setIsEditing(false);
    if (localTitle !== initialValue) {
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') save();
    if (e.key === 'Escape') {
      setLocalTitle(initialValue);
      setIsEditing(false);
    }
  };
  
  // Auto-focus when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  if (isEditing) {
    return (
      <div className="editable-container editing">
        <input
          ref={inputRef}
          className="editable-input"
          value={localTitle}
          onChange={e => setLocalTitle(e.target.value)}
          onBlur={save}
          onKeyDown={handleKeyDown}
          aria-label="Edit product title"
        />
      </div>
    );
  }

  return (
    <div className="editable-container">
      <span className="editable-text">{localTitle}</span>
      {showSaved && <span className="saved-indicator" role="status" aria-live="polite">✓ Saved</span>}
      <button 
        className="edit-button" 
        onClick={() => setIsEditing(true)}
        aria-label="Edit title"
        title="Edit title"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
      </button>
    </div>
  );
}
