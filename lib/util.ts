export function compareBedrockVersions (a: string, b: string) {
  const sa = a.split('.')
  const sb = b.split('.')
  for (let i = 0; i < 4; i++) {
    const na = Number(sa[i])
    const nb = Number(sb[i])
    if (na > nb) return 1
    if (nb > na) return -1
  }
  return 0
}

export function getTagsFromString(s: string) {
  const parts = s.split('.')
  return {
    major: [ parts[0], parts[1], '0', '0' ].join('.'),
    minor: s,
  }
}