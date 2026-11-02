import { useState } from "react";
import { X, Save, Heart, Trash2 } from "lucide-react";
import { Bow } from "../illustrations/Decorations";

export const moods = [
  { id: "happy", face: "♡", label: "Happy", color: "#F5B9D7" },
  { id: "calm", face: "☁", label: "Calm", color: "#B6D9FA" },
  { id: "loved", face: "♥", label: "Loved", color: "#EBA1C6" },
  { id: "tired", face: "☾", label: "Tired", color: "#C9B6F1" },
  { id: "sad", face: "☂", label: "Sad", color: "#B7C7E9" },
];

export const stickers = ["♡", "✿", "✧", "☾", "୨୧", "☁"];

export default function DiaryEditor({ entry, onSave, onClose, onDelete }) {
  const [title, setTitle] = useState(entry?.title || "");
  const [content, setContent] = useState(entry?.content || "");
  const [mood, setMood] = useState(entry?.mood || "happy");
  const [sticker, setSticker] = useState(entry?.sticker || "♡");
  const [date, setDate] = useState(entry?.date || new Date().toLocaleDateString("en-CA"));

  function save(event) {
    event.preventDefault();
    if (!title.trim() && !content.trim()) return;
    onSave({
      id: entry?.id || crypto.randomUUID(),
      title: title.trim() || "Untitled thoughts",
      content: content.trim(),
      mood,
      sticker,
      date,
      createdAt: entry?.createdAt || Date.now(),
    });
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="editor-modal" role="dialog" aria-modal="true" aria-label="Diary entry editor">
        <button className="close-button" onClick={onClose} aria-label="Close"><X size={20}/></button>
        <Bow size={67} className="editor-bow"/>
        <div className="eyebrow">A PAGE JUST FOR YOU</div>
        <h2>{entry ? "Edit your memories" : "Dear diary..."}</h2>
        <p className="editor-subtitle">let your thoughts bloom on these pages ♡</p>

        <form onSubmit={save} className="editor-form">
          <div className="editor-top-fields">
            <label>
              Entry title
              <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Today felt like..." maxLength={80}/>
            </label>
            <label>
              Date
              <input type="date" value={date} onChange={(event) => setDate(event.target.value)} required/>
            </label>
          </div>

          <div className="editor-label">How are you feeling?</div>
          <div className="mood-picker">
            {moods.map((item) => (
              <button type="button" key={item.id} className={`mood-choice ${mood === item.id ? "selected" : ""}`} onClick={() => setMood(item.id)}>
                <span style={{ background: item.color }}>{item.face}</span>
                <small>{item.label}</small>
              </button>
            ))}
          </div>

          <label>
            Your thoughts
            <textarea rows={8} value={content} onChange={(event) => setContent(event.target.value)} placeholder="Dear diary, today I want to remember..." />
          </label>

          <div className="editor-label">Add a little sticker</div>
          <div className="sticker-picker">
            {stickers.map((item) => (
              <button type="button" key={item} className={sticker === item ? "selected" : ""} onClick={() => setSticker(item)}>{item}</button>
            ))}
          </div>

          <div className="editor-actions">
            {entry && <button type="button" className="delete-button" onClick={() => onDelete(entry.id)}><Trash2 size={16}/> Delete</button>}
            <button type="submit" className="primary-button"><Save size={17}/> Save my memory <Heart size={15}/></button>
          </div>
        </form>
      </section>
    </div>
  );
}
