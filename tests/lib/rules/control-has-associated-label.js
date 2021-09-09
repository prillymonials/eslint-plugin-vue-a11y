
// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var rule = require('../../../lib/rules/control-has-associated-label');
var RuleTester = require('eslint').RuleTester;
var configs = require('../../../lib/configs/base');

const errorMessage = 'A control must be associated with a text label.';
var tester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
});

const ruleOptions = (configs.rules['vue-a11y/control-has-associated-label'][1] || {});
tester.run('control-has-associated-label', rule, {
  valid: [
    // Custom Control Components
    {
      filename: 'test.vue',
      code: '<template><custom-control><span><span>Save</span></span></custom-control></template>',
      options: [{
        depth: 3,
        controlComponents: ['custom-control'],
      }],
    },
    {
      filename: 'test.vue',
      code: '<template><custom-control><span><span label="Save"></span></span></custom-control></template>',
      options: [{
        depth: 3,
        controlComponents: ['custom-control'],
        labelAttributes: ['label'],
      }],
    },
    // Interactive Elements
    {
      filename: 'test.vue',
      code: '<template><button>Save</button></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><button><span>Save</span></button></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><button><span><span>Save</span></span></button></template>',
      options: [{ depth: 3 }],
    },
    {
      filename: 'test.vue',
      code: '<template><button><span><span><span><span><span><span><span><span>Save</span></span></span></span></span></span></span></span></button></template>',
      options: [{ depth: 9 }],
    },
    {
      filename: 'test.vue',
      code: '<template><button><img alt="Save" /></button></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><button aria-label="Save" /></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><button><span aria-label="Save" /></button></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><button aria-labelledby="js_1" /></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><button><span aria-labelledby="js_1" /></button></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><button>{{sureWhyNot}}</button></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><button><span><span label="Save"></span></span></button></template>',
      options: [{ depth: 3, labelAttributes: ['label'] }],
    },
    {
      filename: 'test.vue',
      code: '<template><a href="#">Save</a></template>',
    },
    // Skipped because Vue cannot read the "Save" children
    // {
    //   filename: 'test.vue',
    //   code: '<template><area href="#">Save</area></template>',
    // },
    {
      filename: 'test.vue',
      code: '<template><link>Save</link></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><menuitem>Save</menuitem></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><option>Save</option></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><th>Save</th></template>',
    },
    // Interactive Roles
    {
      code: '<template><div role="button">Save</div></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="checkbox">Save</div></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="columnheader">Save</div></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="combobox">Save</div></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="gridcell">Save</div></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="link">Save</div></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="menuitem">Save</div></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="menuitemcheckbox">Save</div></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="menuitemradio">Save</div></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="option">Save</div></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="progressbar">Save</div></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="radio">Save</div></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="rowheader">Save</div></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="searchbox">Save</div></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="slider">Save</div></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="spinbutton">Save</div></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="switch">Save</div></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="tab">Save</div></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="textbox">Save</div></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="treeitem">Save</div></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="button" aria-label="Save" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="checkbox" aria-label="Save" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="columnheader" aria-label="Save" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="combobox" aria-label="Save" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="gridcell" aria-label="Save" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="link" aria-label="Save" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="menuitem" aria-label="Save" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="menuitemcheckbox" aria-label="Save" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="menuitemradio" aria-label="Save" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="option" aria-label="Save" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="progressbar" aria-label="Save" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="radio" aria-label="Save" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="rowheader" aria-label="Save" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="searchbox" aria-label="Save" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="slider" aria-label="Save" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="spinbutton" aria-label="Save" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="switch" aria-label="Save" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="tab" aria-label="Save" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="textbox" aria-label="Save" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="treeitem" aria-label="Save" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="button" aria-labelledby="js_1" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="checkbox" aria-labelledby="js_1" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="columnheader" aria-labelledby="js_1" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="combobox" aria-labelledby="js_1" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="gridcell" aria-labelledby="Save" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="link" aria-labelledby="js_1" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="menuitem" aria-labelledby="js_1" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="menuitemcheckbox" aria-labelledby="js_1" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="menuitemradio" aria-labelledby="js_1" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="option" aria-labelledby="js_1" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="progressbar" aria-labelledby="js_1" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="radio" aria-labelledby="js_1" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="rowheader" aria-labelledby="js_1" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="searchbox" aria-labelledby="js_1" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="slider" aria-labelledby="js_1" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="spinbutton" aria-labelledby="js_1" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="switch" aria-labelledby="js_1" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="tab" aria-labelledby="js_1" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="textbox" aria-labelledby="js_1" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="treeitem" aria-labelledby="js_1" /></template>',
      filename: 'test.vue'
    },
    // Non-interactive Elements
    {
      code: '<template><abbr /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><article /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><blockquote /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><br /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><caption /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><dd /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><details /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><dfn /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><dialog /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><dir /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><dl /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><dt /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><fieldset /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><figcaption /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><figure /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><footer /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><form /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><frame /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><h1 /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><h2 /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><h3 /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><h4 /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><h5 /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><h6 /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><hr /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><iframe /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><img /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><label /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><legend /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><li /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><link /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><main /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><mark /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><marquee /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><menu /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><meter /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><nav /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><ol /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><p /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><pre /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><progress /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><ruby /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><section /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><table /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><tbody /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><td /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><tfoot /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><thead /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><time /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><ul /></template>',
      filename: 'test.vue'
    },
    // Non-interactive Roles
    {
      code: '<template><div role="alert" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="alertdialog" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="application" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="article" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="banner" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="cell" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="complementary" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="contentinfo" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="definition" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="dialog" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="directory" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="document" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="feed" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="figure" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="form" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="group" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="heading" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="img" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="list" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="listitem" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="log" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="main" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="marquee" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="math" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="navigation" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="none" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="note" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="presentation" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="region" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="rowgroup" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="search" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="separator" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="status" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="table" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="tabpanel" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="term" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="timer" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="tooltip" /></template>',
      filename: 'test.vue'
    },
    // Via config
    // Inputs. Ignore them because they might get a label from a wrapping label element.
    {
      code: '<template><input /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input type="button" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input type="checkbox" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input type="color" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input type="date" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input type="datetime" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input type="email" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input type="file" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input type="hidden" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input type="hidden" name="bot-field"/></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input type="hidden" name="form-name" value="Contact Form"/></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input type="image" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input type="month" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input type="number" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input type="password" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input type="radio" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input type="range" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input type="reset" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input type="search" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input type="submit" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input type="tel" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input type="text" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><label>Foo <input type="text" /></label></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input name={field.name} id="foo" type="text" value={field.value} disabled={isDisabled} onChange={changeText(field.onChange, field.name)} onBlur={field.onBlur} /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input type="time" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input type="url" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><input type="week" /></template>',
      filename: 'test.vue'
    },
    // Marginal interactive elements. It is difficult to insist that these
    // elements contain a text label.
    {
      code: '<template><audio /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><canvas /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><embed /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><textarea /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><tr /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><video /></template>',
      filename: 'test.vue'
    },
    // Interactive roles to ignore
    {
      code: '<template><div role="grid" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="listbox" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="menu" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="menubar" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="radiogroup" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="row" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="tablist" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="toolbar" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="tree" /></template>',
      filename: 'test.vue'
    },
    {
      code: '<template><div role="treegrid" /></template>',
      filename: 'test.vue'
    }
  ].map(validTest => ({
    ...validTest,
    options: (validTest.options || []).concat(ruleOptions).reduce((acc, item) => [{
      ...acc[0],
      ...item,
    }], [{}])
  })),
  invalid: [
    {
      filename: 'test.vue',
      code: '<template><button /></template>',
      errors: [{ message: errorMessage }],
    },
    {
      code: '<template><button><span /></button></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><button><img /></button></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><button><span title="This is not a real label" /></button></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><button><span><span><span>Save</span></span></span></button></template>',
      options: [{ depth: 3 }],
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><custom-control><span><span></span></span></custom-control></template>',
      options: [{depth: 3, controlComponents: ['custom-control']}],
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><a href="#" /></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><area href="#" /></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><menuitem /></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><option /></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><th /></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    // Interactive Roles
    {
      code: '<template><div role="button" /></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><div role="checkbox" /></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><div role="columnheader" /></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><div role="combobox" /></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><div role="link" /></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><div role="gridcell" /></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><div role="menuitem" /></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><div role="menuitemcheckbox" /></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><div role="menuitemradio" /></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><div role="option" /></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><div role="progressbar" /></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><div role="radio" /></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><div role="rowheader" /></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    // Skipped because no error happened
    // {
    //   code: '<template><div role="scrollbar" /></template>',
    //   errors: [{ message: errorMessage }],
    //   filename: 'test.vue'
    // },
    {
      code: '<template><div role="searchbox" /></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><div role="slider" /></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><div role="spinbutton" /></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><div role="switch" /></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><div role="tab" /></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    },
    {
      code: '<template><div role="textbox" /></template>',
      errors: [{ message: errorMessage }],
      filename: 'test.vue'
    }
  ].map(validTest => ({
    ...validTest,
    options: (validTest.options || []).concat(ruleOptions).reduce((acc, item) => [{
      ...acc[0],
      ...item,
    }], [{}])
  })),
});
