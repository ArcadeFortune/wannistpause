const settings = {
  "currentClass": {
    viewName: ["Klasse", "Lehrer"],
    type: "text",
    value: 'I3a',
    invisible: true,
  },
  "autoSave": {
    viewName: "Autospeichern",
    type: "checkbox",
    value: true,
    invisible: true, // this is useless
  },
  "teacherView": {
    viewName: "Lehrer Ansicht",
    type: "checkbox",
    value: false,
  },
  "contextMenu": {
    viewName: "Spezieller Rechts-Click-Menü",
    type: "checkbox",
    value: true,
  },
  "YTURL": {
    viewName: "YouTube Playlist",
    type: "text",
    placeholder: "www.youtube.com/...",
    value: undefined,
  },
};


export default settings;