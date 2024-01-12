import A from "./A";

export default function AboutMe() {
  return (
    <>
        <span className="title">Über diese Website</span> <br/>
        <div className="text">
          Ich bin ein {new Date().getFullYear() - 2005}-jähriger der einst zu der KSH ging, in der IMS. (Jahrgang 21)<br/>
          Wie du, hatte ich immer Probleme gehabt, die Zeit zur nächsten Pause auszurechnen, sowie die nächste Stunde zu ermitteln. <br/>
          Also habe ich diese Webseite erstellt, um mir und dir das Leben zu erleichtern. <br/> <br/>
          Die Stundenplan-daten werden vom <A href="https://intranet.tam.ch/ksh/public/timetable/daily-class-schedule" className="link">Intranet</A> geholt. <br/> <br/>
          Wenn du ein Bug findest / mit programmieren willst, schau dir meinen <A href="https://github.com/arcadefortune/wannistpause" className="link">GitHub</A> an.<br/> <br/>
          Ich habe ausserdem ein wunderschönes Rechtsclick-Menu gebaut :)
        </div></>
  )
}
