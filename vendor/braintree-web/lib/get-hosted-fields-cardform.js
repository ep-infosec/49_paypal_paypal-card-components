'use strict';

var composeHostedFieldsUrl = require('../hosted-fields/external/compose-url');

function getCardForm(client, hostedFieldsComponentId) {
  var i, frame;
  var frames = global.parent.frames;
  var clientConfig = client.getConfiguration();
  var assetsUrl = clientConfig.gatewayConfiguration.assetsUrl;
  var isDebug = clientConfig.isDebug;
  var hostedFieldsFrameUrl = composeHostedFieldsUrl(assetsUrl, hostedFieldsComponentId, isDebug);

  for (i = 0; i < frames.length; i++) {
    frame = frames[i];

    try {
      if ((frame.location.href === hostedFieldsFrameUrl) && frame.cardForm) { // eslint-disable-line no-extra-parens
        return frame.cardForm;
      }
    } catch (e) { /* ignored */ }
  }

  return null;
}

module.exports = {
  get: getCardForm
};
