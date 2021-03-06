function transformToken(token, children = null) {
  return Object.assign({}, token, { type: token.type.replace('_open', ''), children })
}

export default function traverse(tokens = []) {
  let openToken = null
  let children = []

  const result = []

  tokens.map((token) => {
    if (openToken) {
      if (openToken.tag  === token.tag && openToken.level === token.level && token.nesting === -1) {
        result.push(transformToken(openToken, traverse(children)))
        children = []
        openToken = null
      } else if (openToken.type === 'link_open' && token.type === 'link_close') {
        result.push(transformToken(openToken, traverse(children)))
        children = []
        openToken = null
      } else if (openToken.type === 'em_open' && token.type === 'em_close') {
        result.push(transformToken(openToken, traverse(children)))
        children = []
        openToken = null
      } else if (openToken.type === 'strong_open' && token.type === 'strong_close') {
        result.push(transformToken(openToken, traverse(children)))
        children = []
        openToken = null
      } else if (openToken.type === 's_open' && token.type === 's_close') {
        result.push(transformToken(openToken, traverse(children)))
        children = []
        openToken = null
      } else {
        children.push(token)
      }
    } else if (token.nesting === 0) {
      if (token.children && token.children.length > 0) {
        result.push(transformToken(token, traverse(token.children)))
      } else {
        result.push(transformToken(token))
      }
    }

    if (!openToken && token.nesting === 1) {
      openToken = token
    }
  })

  return result
}
