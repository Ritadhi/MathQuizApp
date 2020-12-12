import { Component } from '@angular/core';
import {MathContent} from './math/math-content';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sample';

  

  mathLatex: MathContent = {
    latex: 'When $a \\ne 0$, there are two solutions to $\\frac{5}{9}$'
  };

  mathMl: MathContent = {
    mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mrow>
    <mover>
      <munder>
        <mo>∫</mo>
        <mn>0</mn>
      </munder>
      <mi>∞</mi>
    </mover>
    <mtext> versus </mtext>
    <munderover>
      <mo>∫</mo>
      <mn>0</mn>
      <mi>∞</mi>
    </munderover>
  </mrow>
</math>`
  };
}
