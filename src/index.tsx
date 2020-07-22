import { o, $inserted, Repeat, If, Fragment as $, $removed, setup_mutation_observer, $on, $scrollable, node_append, $click, EltCustomElement, register, Attrs, NRO, prop_observable, attr } from 'elt'

import { $model, ColorTheme, show } from "elt-shoelace"

const theme = ColorTheme.fromColors("#ffffff", "#1c1c1d", "#0284c7", {

})

import "elt-shoelace/lib/components/input"
import "elt-shoelace/lib/components/button"
import "elt-shoelace/lib/components/checkbox"
import "elt-shoelace/lib/components/dialog"


import * as immer from "immer"
immer.enableMapSet()
o.Observable.useImmer(immer)

import * as I from "elt-fa/sharp-regular"

setup_mutation_observer(document)


import { rule } from 'osun'


rule`html, body`({
  fontFamily: `"Roboto", sans-serif !important`,
  fontWeight: 300,
  touchAction: 'manipulation'
})

rule`.fa-secondary`({
  // fill: theme.tint14
})

const o_input = o("")
const o_check = o(true)
const o_array = o(['a', 'b', 'c'])

class Test {
  me = "me !"

  method(str: string) {
    return "hello - " + str + " " + this.me
  }
}
const o_test = o(new Test())

declare module "elt" {
  interface ElementMap {
    "elt-test": EltAttrs
  }
}

interface EltAttrs extends Attrs<EltTest> {
  test?: NRO<string>
  testing?: NRO<string>
  complex?: {toto: string}
  o_external?: o.Observable<string>
}

@register("elt-test")
export class EltTest extends EltCustomElement {

  o_external = o("")

  @attr()
  testing: string = ""


  @prop_observable("o_external")
  external: string = "init"

  complex: {toto: string} = {toto: "initial"}

  shadow(): Node | null {
    console.log(this.complex)
    return <div>
      {this.o_external}
      Yo yo yo, attr: { this.testing }
      <sl-button>
        {$click(() => { this.external = "new value" })}
        Set it
      </sl-button>
    </div>
  }
}

document.body.classList.add(theme.className)

node_append(document.body, <e-flex column pad gap>
  <h1>Dialogs</h1>

  <div>
    <elt-test test="pouet" testing="zboubi" o_external={o_input}/>
    ÇA NE MARCHE PAS À REGARDER DEMAIN

    <elt-test test="youyou" complex={{toto: "zbouboiii"}}>
      {node => {
        node.o_external = o_input
      }}
    </elt-test>

    <sl-button variant="primary">
      Dialog
      <I.FaComment slot="end"/>
      {$click(() => {
        show(fut => <sl-dialog>
          <h3 slot="header">Hello.</h3>
          Contenu du dialogue...

          <sl-button slot="footer" disabled>{$click(() => console.log("clicked"))}
            <I.FaXmark slot="start"/>
            Cancel
          </sl-button>


          <sl-button variant="primary" slot="footer">Ok <I.FaCheck slot="end"/></sl-button>
        </sl-dialog>)
      })}
    </sl-button>
  </div>
  <h1>
    Demo
  </h1>
  <div>
    <sl-button>
      {$click(() => {
        console.log(o_array.get())
        o_array.produce(array => {
          shuffle(array)
        })
      })}

      Shuffle
      <I.FaShuffle slot="end"/>

    </sl-button>
    {' '}
    <sl-button>
      {$click(() => {
        o_array.set((() => {
          var res = o_array.get().slice()
          res.push('value')
          return res
        })())
      })}
      Append
      <I.FaPlus slot="end"/>
    </sl-button>
    {' '}
    <sl-button>{$click(e => o_array.set(o_array.get().slice(0, 3)))}
      Reset
      <I.FaRotate slot="end"/>
    </sl-button>
    {' '}
    <sl-button variant="primary">{$click(() => o_array.set([]))}
      Empty
      <I.FaEmptySet slot="end"/>
    </sl-button>
  </div>
  <div>
    {Repeat(o_array, {separator: () => ', '}, (o_arr, o_i) => <$>
      <span>Element {o.tf(o_i, i => i + 1)}</span>
      <span>{o_arr}</span>
    </$>)}
  </div>
  <h3>Buttons</h3>
  <div>

    <sl-button variant="primary">{$click(() => console.log('??'))}Ok</sl-button> <sl-button >Cancel</sl-button> we keep the alignment <sl-checkbox>{$model(o_check)}Test 2</sl-checkbox> <sl-button>Ok</sl-button><sl-button >Cancel</sl-button> <sl-button><I.FaPowerOff slot="start"/> Hello !</sl-button> With text next to them. <br/>
    This should look fine. <sl-button>{I.FaPowerOff()}</sl-button>

  </div>
  {If(o_check, () => <>
    {/* <h3>
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
    </div> */}

    <div>Test: {o.apply(o_test, "method", [o_input])}</div>
  </>)}

</e-flex>)


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
