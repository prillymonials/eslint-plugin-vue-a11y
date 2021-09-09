
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const VueUtils = require('eslint-plugin-vue/lib/utils');
const utils = require('../utils');
const altRule = require('eslint-plugin-jsx-a11y/lib/rules/control-has-associated-label.js');
const { generateObjSchema, arraySchema } = require('eslint-plugin-jsx-a11y/lib/util/schemas.js');

const errorMessage = 'A control must be associated with a text label.';

const ignoreList = ['link'];

const schema = generateObjSchema({
  labelAttributes: arraySchema,
  controlComponents: arraySchema,
  ignoreElements: arraySchema,
  ignoreRoles: arraySchema,
  depth: {
    description: 'JSX tree depth limit to check for accessible label',
    type: 'integer',
    minimum: 0,
  },
});

module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/maranran/eslint-plugin-vue-a11y/blob/master/docs/rules/control-has-associated-label.md'
    },
    schema: [schema],
  },

  create (context) {
    const options = context.options[0] || {};
    const {
      labelAttributes = [],
      controlComponents = [],
      ignoreElements = [],
      ignoreRoles = [],
    } = options;

    const newIgnoreElements = new Set([...ignoreElements, ...ignoreList]);

    const rule = (node) => {
      const tag = utils.getElementType(node);
      const roleAttr = utils.getAttribute(node, 'role');
      const role = roleAttr && utils.getAttributeValue(roleAttr);

      // Ignore interactive elements that might get their label from a source
      // that cannot be discerned from static analysis, like
      // <label><input />Save</label>
      if (newIgnoreElements.has(tag)) {
        return;
      }

      // Ignore roles that are "interactive" but should not require a label.
      if (ignoreRoles.indexOf(role) > -1) {
        return;
      }

      const nodeIsDOMElement = utils.isDOMElement(tag);
      const nodeIsHiddenFromScreenReader = utils.isHiddenFromScreenReader(node);
      const nodeIsInteractiveElement = utils.isInteractiveElement(node);
      const nodeIsInteractiveRole = utils.isInteractiveRole(node);
      const nodeIsControlComponent = controlComponents.indexOf(tag) > -1;

      if (nodeIsHiddenFromScreenReader) {
        return;
      }

      let hasAccessibleLabel = true;
      if (
        nodeIsInteractiveElement
        || (nodeIsDOMElement && nodeIsInteractiveRole)
        || nodeIsControlComponent
      ) {
        // Prevent crazy recursion.
        const recursionDepth = Math.min(
          options.depth === undefined ? 2 : options.depth,
          25
        );
        hasAccessibleLabel = utils.mayHaveAccessibleLabel(
          node,
          recursionDepth,
          labelAttributes
        );
      }

      if (!hasAccessibleLabel) {
        context.report({
          node: node.startTag,
          message: errorMessage,
        });
      }
    };

    return VueUtils.defineTemplateBodyVisitor(context, {
      "VElement" (node) {
        rule(node); 
      }
    }, altRule.create(context))
  }
};
