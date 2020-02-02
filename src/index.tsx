import { append_child_and_mount, o } from 'elt'

import { Button, TypographicZone, Styling as S, ControlBox, Input, Checkbox, Radio, Toggle, ControlLabel } from 'elt-ui'

import { rule } from 'osun'

import FaSearch from 'elt-fa/search'
import FaPower from 'elt-fa/power-off'
import FaKey from 'elt-fa/key'

import FaBold from 'elt-fa/bold'
import FaItalic from 'elt-fa/italic'
import FaCentered from 'elt-fa/align-center'

rule`html, body`({
  fontFamily: `Ubuntu, sans-serif`
})

const o_input = o('')
const o_value = o(1)

append_child_and_mount(document.body, <TypographicZone class={S.box.padding(16)}>
  <h1>Demo</h1>
  <p>Hello world</p>
  <h3>Buttons</h3>
  <div>
    <Button click={() => console.log('??')}> Ok</Button> <Button>Cancel</Button> we keep the alignment <Checkbox model={o(true)}>Test</Checkbox> <ControlBox><Button>Ok</Button><Button>Cancel</Button></ControlBox> <Button> <FaPower/> Hello !</Button> With text next to them. <br/>
    This should look fine. <Button><FaPower/></Button>
  </div>
  <div style={{fontSize: '1.2em'}}>
    <Button click={() => console.log('??')}> Ok</Button> <Button>Cancel</Button> we keep the alignment <Checkbox model={o(true)}>Test</Checkbox> <ControlBox><Button>Ok</Button><Button>Cancel</Button></ControlBox> <Button> <FaPower/> Hello !</Button> With text next to them. <br/>
    This should look fine. <Button><FaPower/></Button>
  </div>
  <h3>Inputs</h3>
  <div>
    Similarly, inputs <Input placeholder='Placelholder' model={o_input}/> conform to the baseline <ControlBox><Input placeholder='Search' model={o_input}/><Button><FaSearch/></Button></ControlBox>
    <br/>
    Ajjjh <ControlBox>
      <ControlLabel><FaKey/></ControlLabel>
      <ControlLabel>Password</ControlLabel>
      <Input model={o('')} type='text'/>
    </ControlBox>
  </div>
  <h3>Checkboxes</h3>
  <div>
     <Checkbox model={o(true)}>Test 2</Checkbox>
     {' '}
     <ControlBox>
       <Radio model={o_value} value={1}>Value 1</Radio>
       <Radio model={o_value} value={2}>Value 2</Radio>
       <Radio model={o_value} value={3}>Value 3</Radio>
    </ControlBox> Next to some text.
  </div>
  <h3>Toggles</h3>
  <div>
    <Toggle model={o(false)}>Heya</Toggle>
    {' '}
    As usual, it is centered
    {' '}
    <ControlBox>
      <Toggle model={o(false)}><FaBold/></Toggle>
      <Toggle model={o(true)}><FaItalic/></Toggle>
      <Toggle model={o(false)}><FaCentered/></Toggle>
    </ControlBox>
  </div>

</TypographicZone>)
