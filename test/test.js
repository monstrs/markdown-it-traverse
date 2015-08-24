import { expect } from 'chai'
import md from 'markdown-it'
import fs from 'fs'
import mdTraverse from './../lib'

describe('markdown-it-traverse', () => {
  it('heading tokens', () => {
    const content = fs.readFileSync(`${__dirname}/fixtures/heading.md`, 'utf-8')
    const result = mdTraverse(md().parse(content))

    expect(result[0]).to.have.deep.property('type', 'heading')
    expect(result[0]).to.have.deep.property('children[0].type', 'inline')
    expect(result[0]).to.have.deep.property('children[0].children[0].type', 'text')
    expect(result[0]).to.have.deep.property('children[0].children[0].content', 'Heading')
  })

  it('inline tokens', () => {
    const content = fs.readFileSync(`${__dirname}/fixtures/inline.md`, 'utf-8')
    const result = mdTraverse(md().parse(content))

    expect(result[0]).to.have.deep.property('children[0].type', 'inline')

    expect(result[0]).to.have.deep.property('children[0].children[1].type', 'strong')
    expect(result[0]).to.have.deep.property('children[0].children[1].children[0].content', 'strong')

    expect(result[0]).to.have.deep.property('children[0].children[3].type', 'em')
    expect(result[0]).to.have.deep.property('children[0].children[3].children[0].content', 'italic')

    expect(result[0]).to.have.deep.property('children[0].children[5].type', 'code_inline')
    expect(result[0]).to.have.deep.property('children[0].children[5].content', 'code')

    expect(result[0]).to.have.deep.property('children[0].children[7].type', 'link')
    expect(result[0]).to.have.deep.property('children[0].children[7].children[0].content', 'link')
  })
})
