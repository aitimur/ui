import React from 'react'
import * as Menu from '../Menu'
import * as UncontrolledMenu from '../uncontrolled/Menu'
import Label from '../Label'
import { Title, Subtitle, Paragraph } from '../Text'
import Code from '../Code'

const options = [
  { key: 'home', label: 'Home' },
  { key: 'faq', label: 'FAQ' },
  { key: 'archive', label: 'Archive' }
]

const optionsWithComponents = [
  { key: 'home', label: <div>Home</div> },
  { key: 'faq', label: <div>To do <Label design='warning'>urgent</Label></div> }
]

class AddableMenu extends React.Component {
  constructor (props) {
    super(props)

    this.newTabs = [
      'Lorem ipsum',
      'dolor sit amet',
      'elit'
    ]

    this.state = {
      options: [{ key: 'home', label: 'Home' }],
      value: 'home'
    }

    this.add = this.add.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  add (e) {
    const newTab = this.newTabs.shift()
    if (!newTab) return

    this.setState({
      options: [
        ...this.state.options,
        { key: newTab, label: newTab }
      ]
    })
  }

  onChange (value) {
    this.setState({ ...this.state, value })
  }

  render () {
    return (
      <div>
        <Menu.Tab
          {...this.props}
          value={this.state.value}
          onChange={this.onChange}
          options={this.state.options} />
        <button onClick={this.add}>Add</button>
      </div>
    )
  }
}
export default function Menus () {
  return (
    <div>
      <Title.Secondary margins small color='blue'>Tabs</Title.Secondary>
      <Subtitle margins>Fluid</Subtitle>
      <Paragraph margins>Click "Add" and check it out</Paragraph>
      <Code>
        <AddableMenu name='addable-fluid' />
      </Code>

      <Paragraph margins>Click "Add" and check it out</Paragraph>
      <Subtitle margins>Static</Subtitle>
      <Code>
        <AddableMenu name='addable-static' tabDisplay='static' />
      </Code>

      <Subtitle margins>White</Subtitle>
      <Code>
        <div style={{background: '#0074c8', padding: '20px'}}>
          <AddableMenu white name='addable-white' tabDisplay='static' />
        </div>
      </Code>

      <Subtitle margins>Options with components</Subtitle>
      <Paragraph margins>
      Options also support components as labels.
      </Paragraph>
      <Code>
      <Menu.Tab
      onChange={(key) => console.log('You selected', key)}
      tabDisplay='static'
      name='options-with-components'
      value='home'
      options={optionsWithComponents} />
      </Code>

      <Title.Secondary margins small color='blue'>Segmented</Title.Secondary>

      <Subtitle margins>Fluid</Subtitle>
      <Paragraph margins>
        Click and check your console.
      </Paragraph>
      <Code>
        <Menu.Segmented
          onChange={(key) => console.log('You selected', key)}
          name='segmented-fluid'
          value='home'
          options={options}
        />
      </Code>

      <Subtitle margins>Static</Subtitle>
      <Paragraph margins>
        Click and check your console.
      </Paragraph>
      <Code>
        <Menu.Segmented
          onChange={(key) => console.log('You selected', key)}
          tabDisplay='static'
          name='segmented-static'
          value='home'
          options={options} />
      </Code>

      <Subtitle margins>Uncontrolled</Subtitle>
      <Code>
        <UncontrolledMenu.Segmented
          name='uncontrolled-segmented'
          value='home'
          options={options} />
      </Code>
    </div>
  )
}
