import { useEffect, useMemo, useState } from "react";
import {
  BookHeart, CalendarDays, Heart, Plus, Search,
  PenLine, ChevronLeft, ChevronRight, ArrowRight,
  Menu, X, Feather, Mail, Bookmark, Home,
  Camera, Sparkles, Flower2, Settings2
} from "lucide-react";
import DiaryEditor, { moods } from "./components/DiaryEditor";
import { Bow, Flower, DiaryIllustration } from "./illustrations/Decorations";
import "./App.css";

const STORAGE_KEY = "deardiary_entries_v1";

function loadEntries() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function prettyDate(value) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function DecorativeHeart({ size = 32, className = "" }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 42C17 35 4 27 4 16C4 7 15 4 24 14C33 4 44 7 44 16C44 27 31 35 24 42Z" fill="#F5B9D7" stroke="#2B2028" strokeWidth="2.5"/>
      <path d="M12 15C13 12 16 11 19 13" stroke="#FFF7FB" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}

function StarStamp({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path d="M50 6L61 37L94 39L68 59L76 91L50 72L24 91L32 59L6 39L39 37Z" fill="#F7C8DE" stroke="#34252E" strokeWidth="2"/>
      <circle cx="50" cy="51" r="14" fill="#FFF8FB" stroke="#34252E" strokeWidth="1.5"/>
      <path d="M43 52Q50 59 57 52" stroke="#34252E" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="44" cy="47" r="1.5" fill="#34252E"/>
      <circle cx="56" cy="47" r="1.5" fill="#34252E"/>
    </svg>
  );
}

function EntryCard({ entry, onClick, index }) {
  const mood = moods.find((item) => item.id === entry.mood) || moods[0];

  return (
    <button className={`newspaper-entry entry-style-${index % 3}`} onClick={onClick}>
      <span className="entry-index">FILE NO. {String(index + 1).padStart(3, "0")}</span>
      <div className="entry-rule"/>
      <div className="entry-meta">
        <span>{prettyDate(entry.date)}</span>
        <span>PERSONAL ARCHIVE</span>
      </div>
      <span className="entry-decor">{entry.sticker || "♡"}</span>
      <h3>{entry.title}</h3>
      <p>{entry.content || "A little memory tucked away..."}</p>
      <div className="entry-rule"/>
      <div className="entry-bottom">
        <span className="entry-mood" style={{ background: mood.color }}>{mood.face} {mood.label}</span>
        <span className="entry-read">READ MORE <ArrowRight size={14}/></span>
      </div>
    </button>
  );
}

function CalendarView({ entries, onSelect, month, setMonth }) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const today = new Date();
  const todayKey = dateKey(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <div className="editorial-calendar">
      <div className="calendar-top">
        <div>
          <span className="micro-label">THE MEMORY ARCHIVES • ISSUE 002</span>
          <h2>Days to <em>remember.</em></h2>
        </div>
        <div className="calendar-controls">
          <button onClick={() => setMonth(new Date(year, monthIndex - 1, 1))} aria-label="Previous month"><ChevronLeft size={19}/></button>
          <strong>{month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</strong>
          <button onClick={() => setMonth(new Date(year, monthIndex + 1, 1))} aria-label="Next month"><ChevronRight size={19}/></button>
        </div>
      </div>
      <div className="calendar-grid">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => <div className="calendar-weekday" key={day}>{day}</div>)}
        {Array.from({ length: 42 }, (_, index) => {
          const day = index - firstDay + 1;
          const valid = day > 0 && day <= daysInMonth;
          const key = valid ? dateKey(year, monthIndex, day) : "";
          const matching = entries.filter((entry) => entry.date === key);
          return (
            <button
              key={index}
              className={`calendar-cell ${key === todayKey ? "today" : ""} ${matching.length ? "has-memory" : ""}`}
              disabled={!valid}
              onClick={() => matching.length && onSelect(matching[0])}
            >
              {valid && <><span>{day}</span>{matching.length > 0 && <span className="memory-heart">{matching.length > 1 ? matching.length : "♥"}</span>}</>}
            </button>
          );
        })}
      </div>
      <p className="calendar-caption">♥ MARKS A DAY WITH A MEMORY — CLICK TO OPEN ITS FIRST ENTRY</p>
    </div>
  );
}

export default function App() {
  const [entries, setEntries] = useState(loadEntries);
  const [view, setView] = useState("home");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [month, setMonth] = useState(() => new Date());
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const sorted = useMemo(() =>
    [...entries].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt),
    [entries]
  );

  const filtered = useMemo(() =>
    sorted.filter((entry) =>
      `${entry.title} ${entry.content} ${entry.date} ${entry.mood}`.toLowerCase().includes(search.toLowerCase())
    ),
    [sorted, search]
  );

  function openEditor(entry = null) {
    setEditing(entry);
    setEditorOpen(true);
  }

  function saveEntry(entry) {
    setEntries((current) =>
      current.some((item) => item.id === entry.id)
        ? current.map((item) => item.id === entry.id ? entry : item)
        : [...current, entry]
    );
    setEditorOpen(false);
    setEditing(null);
  }

  function deleteEntry(id) {
    if (!window.confirm("Delete this diary entry?")) return;
    setEntries((current) => current.filter((entry) => entry.id !== id));
    setEditorOpen(false);
    setEditing(null);
  }

  function navigate(destination) {
    setView(destination);
    setSearch("");
    setMobileMenu(false);
  }

  const navigation = [
    { id: "home", label: "home", icon: Home },
    { id: "entries", label: "entries", icon: BookHeart },
    { id: "calendar", label: "calendar", icon: CalendarDays },
    { id: "moods", label: "moods", icon: Heart }
  ];

  return (
    <div className="diary-world">
      <div className="background-stamp stamp-one">♡</div>
      <div className="background-stamp stamp-two">✧</div>

      <div className="site-wrap">
        <header className="site-header">
          <div className="header-left">
            <span className="header-edition">THE PERSONAL EDITION</span>
            <span className="header-volume">VOL. 001 — EST. 2026</span>
          </div>
          <div className="header-title">
            <Bow size={57}/>
            <h1>The Diary Mail<span>♡</span></h1>
            <p>A LITTLE NEWSPAPER OF MY LIFE</p>
          </div>
          <div className="header-right">
            <span>{new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            <span>MADE WITH LOVE & LITTLE MEMORIES</span>
          </div>
        </header>

        <div className="masthead-rule"><span>✦</span><span>ALL THE STORIES WORTH KEEPING</span><span>✦</span></div>

        <div className="toolbar">
          <div className="toolbar-left">
            <span className="toolbar-label">PERSONAL JOURNAL</span>
            <span className="toolbar-separator"/>
            <span className="toolbar-label">PRIVATE COLLECTION</span>
          </div>
          <div className="toolbar-icons">
            <button onClick={() => navigate("home")} aria-label="Home"><Home size={20}/></button>
            <button onClick={() => navigate("entries")} aria-label="Diary entries"><BookHeart size={20}/></button>
            <button onClick={() => navigate("calendar")} aria-label="Calendar"><CalendarDays size={20}/></button>
            <button onClick={() => navigate("moods")} aria-label="Moods"><Heart size={20}/></button>
            <button onClick={() => openEditor()} aria-label="Write entry"><PenLine size={20}/></button>
          </div>
        </div>

        <main className="site-main">
          {view === "home" && (
            <>
              <section className="front-page">
                <div className="front-copy">
                  <span className="section-kicker">✦ THE FRONT PAGE ✦</span>
                  <h2>Dear diary,<br/><em>it's me again.</em></h2>
                  <div className="ornament-line"><span>♡</span></div>
                  <p>Welcome to your own little corner of the world. A place to collect the days, the feelings, and the memories that make your story yours.</p>
                  <button className="editorial-button" onClick={() => openEditor()}><Feather size={17}/> WRITE TODAY'S STORY <ArrowRight size={16}/></button>
                  <div className="front-footnote">A COLLECTION OF THOUGHTS • ISSUE NO. 001</div>
                </div>
                <div className="front-art">
                  <div className="art-photo-frame">
                    <div className="art-photo-inner"><DiaryIllustration/></div>
                    <span>THE LITTLE THINGS ♡</span>
                  </div>
                  <div className="art-stamp"><StarStamp/></div>
                  <div className="art-bow"><Bow size={75}/></div>
                </div>
              </section>

              <div className="newspaper-divider"><span>✧</span><span>THE LATEST EDITION</span><span>✧</span></div>

              <section className="highlights">
                <div className="highlight-main">
                  <div className="section-title-row">
                    <div><span className="micro-label">PERSONAL ARCHIVE / SECTION 01</span><h2>Latest <em>headlines.</em></h2></div>
                    <button className="link-button" onClick={() => navigate("entries")}>VIEW ALL <ArrowRight size={15}/></button>
                  </div>
                  {sorted.length ? (
                    <div className="entries-grid">{sorted.slice(0, 3).map((entry, index) => <EntryCard key={entry.id} entry={entry} index={index} onClick={() => openEditor(entry)}/>)}</div>
                  ) : (
                    <div className="empty-editorial">
                      <Flower size={76}/>
                      <h3>Extra! Extra! A story is waiting...</h3>
                      <p>There are no stories in this edition yet. Write your first diary entry to begin your personal newspaper.</p>
                      <button className="editorial-button" onClick={() => openEditor()}><Plus size={17}/> WRITE THE FIRST PAGE</button>
                    </div>
                  )}
                </div>

                <aside className="highlight-side">
                  <span className="micro-label">THE LITTLE DETAILS</span>
                  <h3>Life, lately <span>♡</span></h3>
                  <div className="side-stat"><strong>{entries.length}</strong><span>STORIES PUBLISHED</span></div>
                  <div className="side-stat"><strong>{new Set(entries.map((entry) => entry.date)).size}</strong><span>DAYS REMEMBERED</span></div>
                  <div className="side-stat"><strong>{entries.filter((entry) => ["happy", "loved"].includes(entry.mood)).length}</strong><span>SWEET MOMENTS</span></div>
                  <div className="side-note">
                    <Flower size={57}/>
                    <p>“The smallest moments often become the sweetest memories.”</p>
                  </div>
                </aside>
              </section>
            </>
          )}

          {view === "entries" && (
            <section className="inner-page">
              <div className="inner-page-header">
                <span className="section-kicker">THE PERSONAL ARCHIVES • SECTION 02</span>
                <h2>Stories from <em>the heart.</em></h2>
                <p>Every memory deserves a headline of its own.</p>
                <div className="inner-page-actions">
                  <label className="search-field"><Search size={18}/><input placeholder="Search the archives..." value={search} onChange={(event) => setSearch(event.target.value)}/></label>
                  <button className="editorial-button" onClick={() => openEditor()}><Plus size={16}/> NEW ENTRY</button>
                </div>
              </div>
              {filtered.length ? (
                <div className="entries-grid all-entries">{filtered.map((entry, index) => <EntryCard key={entry.id} entry={entry} index={index} onClick={() => openEditor(entry)}/>)}</div>
              ) : (
                <div className="empty-editorial"><Flower size={70}/><h3>{entries.length ? "No matching headlines" : "The archives are waiting"}</h3><p>{entries.length ? "Try a different search." : "Your first story is just a page away."}</p><button className="editorial-button" onClick={() => openEditor()}><Plus size={16}/> WRITE AN ENTRY</button></div>
              )}
            </section>
          )}

          {view === "calendar" && (
            <section className="inner-page">
              <CalendarView entries={entries} onSelect={openEditor} month={month} setMonth={setMonth}/>
            </section>
          )}

          {view === "moods" && (
            <section className="inner-page">
              <div className="inner-page-header">
                <span className="section-kicker">THE FEELINGS COLUMN • SECTION 03</span>
                <h2>The mood <em>chronicles.</em></h2>
                <p>A little record of every feeling, big and small.</p>
              </div>
              <div className="mood-grid">
                {moods.map((mood) => {
                  const count = entries.filter((entry) => entry.mood === mood.id).length;
                  return (
                    <div className="mood-feature" key={mood.id}>
                      <div className="mood-feature-icon" style={{ background: mood.color }}>{mood.face}</div>
                      <span className="micro-label">{mood.label.toUpperCase()} EDITION</span>
                      <strong>{count}</strong>
                      <span>{count === 1 ? "MEMORY" : "MEMORIES"}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mood-editorial-note"><DecorativeHeart size={53}/><div><h3>Every feeling tells a story.</h3><p>As you write diary entries, your feelings will become part of this little collection.</p></div></div>
            </section>
          )}
        </main>

        <footer className="site-footer">
          <span>THE DIARY MAIL © 2026</span>
          <span>KEEPING THE LITTLE MOMENTS FOREVER ♡</span>
          <span>END OF EDITION</span>
        </footer>
      </div>

      <nav className={`bottom-nav ${mobileMenu ? "nav-expanded" : ""}`} aria-label="Main navigation">
        {navigation.map(({ id, label, icon: Icon }) => (
          <button key={id} className={view === id ? "selected" : ""} onClick={() => navigate(id)}><Icon size={18}/><span>{label}</span></button>
        ))}
        <button className="nav-write" onClick={() => openEditor()}><Plus size={19}/><span>write</span></button>
      </nav>

      {editorOpen && (
        <DiaryEditor key={editing?.id || "new"} entry={editing} onSave={saveEntry} onClose={() => setEditorOpen(false)} onDelete={deleteEntry}/>
      )}
    </div>
  );
}
