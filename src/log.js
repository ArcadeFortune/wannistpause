export default function log(...info) {
  const isLogEnabled = false
  // const isLogEnabled = true
  if (isLogEnabled) console.log(...info)
}