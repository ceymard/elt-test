import { o, $inserted, Repeat, If, Fragment as $, $removed, setup_mutation_observer } from 'elt'

setup_mutation_observer(document)

import { Button, TypographicZone, Styling as S, ControlBox, Input, Checkbox, Radio, Toggle, ControlLabel, Select, Control, I } from 'elt-ui'

import { rule } from 'osun'

rule`html, body`({
  fontFamily: `Ubuntu, sans-serif`,
  fontWeight: 300
})

const o_input = o('')
const o_value = o(1)
const o_check = o(true)
const o_array = o(['a', 'b', 'c'])


document.body.appendChild(<TypographicZone class={S.box.padding(16)}>
  {$inserted(() => console.log('YEAR'))}
  <h1>Roadmap</h1>
  <ul>
    <li>{I('check-square')} Respecting alignment !</li>
    <li>{I('square')} Float with triangles</li>
    <li>{I('square')} Sane border handling in ControlBoxes</li>
    <li>{I('square')} Select simple</li>
    <li>{I('square')} Select multiple</li>
    <li>{I('square')} Select with auto complete</li>
    <li>{I('square')} Date Selector</li>
    <li>{I('square')} Number Selector</li>
    <li>{I('square')} Color picker</li>
  </ul>
  <h1>
    Demo
  </h1>
  <div>
    {Repeat(o_array, o_arr => <$><span>{o_arr}</span> <span>{o_arr}2</span></$>, () => ',')}
  </div>
  <h3>Buttons</h3>
  <div>
    <Button contrast click={() => console.log('??')}>Ok</Button> <Button click={e => o_array.set((() => {
      var res = o_array.get().slice()
      res.push('value')
      return res
    })())}>Cancel</Button> we keep the alignment <Checkbox model={o_check}>Test</Checkbox> <ControlBox><Button>Ok</Button><Button click={e => o_array.set(o_array.get().slice(0, 3))}>Cancel</Button></ControlBox> <Button> {I('power-off')} Hello !</Button> With text next to them. <br/>
    This should look fine. <Button>{I('power-off')}</Button> <Button>DO SOMETHING</Button>
  </div>
  {If(o_check, () => <$>
    <h3>
      Inputs
    </h3>
    <div style={{lineHeight: '2em'}}>
      Similarly, inputs Placeholder <Input placeholder='Placeholder' model={o_input}/> conform to the baseline <ControlBox><Input placeholder='Search' model={o_input}/><Button contrast><span style={{width: '1.25em', textAlign: 'center', display: 'inline-block'}}>{o_input.tf(i => i.length ? I('window-close') : I('search'))}</span></Button></ControlBox>
      <br/>
      <ControlBox>
        {$inserted(n => console.log('inserted', n))}
        {$removed(n => console.log('removed', n))}

        <ControlLabel>{I('key')}</ControlLabel>
        <ControlLabel>Password</ControlLabel>
        <textarea rows={4} class={[Control.css.control, S.box.border(S.TINT14)]} type='text'/>
      </ControlBox>
    </div>
  </$>)}
  <h3>Checkboxes</h3>
  <div style={{lineHeight: '2em'}}>
     <Checkbox disabled model={o(true)}>Test 2</Checkbox>
     {' '}
     <ControlBox>
      <ControlLabel>Some Options</ControlLabel>
       <Radio model={o_value} value={1}>Value 1</Radio>
       <Radio model={o_value} value={2}>Value 2</Radio>
       <Radio disabled model={o_value} value={3}>Value 3</Radio>
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
      <Toggle model={o(false)}><span style={{width: '1.25em', textAlign: 'center', display: 'inline-block'}}>{I('bold')}</span></Toggle>
      <Toggle model={o(true)}><span style={{width: '1.25em', textAlign: 'center', display: 'inline-block'}}>{I('italic')}</span></Toggle>
      <Toggle model={o(false)}><span style={{width: '1.25em', textAlign: 'center', display: 'inline-block'}}>{I('align-center')}</span></Toggle>
    </ControlBox>
  </div>

  <h3>Selects</h3>
  <div>
    <Select style={{minWidth: '90px'}} options={[1, 2, 3]} model={o(1)} labelfn={e => e}></Select> Next to text as well.
  </div>

  <h3>Having fun...</h3>

  <div style={{lineHeight: '2.5em'}}>
    <ControlBox vertical>
      <ControlBox>
        <ControlLabel>{I('user')}</ControlLabel>
        <ControlLabel>Username</ControlLabel>
        <Input model={o('')} type='text'/>
      </ControlBox>
      <ControlBox>
        <ControlLabel>{I('key')}</ControlLabel>
        <ControlLabel>Password</ControlLabel>
        <Input model={o('')} type='password'/>
      </ControlBox>
    </ControlBox>
  </div>

</TypographicZone>)
