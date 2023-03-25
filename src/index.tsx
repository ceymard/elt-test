import { o, $inserted, Repeat, If, Fragment as $, $removed, setup_mutation_observer, $on, $scrollable, node_append, $click } from 'elt'
import * as immer from "immer"
immer.enableMapSet()
o.Observable.useImmer(immer)

import "elt-ui/lib/components/dialog"
import "elt-ui/lib/components/button"
import "elt-ui/lib/components/checkbox"


import * as I from "elt-fa/sharp-regular"

setup_mutation_observer(document)


import { Button, TypographicZone, builder as S, ControlBox, Input, Checkbox, Radio, Toggle, ControlLabel, Select, ControlTable, ControlRow, Responsive, ResponsiveObservable, css_control_border } from 'elt-ui'

import { rule } from 'osun'
import { o_viewport_width, o_online, o_location_hash, oMouseHovering, theme } from 'elt-ui'


rule`html, body`({
  fontFamily: `"Roboto", sans-serif !important`,
  fontWeight: 300,
  touchAction: 'manipulation'
})

rule`.fa-secondary`({
  fill: theme.tint14
})

const o_input = o('')
const o_value = o(1)
const o_check = o(true)
const o_array = o(['a', 'b', 'c'])

const o_pouet = new ResponsiveObservable(() => '<444')
  .atWidth(444, () => '>=444')

class Test {
  me = "me !"


  method(str: string) {
    return "hello - " + str + " " + this.me
  }
}
const o_test = o(new Test())
const o_test2 = o.apply(o_test, "method", [o_input])

node_append(document.body, <TypographicZone class={S.padding(16)}>
  <h1>Roadmap</h1>
  <ul>
    <li>{I.FaSquareCheck()} Respecting alignment !</li>
    <li>{I.FaSquareCheck()} Float with triangles</li>
    <li>{I.FaSquareCheck()} Color handling with lch</li>
    <li>{I.FaSquareCheck()} Sane border handling in ControlBoxes</li>
    <li>{I.FaSquareCheck()} Select simple</li>
    <li>{I.FaSquare()} Easier animations</li>
    <li>{I.FaSquare()} Date & Time Picker</li>
    <li>{I.FaSquare()} Switch</li>
    <li>{I.FaSquare()} Slider</li>
    <li>{I.FaSquare()} Data Table</li>
    <li>{I.FaSquare()} Responsive helpers ?</li>
    <li>{I.FaSquare()} Investigate grids</li>
    <li>{I.FaSquare()} Number Selector ?</li>

    <li>{I.FaSquare()} Color picker ?</li>

  </ul>


  <h1>Dialogs</h1>

  <div>
    <e-button contrast>
      Dialog
      <I.FaComment slot="end"/>
      {$click(() => {
        node_append(document.body, <e-dialog backdrop-click-close>
          <h3 slot="header">Hello.</h3>
          Contenu du dialogue...

          <e-button slot="footer" disabled>{$click(() => console.log("clicked"))}
            <I.FaXmark slot="start"/>
            Cancel
          </e-button>


          <e-button contrast slot="footer">Ok <I.FaCheck slot="end"/></e-button>
        </e-dialog>)
      })}
    </e-button>
  </div>
  <h1>
    Demo
  </h1>
  <div>
    <e-button>
      {$click(() => {
        console.log(o_array.get())
        o_array.produce(array => {
          shuffle(array)
        })
      })}

      Shuffle
      <I.FaShuffle slot="end"/>

    </e-button>
    {' '}
    <e-button>
      {$click(() => {
        o_array.set((() => {
          var res = o_array.get().slice()
          res.push('value')
          return res
        })())
      })}
      Append
      <I.FaPlus slot="end"/>
    </e-button>
    {' '}
    <e-button>{$click(e => o_array.set(o_array.get().slice(0, 3)))}
      Reset
      <I.FaRotate slot="end"/>
    </e-button>
    {' '}
    <e-button contrast>{$click(() => o_array.set([]))}
      Empty
      <I.FaEmptySet slot="end"/>
    </e-button>
  </div>
  <div>
    {Repeat(o_array, {separator: () => ', '}, (o_arr, o_i) => <$>
      <span>Element {o.tf(o_i, i => i + 1)}</span>
      <span>{o_arr}</span>
    </$>)}
  </div>
  <h3>Buttons</h3>
  <div>

    <e-button contrast>{$click(() => console.log('??'))}Ok</e-button> <e-button >Cancel</e-button> we keep the alignment <e-checkbox>{node => { node.o_checked = o_check }}Test 2</e-checkbox> <ControlBox><e-button>Ok</e-button><e-button >Cancel</e-button></ControlBox> <e-button><I.FaPowerOff slot="start"/> Hello !</e-button> With text next to them. <br/>
    This should look fine. <e-button>{I.FaPowerOff()}</e-button>

  </div>
  {If(o_check, () => <>
    <h3>
      Inputs {o_viewport_width} {o_online.tf(o => o ? 'Online' : 'Offline')} {o_location_hash}
      {' '}
      {node => {
        const o_hver = oMouseHovering(node)
        return o_hver.tf(h => h ? 'Hovering' : 'Not hovering')
      }}
      {o_pouet}
    </h3>
    <div>
      {Responsive(() => 'DEFAULT')
      .atPortrait(() => <div class={S.bold}>Mobile portrait</div>)
      .atWidth(Responsive.TABLET, () => 'TABLET')
      .atLandscape(Responsive.DESKTOP, () => 'Desktop landscape')
      .atPortrait(Responsive.DESKTOP, () => 'Desktop portrait')
      }
    </div>

    <div>Test: {o.apply(o_test, "method", [o_input])}</div>

    <div style={{lineHeight: '2em'}}>
      Similarly, inputs Placeholder <Input placeholder='Placeholder' model={o_input}/> conform to the baseline <ControlBox><Input placeholder='Search' model={o_input}>
        {$on('keydown', ev => {
          if (ev.code === 'Escape') o_input.set('')
        })}
      </Input><Button kind="contrast"><span style={{width: '1.25em', textAlign: 'center', display: 'inline-block'}}>{o_input.tf(i => i.length ? I.FaXmark() : I.FaMagnifyingGlass())}</span></Button></ControlBox>
      <br/>
      <ControlBox>
        {$inserted(n => console.log('inserted', n))}
        {$removed(n => console.log('removed', n))}

        <ControlLabel>{I.FaKey()}</ControlLabel>
        <ControlLabel>Password</ControlLabel>
        <textarea rows={4} class={[css_control_border, S.border(theme.tint14)]} type='text'/>
      </ControlBox>
    </div>
  </>)}
  <h3>Checkboxes</h3>
  <div style={{lineHeight: '2em'}}>
    Hello !{' '}
      <Button>??</Button>
      {' '}
     <Checkbox disabled model={o(true)}>Test 2</Checkbox>
     {' '}
     More text
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
      <Toggle model={o(false)}><span style={{width: '1.25em', textAlign: 'center', display: 'inline-block'}}>{I.FaBold()}</span></Toggle>
      <Toggle model={o(true)}><span style={{width: '1.25em', textAlign: 'center', display: 'inline-block'}}>{I.FaItalic()}</span></Toggle>
      <Toggle model={o(false)}><span style={{width: '1.25em', textAlign: 'center', display: 'inline-block'}}>{I.FaAlignCenter()}</span></Toggle>
    </ControlBox>
  </div>

  <h3>Selects</h3>
  <div>
    <Select style={{minWidth: '90px'}} options={[1, 2, 3]} model={o(1)} labelfn={e => e}></Select> Next to text as well.
  </div>

  <p>Hello <ControlTable style={{display: 'inline-table', width: '180px', borderCollapse: 'collapse'}}><ControlRow><td><Toggle model={o(false)}>Yeah</Toggle></td><td><Toggle model={o(false)}>!!</Toggle></td></ControlRow></ControlTable> World !</p>

  <h3>Having fun...</h3>

    <ControlTable>
      <tr><td colspan={3}><ControlLabel>Some title that spans</ControlLabel></td></tr>
      <ControlRow>
        <td><ControlLabel>{I.FaUser()}</ControlLabel></td>
        <td><ControlLabel>Username</ControlLabel></td>
        <td><Input placeholder='username' model={o('')} type='text'/></td>
      </ControlRow>
      <tr>
        <td colspan={3}>
          <Toggle model={o(false)} style={{columnSpan: 'all'}}>Doing a lot of stuff</Toggle>
        </td>
      </tr>
      <ControlRow>
        <td><ControlLabel>{I.FaKey()}</ControlLabel></td>
        <td><ControlLabel>Password</ControlLabel></td>
        <td><Input placeholder='password' model={o('')} type='text'/></td>
      </ControlRow>
    </ControlTable>

    {' '}
    <ControlTable>

          <ControlRow>
          <td><ControlLabel>{I.FaKey()}</ControlLabel></td>
            <td><ControlLabel>Utilisateur</ControlLabel></td>
            <td><Input placeholder='' model={o('')} type='text'></Input></td>
          </ControlRow>
          <ControlRow>
          <td><ControlLabel>{I.FaKey()}</ControlLabel></td>
            <td><ControlLabel>Mot de passe</ControlLabel></td>
            <td><Input placeholder='' type='text' model={o('')}></Input></td>
          </ControlRow>
        </ControlTable>

  <div style={{height: "600px", display: "flex", flexDirection: "column", justifyContent: "start"}}>
    {$scrollable}
    {/* {node => {
      const COUNT = 1000
      const lst: {a: number}[] = new Array(COUNT)
      for (let i = 0; i < COUNT; i++) {
        lst[i] = {a: i}
      }
      const v = new VirtualScroll.VirtualScroller({
        observable: o(lst),
        renderfn: item => <div class={S.padding("8px 16px").borderBottom(theme.tint07)}>item:&nbsp;{item.p("a")}</div>
      })

      return v.render()
    }} */}
  </div>

</TypographicZone>)


function shuffle<T>(array: T[]) {
  let currentIndex = array.length, randomIndex: number;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array
}
