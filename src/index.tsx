import { append_child_and_mount, o } from 'elt'

import { Button, TypographicZone, Styling as S, ControlBox, Input, Checkbox, Radio, Toggle, ControlLabel, Select, Control } from 'elt-ui'

import { rule } from 'osun'

import FaSearch from 'elt-fa/search'
import FaPower from 'elt-fa/power-off'
import FaKey from 'elt-fa/key'
import FaCheckbox from 'elt-fa/check'
import FaClose from 'elt-fa/window-close'
import FaUser from 'elt-fa/user-alt'

import FaBold from 'elt-fa/bold'
import FaItalic from 'elt-fa/italic'
import FaCentered from 'elt-fa/align-center'
import FaChecked from 'elt-fa/check-square-light'
import FaToCheck from 'elt-fa/square-light'

rule`html, body`({
  fontFamily: `Ubuntu, sans-serif`,
  fontWeight: 300
})

const o_input = o('')
const o_value = o(1)

append_child_and_mount(document.body, <TypographicZone class={S.box.padding(16)}>
  <h1>Roadmap</h1>
  <ul>
    <li><FaChecked/> Respecting alignment !</li>
    <li><FaToCheck/> Sane border handling in ControlBoxes</li>
    <li><FaToCheck/> Select simple</li>
    <li><FaToCheck/> Select multiple</li>
    <li><FaToCheck/> Select with auto complete</li>
    <li><FaToCheck/> Date Selector</li>
    <li><FaToCheck/> Number Selector</li>
    <li><FaToCheck/> Color picker</li>
  </ul>
  <h1>Demo</h1>
  <h3>Buttons</h3>
  <div>
    <Button contrast click={() => console.log('??')}>Ok</Button> <Button>Cancel</Button> we keep the alignment <Checkbox model={o(true)}>Test</Checkbox> <ControlBox><Button>Ok</Button><Button>Cancel</Button></ControlBox> <Button> <FaPower/> Hello !</Button> With text next to them. <br/>
    This should look fine. <Button><FaPower/></Button> <Button>DO SOMETHING</Button>
  </div>
  <div style={{fontSize: '1.2em'}}>
    <Button click={() => console.log('??')}>Ok</Button> <Button>Cancel</Button> we keep the alignment <Checkbox model={o(true)}>Test</Checkbox> <ControlBox><Button><FaCheckbox/> Ok</Button><Button>Cancel</Button></ControlBox> <Button><FaPower/> Hello !</Button> With text next to them. <br/>
    This should look fine. <Button><FaPower/></Button>
  </div>
  <h3>Inputs</h3>
  <div style={{lineHeight: '2em'}}>
Similarly, inputs Placeholder <Input placeholder='Placeholder' model={o_input}/> conform to the baseline <ControlBox><Input placeholder='Search' model={o_input}/><Button contrast><span style={{width: '1.25em', textAlign: 'center', display: 'inline-block'}}>{o_input.tf(i => i.length ? <FaClose/> : <FaSearch/>)}</span></Button></ControlBox>
    <br/>
    <ControlBox>
      <ControlLabel><FaKey/></ControlLabel>
      <ControlLabel>Password</ControlLabel>
      <textarea rows={4} class={[Control.css.control, S.box.border(S.TINT14)]} type='text'/>
    </ControlBox>
  </div>
  <h3>Checkboxes</h3>
  <div style={{lineHeight: '2em'}}>
     <Checkbox model={o(true)}>Test 2</Checkbox>
     {' '}
     <ControlBox>
      <ControlLabel>Some Options</ControlLabel>
       <Radio model={o_value} value={1}>Value 1</Radio>
       <Radio model={o_value} value={2}>Value 2</Radio>
       <Radio model={o_value} value={3}>Value 3</Radio>
    </ControlBox> Next to some text.
    <br/>
    <ControlBox vertical style={{width: '120px'}}>
      <ControlLabel>Some Options</ControlLabel>
       <Radio model={o_value} value={1}>Value 1</Radio>
       <Radio model={o_value} value={2}>Value 2</Radio>
       <Radio model={o_value} value={3}>Value 3</Radio>
    </ControlBox> <ControlBox vertical style={{width: '120px'}}>
      <ControlLabel>Some Options</ControlLabel>
       <Radio model={o_value} value={1}>Value 1</Radio>
       <Radio model={o_value} value={2}>Value 2</Radio>
       <Radio model={o_value} value={3}>Value 3</Radio>
    </ControlBox> Next to some text.
  </div>
  <h3>Toggles</h3>
  <div>
    <Toggle model={o(false)}>Heydf</Toggle>
    {' '}
    As usual, it is centered
    {' '}
    <ControlBox>
      <Toggle model={o(false)}><span style={{width: '1.25em', textAlign: 'center', display: 'inline-block'}}><FaBold/></span></Toggle>
      <Toggle model={o(true)}><span style={{width: '1.25em', textAlign: 'center', display: 'inline-block'}}><FaItalic/></span></Toggle>
      <Toggle model={o(false)}><span style={{width: '1.25em', textAlign: 'center', display: 'inline-block'}}><FaCentered/></span></Toggle>
    </ControlBox>
  </div>

  <h3>Selects</h3>
  <div>
    <Select style={{minWidth: '90px'}} options={[1, 2, 3]} model={o(1)} labelfn={e => e}/> Next to text as well.
  </div>

  <h3>Having fun...</h3>

  <div style={{lineHeight: '2.5em'}}>
    <ControlBox vertical>
      <ControlBox>
        <ControlLabel><FaUser/></ControlLabel>
        <ControlLabel>Username</ControlLabel>
        <Input model={o('')} type='text'/>
      </ControlBox>
      <ControlBox>
        <ControlLabel><FaKey/></ControlLabel>
        <ControlLabel>Password</ControlLabel>
        <Input model={o('')} type='password'/>
      </ControlBox>
    </ControlBox>
  </div>

</TypographicZone>)
