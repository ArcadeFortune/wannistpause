const settings = {
  "currentClass": {
    viewName: ["Klasse", "Lehrer"],
    type: "text",
    value: 'I3a',
    invisible: true,
  },
  "autoSave": { // this is useless
    viewName: "Autospeichern",
    type: "checkbox",
    value: true,
    invisible: true, 
  },
  "teacherView": {
    viewName: "Lehrer Ansicht",
    type: "checkbox",
    value: 0, // this will go through a parseInt(), so using true and false is not advisable here. // does not work if default value is true
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