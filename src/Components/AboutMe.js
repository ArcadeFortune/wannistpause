export default function AboutMe() {
  return (
    <div className="about-me">
      <div className="about-me-content">
        <br/>
        <span className="information">Über diese Website</span> <br/>
        <div className="text">
          Ich bin ein {new Date().getFullYear() - 2005} jähriger der einst zu der KSH geht, in der IMS.<br/>
          Wie du, habe ich immer Probleme gehabt, die Zeit zur nächsten Pause auszurechnen, sowie die nächste Stunde zu ermitteln. <br/>
          Also habe ich diese Website erstellt, um mir und dir das Leben zu erleichtern.
        </div>
      </div>
    </div>
  )
}